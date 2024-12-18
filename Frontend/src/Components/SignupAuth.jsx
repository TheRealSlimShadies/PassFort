import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupAuth.css';

const SignupAuth = () => {
    const navigate= useNavigate();

    const handleLoginClick= () =>{
        navigate('/login');
    };

    const handleSignupSubmit = (event) =>{
        event.preventDefault();
        console.log("Form submitted");

        navigate('/login');
    };
  return (
    <div className="wrapper">
      <div className="signupContainer">
        <img src="src/assets/Passfort_logo.png" alt="Passfort_logo" className="LogoSignup" />
        <h1>Signup</h1>
        <form onSubmit={handleSignupSubmit}>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Signup</button>
          <p>
            Already have an account? <button 
            type="button"
            className="SignupToLogin"
            onClick={handleLoginClick}
            >
            Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupAuth;