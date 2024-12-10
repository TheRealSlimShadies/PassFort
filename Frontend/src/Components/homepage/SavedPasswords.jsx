
import React from 'react';
import { Link } from 'react-router-dom';
import SavedPasswordCard from './SavedPasswordCard.jsx';
import "./SavedPassword.css";
const SavedPasswords = () => {
  // Mock data for testing purposes
  const savedPasswordsData = [
    {
      id: 1,
      logo: "twitter",
      websiteName: "Twitter"
    },
    {
      id: 2,
      logo: "google",
      websiteName: "Google"
    },
    {
      id: 3,
      logo: "pinterest",
      websiteName: "Pinterest"
    }
  ];

  return (
    <div className="saved-passwords">
      <h2>Your Saved Passwords</h2>
      <div className="cards-container">
        {savedPasswordsData.map((item) => (
          <Link key={item.id} to={`/password-detail/${item.id}`}>
            <SavedPasswordCard
              logo={`/logos/${item.logo}.svg`} // Assuming logos are stored in the public folder
              websiteName={item.websiteName}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedPasswords;
