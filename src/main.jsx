// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
//import Passfort from './Passfort.jsx'
// import Landingpage from './Landingpage.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Landingpage/>
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './app'; // Import App, which contains the router and all routes
import Landingpage from './Landingpage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* Render the App component, which includes routing */}
    </BrowserRouter>
  </StrictMode>
);
