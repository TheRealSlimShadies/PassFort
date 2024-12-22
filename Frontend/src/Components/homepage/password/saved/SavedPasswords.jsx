import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SavedPasswordCard from './SavedPasswordCard.jsx';
import { PasswordContext } from '../PasswordContext.jsx';
import './SavedPassword.css';

const SavedPasswords = () => {
  const { passwords } = useContext(PasswordContext); // Get passwords from context

  return (
    <div className="saved-passwords">
      <h2>Your Saved Passwords</h2>
      <div className="cards-container">
        {passwords.length > 0 ? (
          passwords.map((password, index) => (
            <Link key={index} to={`/password-detail/${index}`} className="password-card-link">
              <SavedPasswordCard
                logo={`/logos/${password.website.toLowerCase()}.svg`} // Example logo logic
                websiteName={password.website}
                username={password.username}
              />
            </Link>
          ))
        ) : (
          <p className="no-passwords-message">No passwords saved yet.</p>
        )}
      </div>

      {/* Floating Button */}
      <Link to="/home/add-password" className="floating-add-btn" title="Add New Password">
        <span>+</span>
      </Link>
    </div>
  );
};

export default SavedPasswords;
