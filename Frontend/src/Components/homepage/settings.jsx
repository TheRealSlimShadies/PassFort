// File: Settings.jsx
import React, { useState, useEffect } from 'react';
import './settings.css';

const Settings = ({ onThemeChange }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [logoutPassword, setLogoutPassword] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Apply the theme class to the body
    document.body.classList.remove('theme-light', 'theme-dark'); // Remove any previous classes
    document.body.classList.add(`theme-${theme}`); // Add the current theme class

    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme); // Save theme to localStorage
  };


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });

    if (name === 'newPassword') {
      setPasswordFeedback(
        value.length >= 8
          ? 'Password strength: Strong'
          : 'Password strength: Weak (min 8 chars required)'
      );
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password successfully changed!');
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordFeedback('');
  };

  const handleLogout = () => {
    if (email && logoutPassword) {
      const isCorrect = email === 'user@example.com' && logoutPassword === 'password123';
      if (isCorrect) {
        localStorage.clear();
        alert('Logged out successfully!');
        window.location.href = '/login';
      } else {
        alert('Incorrect email or password!');
      }
    } else {
      alert('Please enter your email and password to confirm logout.');
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <section id="app-settings" className="app-settings">
        <h2>App Settings</h2>
        <div>
        <label>Theme:</label>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

       
      </section>

      <section id="logout-section" className="account-settings">
        <h2>Account Settings</h2>

        <h3>1. Change Your Master Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <div>
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              required
            />
            <small>{passwordFeedback}</small>
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>

        <h3>2. Logout from Your Account</h3>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={logoutPassword}
            onChange={(e) => setLogoutPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="logout-button"
          onClick={() => setShowLogoutModal(true)}
        >
          Logout
        </button>
      </section>

      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to logout?</h3>
            <button onClick={handleLogout}>Confirm</button>
            <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
