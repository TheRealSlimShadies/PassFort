import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";  // import useLocation
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import "./Homepage.css";
// import "./Navbar.css";

const Homepage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();  // Get the current route

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Check if the current route is the Dashboard page
  const isDashboardPage = location.pathname === "/home";

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar theme="light" toggleTheme={() => {}} isCollapsed={isCollapsed} />

      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      {/* Main Content */}
      <div
  className={`main-content ${isCollapsed ? "collapsed" : ""} ${isDashboardPage ? "dashboard-page" : ""}`}
>
  <Outlet /> {/* This will render either DashboardContent or child routes */}
</div>

    </div>
  );
};

export default Homepage;
