import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import "./Homepage.css";
// import "./Navbar.css";

const Homepage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar theme="light" toggleTheme={() => {}} isCollapsed={isCollapsed} />

      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        <Outlet /> {/* This will render either DashboardContent or child routes */}
      </div>
    </div>
  );
};

export default Homepage;
