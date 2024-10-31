import React, { useState, useEffect } from 'react';

const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };
  
const Notification = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notificationsEnabled') === 'true';
  });

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    localStorage.setItem('notificationsEnabled', !notificationsEnabled);
  };

  const showNotification = (type) => {
    const options = {
      body: type === 'hire' ? 'Congratulations! You are hired.' : 'Sorry, your application was rejected.',
      icon: 'path/to/icon.png', // Optional: add an icon
    };

    new Notification(type === 'hire' ? 'Hired!' : 'Application Rejected', options);
  };


  const handleApplicationResponse = (response) => {
    if (notificationsEnabled) {
      if (response === 'hired') {
        showNotification('hire');
      } else if (response === 'rejected') {
        showNotification('reject');
      }
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <label>
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={toggleNotifications}
        />
        Enable Notifications
      </label>
      {/* Example buttons to simulate application responses */}
      <button onClick={() => handleApplicationResponse('hired')}>Simulate Hire</button>
      <button onClick={() => handleApplicationResponse('rejected')}>Simulate Rejection</button>
    </div>
  );
};

export default Notification;
