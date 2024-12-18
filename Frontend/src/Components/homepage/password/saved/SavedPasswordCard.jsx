//mock cards

import React from 'react';

const SavedPasswordCard = ({ logo, websiteName }) => {
  return (
    <div className="card">
      <img src={logo} alt={`${websiteName} logo`} className="card-logo" />
      <h3 className="card-title">{websiteName}</h3>
    </div>
  );
};

export default SavedPasswordCard;
