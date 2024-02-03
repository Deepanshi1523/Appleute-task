import React, { useEffect, useState } from 'react';

const Notification = ({ title, onClose, onSnooze }) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    onClose();
  };

  const handleSnooze = () => {
    setVisible(false);
    onSnooze();
  };

  return (
    isVisible && (
      <div className="notification">
        <p>{title}</p>
        <button onClick={handleDismiss}>Dismiss</button>
        <button onClick={handleSnooze}>Snooze</button>
      </div>
    )
  );
};

export default Notification;