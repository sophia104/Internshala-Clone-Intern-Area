import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to check the time restriction
const isWithinUploadTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  return hours >= 14 && hours < 19; // 2 PM to 7 PM IST
};

const VideoUpload = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle OTP sending
  const sendOtp = async () => {
    try {
      const response = await axios.post("/api/send-otp", { email });
      if (response.data.success) {
        setIsOtpSent(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP.");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      if (response.data.success) {
        setIsOtpVerified(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Error verifying OTP.");
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const size = file.size / (1024 * 1024); // Convert size to MB

        // Check for video length and size
        if (duration > 300) {
          setErrorMessage("Video exceeds 5 minutes.");
          setVideoFile(null);
        } else if (size > 100) {
          setErrorMessage("File size exceeds 100MB.");
          setVideoFile(null);
        } else {
          setErrorMessage("");
          setVideoFile(file);
        }
      };
      video.src = URL.createObjectURL(file);
    }
  };

  // Function to handle video upload
  const handleUpload = async () => {
    if (!isWithinUploadTime()) {
      setErrorMessage("Video upload is allowed only between 2 PM to 7 PM IST.");
      return;
    }

    if (!videoFile) {
      setErrorMessage("Please select a valid video file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("email", email);

    try {
      const response = await axios.post("/api/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        setErrorMessage("");
        alert("Video uploaded successfully!");
      } else {
        setErrorMessage("Failed to upload video. Try again.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrorMessage("Error uploading video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Internship Application - Upload Video</h2>

      {/* Step 1: OTP Authentication */}
      {!isOtpVerified ? (
        <>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isOtpSent ? (
              <button onClick={sendOtp}>Send OTP</button>
            ) : (
              <>
                <label>OTP: </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOtp}>Verify OTP</button>
              </>
            )}
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </>
      ) : (
        <>
          {/* Step 2: Video Upload */}
          <div>
            <label>Upload Video (Max 5 mins, Max 100MB): </label>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default VideoUpload;
