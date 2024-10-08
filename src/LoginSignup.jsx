import React from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  return (
    <div className="loginSignupContainer">
      <h1>Login or Sign Up</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </form>
    </div>
  );
};

export default LoginSignup;
