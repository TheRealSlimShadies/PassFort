import React from "react";
import "./Homepage.css";

const Dashboard = () => {
  return (
    <div className="main-content">
      <div className="cards-container">
        <div className="card">
          <div className="icon">🔒</div>
          <div className="title">PASSWORDS</div>
          <div className="info">Number of saved passwords: 123</div>
        </div>
        <div className="card">
          <div className="icon">👤</div>
          <div className="title">USERS</div>
          <div className="info">Number of users: 45</div>
        </div>
        <div className="card">
          <div className="icon">🛠️</div>
          <div className="title">Generator</div>
          <div className="info">Create Strong Passwords</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
