import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupAuth.css';
import api from '../Api/api.jsx';

const SignupAuth = () => {
  const [usernameS, setUsernameS] = useState('');
  const [emailS, setEmailS] = useState('');
  const [passwordS, setPasswordS] = useState('');
  const [confirmPasswordS, setConfirmPasswordS] = useState('');

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();  // Prevent form from submitting and reloading the page

    try {
      const response = await api.registrationRequest(usernameS, emailS, passwordS, confirmPasswordS);
      console.log(response); // Handle the response after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="signupContainer">
        <img src="src/assets/Passfort_logo.png" alt="Passfort_logo" className="LogoSignup" />
        <h1>Signup</h1>
        <form onSubmit={handleSignupSubmit}> {/* Handle submit event here */}
          <div>
            <label>Full Name:</label>
            <input
              onChange={(e) => setUsernameS(e.target.value)}
              value={usernameS}
              type="text"
              name="fullName"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              onChange={(e) => setEmailS(e.target.value)}
              value={emailS}
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              onChange={(e) => setPasswordS(e.target.value)}
              value={passwordS}
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              onChange={(e) => setConfirmPasswordS(e.target.value)}
              value={confirmPasswordS}
              type="password"
              name="Confirmpassword"
              required
            />
          </div>
          <button type="submit">Signup</button> {/* Just submit the form here */}
          <p>
            Already have an account? 
            <button type="button" className="SignupToLogin" onClick={handleLoginClick}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupAuth;
