import React, { useState } from 'react';

const ForgotPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [message, setMessage] = useState('');
    const [requestCount, setRequestCount] = useState(0);
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = () => {
        if (requestCount >= 1) {
            setMessage('You can only request a password reset once a day.');
            return;
        }

        // Simulate an API call to send reset email/SMS
        // Here you would usually call your backend API
        console.log('Password reset request sent for:', emailOrPhone);
        setRequestCount(1);
        setMessage('Password reset link sent!');
    };

    const generateRandomPassword = () => {
        const length = 8; // Desired length of password
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        setNewPassword(password);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Reset Password</h2>
            <input
                type="text"
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <button onClick={handleResetPassword}>Request Password Reset</button>
            <button onClick={generateRandomPassword} style={{ marginLeft: '10px' }}>
                Generate Random Password
            </button>
            {message && <p>{message}</p>}
            {newPassword && (
                <p>Generated Password: <strong>{newPassword}</strong></p>
            )}
        </div>
    );
};

export default ForgotPassword;
