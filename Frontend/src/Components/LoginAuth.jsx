import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAuth.css';

const LoginAuth = () => {
  const navigate= useNavigate();

  const handleSignUpClick = () =>{
    navigate('/signup');
  };

  const handleLoginSubmit = (event) =>{
    event.preventDefault();
    console.log("Form submitted");
  };
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
            Don't have an account? 
            <button 
            type="button"
            className="LoginToSignUp"
            onClick={handleSignUpClick}
            >
              SignUp

            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAuth;