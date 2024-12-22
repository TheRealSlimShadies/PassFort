import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme, isCollapsed }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleAccountClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogoutClick = () => {
    navigate("/home/settings"); // Ensure navigation to base settings
    setTimeout(() => {
      window.location.hash = "logout-section"; // Navigate to logout section
    }, 0);
    setIsDropdownOpen(false);
  };
  
  const handleSettingsClick = () => {
    navigate("/home/settings");
    setTimeout(() => setIsDropdownOpen(false), 300);
  };
  return (
    <div className={`navbar ${theme} ${isCollapsed ? "collapsed" : ""}`}>
      <input type="text" placeholder="Search..." className="search-bar" />

      {/* Account Button with Dropdown */}
      <div className="account-container">
        <span className="account-btn" onClick={handleAccountClick}>
          Account
        </span>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <span onClick={handleSettingsClick}>Settings</span>
            <span onClick={handleLogoutClick}>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
