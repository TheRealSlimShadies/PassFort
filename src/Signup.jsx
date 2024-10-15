import React from 'react';
import './Signup.css'; // Importing the CSS

const Signup = () => {
  return (
    <div className="signupContainer">
      <h1>Create Your Account</h1>
      <form>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullname" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" required />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="#">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
