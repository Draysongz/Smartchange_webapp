import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext({
  showNotification: false,
  toggleNotification: () => {},
  newMessageReceived: false,
  setNewMessageReceived: (value: boolean) => {},
  markMessageAsReceived: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [newMessageReceived, setNewMessageReceived] = useState(false);

  useEffect(() => {
    if (newMessageReceived) {
      setShowNotification(true);
    }
  }, [newMessageReceived]);

  const toggleNotification = () => {
    setShowNotification((prevState) => !prevState);
  };

  const markMessageAsReceived = () => {
    setNewMessageReceived(false);
  };

  const value = {
    showNotification,
    toggleNotification,
    newMessageReceived,
    setNewMessageReceived: (value: boolean) => setNewMessageReceived(value),
    markMessageAsReceived,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
