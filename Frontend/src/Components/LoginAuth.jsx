import React from 'react';
import './LoginAuth.css';

const LoginAuth = () => {
  return (
    <div className="wrapper">
      <div className="loginSignupContainer">
      <img src="src\assets\Passfort_logo.png" alt="Passfort_logo" className='LogoLogin'/>
        <h1>Login</h1>
        <form>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" >Login</button>
          <p>
            Don't have an account? <button className='LoginToSignUp'>Signup</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAuth;