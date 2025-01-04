import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAuth.css';
import api from '../Api/api.jsx'
const LoginAuth = () => {
  
  const [username,setUsername] = useState('');
  const [password,setPassword]= useState('');

  const navigate= useNavigate();

  
  const handleSignUpClick = () =>{
    navigate('/signup');
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const response = await api.loginRequest(username, password);
      if (response.success === true)
      {
        navigate('/home')
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="wrapper">
      <div className="loginSignupContainer">
      <img src="src\assets\Passfort_logo.png" alt="Passfort_logo" className='LogoLogin'/>
        <h1>Login</h1>
        <form>
          <div>
            <label>Username:</label>
            <input onChange= {(e) =>setUsername(e.target.value)} value ={username}type="text" name="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input onChange={(e) =>setPassword(e.target.value)} value ={password}type="password" name="password" required />
          </div>
          <button onClick= {handleLoginSubmit}type="submit" >Login</button>
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