import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaKey, FaLock, FaBars, FaCog, FaUser } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <ul>
        {/* Dashboard redirects to /home */}
        <li>
          <Link to="/home">
            <FaHome className="icon" />
            {!isCollapsed && <span className="menu-text">Dashboard</span>}
          </Link>
        </li>

        {/* Other sidebar links */}
        <li>
          <Link to="/home/saved-passwords">
            <FaKey className="icon" />
            {!isCollapsed && <span className="menu-text">Saved Passwords</span>}
          </Link>
        </li>

        <li>
          <Link to="/home/generate-password">
            <FaLock className="icon" />
            {!isCollapsed && <span className="menu-text">Generate Password</span>}
          </Link>
        </li>

        <li>
          <Link to="/home/settings">
            <FaCog className="icon" />
            {!isCollapsed && <span className="menu-text">Settings</span>}
          </Link>
        </li>

      
      </ul>
    </div>
  );
};

export default Sidebar;
