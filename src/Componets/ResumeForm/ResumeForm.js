import React, { useState } from 'react';
import axios from 'axios';
import "./resumeform.css"

const ResumeForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    experience: '',
    personalDetails: '',
    photo: null,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Send OTP to user’s email
  const sendOtp = async () => {
    try {
      await axios.post('/api/send-otp', { userId });
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { otp });
      if (response.data.success) {
        setOtpVerified(true);
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!otpVerified) {
      alert('Please verify OTP before proceeding to payment.');
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => handleRazorpay();
    document.body.appendChild(script);
  };

  // Trigger Razorpay payment
  const handleRazorpay = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Razorpay key
      amount: 5000, // Rs 50 in paise
      currency: 'INR',
      name: 'Resume Generator',
      description: 'Payment for resume generation',
      handler: async (response) => {
        const paymentData = {
          ...formData,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        try {
          await axios.post('/api/generate-resume', paymentData);
          alert('Resume generated successfully and added to profile.');
        } catch (error) {
          console.error('Resume generation failed:', error);
        }
      },
      prefill: {
        name: formData.name,
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Create Your Resume</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Qualification:
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
        </label>
        <label>
          Experience:
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
        </label>
        <label>
          Personal Details:
          <textarea name="personalDetails" value={formData.personalDetails} onChange={handleChange}></textarea>
        </label>
        <label>
          Photo:
          <input type="file" name="photo" onChange={handleFileChange} />
        </label>
        {!otpSent ? (
          <button type="button" onClick={sendOtp}>Send OTP</button>
        ) : (
          <>
            <label>
              OTP:
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </label>
            <button type="button" onClick={verifyOtp}>Verify OTP</button>
          </>
        )}
      </form>
      {otpVerified && <button type="button" onClick={handleSubmit}>Pay & Generate Resume</button>}
    </div>
  );
};

export default ResumeForm;
