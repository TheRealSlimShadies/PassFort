import React from 'react';
import './SavedPasswordCard.css';

const SavedPasswordCard = ({ logo, websiteName, onClick, onDelete }) => (
  <div className="card-container">
    <button className="card" onClick={onClick}>
      <img src={logo} alt={`${websiteName} logo`} className="card-logo" />
      <h3 className="card-title">{websiteName}</h3>
    </button>
    <button className="delete-button" onClick={onDelete}>
      Delete
    </button>
  </div>
);

export default SavedPasswordCard;
