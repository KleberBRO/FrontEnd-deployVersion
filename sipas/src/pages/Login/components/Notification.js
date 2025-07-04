import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message && type !== 'auth') {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, type, onClose, duration]);

  if (!message) return null;

  return (
    <div className={`notification notification-${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="notification-close">×</button>
    </div>
  );
};

export default Notification;