import React, { useState, useContext } from 'react';
import './AddPassword.css';
import { PasswordContext } from '../PasswordContext';
import { FaCopy, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const AddPassword = () => {
  const { passwords, addPassword, updatePassword, deletePassword } = useContext(PasswordContext);

  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState({});

  const handleSavePassword = () => {
    if (!website || !username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingIndex !== null) {
      updatePassword(editingIndex, { website, username, password });
      setSuccessMessage('Password successfully updated!');
    } else {
      addPassword({ website, username, password });
      setSuccessMessage('Password successfully added!');
    }

    // Clear the form and reset editing state
    setWebsite('');
    setUsername('');
    setPassword('');
    setEditingIndex(null);

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditPassword = (index) => {
    const passwordToEdit = passwords[index];
    setWebsite(passwordToEdit.website);
    setUsername(passwordToEdit.username);
    setPassword(passwordToEdit.password);
    setEditingIndex(index);
  };

  const handleDeletePassword = (index) => {
    deletePassword(index);
    alert('Password deleted successfully.');
  };

  const handleCopyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const handleTogglePasswordVisibility = (index) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index], // Toggle visibility for the specific password
    }));
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="heading">Add Password</h1>
        {successMessage && <p className="successMessage">{successMessage}</p>}

        <input
          className="input"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="submitButton" onClick={handleSavePassword}>
          <span className="submitButtonText">
            {editingIndex !== null ? 'Update Password' : 'Add Password'}
          </span>
        </div>

        {passwords.length > 0 && (
          <div className="password-list">
            {passwords.map((item, index) => (
              <div className="passwordItem" key={index}>
                <div className="listItem">
                  <div className="listLabel">Website:</div>
                  <div className="listValue">{item.website}</div>
                  <div className="listLabel">Username:</div>
                  <div className="listValue">{item.username}</div>
                  <div className="listLabel">Password:</div>
                  <div className="listValue">
                    <span className="passwordField">
                      {passwordVisibility[index] ? item.password : item.password.replace(/./g, '*')}
                    </span>
                  </div>
                  <div className="passwordButtons">
                    <button
                      className="showPasswordButton"
                      onClick={() => handleTogglePasswordVisibility(index)} // Toggle visibility for specific password
                    >
                      {/* Reverse the icons */}
                      {passwordVisibility[index] ? <FaEyeSlash size={20} color="#555" /> : <FaEye size={20} color="#555" />}
                    </button>
                  </div>
                  <div className="iconContainer">
                    <div className="icon" onClick={() => handleCopyPassword(item.password)}>
                      <FaCopy size={20} color="#555" />
                    </div>
                    <div className="icon" onClick={() => handleEditPassword(index)}>
                      <FaEdit size={20} color="#555" />
                    </div>
                    <div className="icon" onClick={() => handleDeletePassword(index)}>
                      <FaTrash size={20} color="#555" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPassword;
