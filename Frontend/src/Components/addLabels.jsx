import React, { useState } from 'react';
import './addLabels.css';
import api from '../Api/api.jsx';

const AddLabels = ({ stateValue, setStateValue }) => {
  const [newVault, setNewVault] = useState('');
  const [isVisible, setIsVisible] = useState(true); // Visibility state

  const handleCreateVault = async () => {
    try {
      const response = await api.createLabels(newVault, new Date().toJSON());
      setStateValue(!stateValue);
      console.log(response);
    } catch (error) {
      console.error('Vault Creation Failed:', error);
    }
  };

  const handleCancel = () => {
    setNewVault(''); // Clear the input field
    setIsVisible(false); // Close the box
  };

  if (!isVisible) {
    return null; // Render nothing if the box is not visible
  }

  return (
    <>
      <div className="addLabelsWrapper">
        <label htmlFor="vaultName" className="vaultName">Enter Vault Name</label>
        <input
          id="vaultName"
          onChange={(e) => setNewVault(e.target.value)}
          value={newVault}
          type="text"
          placeholder="Enter Vault Name"
        />
        <div className="buttonGroup">
          <button className="Createbtn" onClick={handleCreateVault}>Create</button>
          <button className="Cancelbtn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddLabels;
