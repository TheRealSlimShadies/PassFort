import './EditCredentials.css';
import React, { useState } from 'react';
import api from '../Api/api';

function EditCredentials({ username, password, onclose, credID, containerName, deleteCreden }) {
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [passwordLength, setPasswordLength] = useState(12);

  const generatePassword = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    let characters = letters;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setNewPassword(generatedPassword);
  };

  const handleSave = () => {
    
    console.log('Saving new password:', newPassword);
  };

  return (
    <div className="EditCredentialsContainer">
      <form className="horizontal-form">
        <div className="form-field">
          <label>Username:</label>
          <input type="text" value={username} readOnly />
        </div>
        <div className="form-field">
          <label>Current Password:</label>
          <div className="password-field">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={password}
              readOnly
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div className="form-field">
          <label>New Password:</label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter or generate a new password"
          />
          <button type="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>

        <div className="form-field">
          <label>Options:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={includeSpecialChars}
                onChange={() => setIncludeSpecialChars((prev) => !prev)}
              />
              Include Special Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              Include Numbers
            </label>
            <label>
              Password Length: {passwordLength}
              <input
                type="range"
                min="6"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="form-field">
          <button type="button" onClick={handleSave}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              deleteCreden(credID, containerName);
              onclose();
            }}
          >
            Delete Credential
          </button>
          <button type="button" onClick={onclose} className="close-button">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCredentials;
