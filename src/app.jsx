import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './Landingpage';
import LoginSignup from './LoginSignup';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<LoginSignup />} />
    </Routes>
  );
};

export default App;
