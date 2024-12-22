// PasswordContext.js
import React, { createContext, useState } from 'react';

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (password) => {
    setPasswords((prev) => [...prev, password]);
  };

  const updatePassword = (index, updatedPassword) => {
    setPasswords((prev) =>
      prev.map((item, i) => (i === index ? updatedPassword : item))
    );
  };

  const deletePassword = (index) => {
    setPasswords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PasswordContext.Provider
      value={{ passwords, addPassword, updatePassword, deletePassword }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
