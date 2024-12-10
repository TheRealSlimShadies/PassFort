// navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme, isCollapsed }) => {
  const handleAccountClick = () => {
    console.log("Account button clicked!");
  };

  return (
    <div className={`navbar ${theme} ${isCollapsed ? "collapsed" : ""}`}>
      <input type="text" placeholder="Search..." className="search-bar" />

      {/* Account Button */}
      <button className="account-btn" onClick={handleAccountClick}>
        Account
      </button>
    </div>
  );
};

export default Navbar;
