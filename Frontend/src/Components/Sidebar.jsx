import React, { useState } from 'react';
import { Sidebardata } from './Sidebardata';
import './Sidebar.css';
import api from '../Api/api.jsx'; // Import the API file

function Sidebar() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleLogout = async () => {
    try {
      await api.logoutRequest();
      alert("Logged out successfully");
      // Optionally, redirect to the login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout");
    }
  };

  const handleItemClick = (id) => {
    if (id === "logout") {
      setShowModal(true); // Show the confirmation modal when logout is clicked
    } else {
      console.log(`Clicked on ${id}`);
    }
  };

  const handleConfirmLogout = () => {
    setShowModal(false); // Close the modal
    handleLogout(); // Proceed with the logout
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Close the modal without logging out
  };

  return (
    <div className="Sidebar">
      <div className="Banner"></div>
      <ul className="Sidebarlist">
        {Sidebardata.map((val, key) => (
          <li
            key={key}
            className="Row"
            onClick={() => handleItemClick(val.id)}
          >
            <div id="Icon">{val.icon}</div>
            <div id="Title">{val.title}</div>
          </li>
        ))}
      </ul>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="ModalBackdrop">
          <div className="ModalContent">
            <p>Are you sure you want to log out?</p>
            <div className="ModalButtons">
              <button onClick={handleConfirmLogout}>Yes, log out</button>
              <button onClick={handleCancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;