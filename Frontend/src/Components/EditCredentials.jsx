import './EditCredentials.css';
import React, { useState } from 'react';

function EditCredentials({ username, password, onclose, credID, containerName, deleteCreden, updateCreden }) {
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const generatePassword = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const passwordLength = 12;
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setNewPassword(generatedPassword);
  };

  const handleSave = () => {
    updateCreden(credID, containerName);
    onclose();
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
          {/* Added unique class for Generate Password */}
          <button
            type="button"
            className="generate-password-button"
            onClick={generatePassword}
          >
            Generate Password
          </button>
          {/* Added unique class for Delete Credential */}
          <button
            type="button"
            className="delete-credential-button"
            onClick={() => {
              deleteCreden(credID, containerName);
              onclose();
            }}
          >
            Delete Credential
          </button>
        </div>
        <div className="form-field">
          {/* Added unique class for Save Changes */}
          <button type="button" className="save-changes-button" onClick={handleSave}>
            Save Changes
          </button>
          {/* Added unique class for Close */}
          <button type="button" className="close-button" onClick={onclose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCredentials;
