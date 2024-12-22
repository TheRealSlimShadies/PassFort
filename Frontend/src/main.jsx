import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage from './Components/Landingpage.jsx';
import LoginAuth from './Components/LoginAuth.jsx';
import SignupAuth from './Components/SignupAuth.jsx';
import Homepage from './Components/homepage/Homepage.jsx';
import Dashboard from './Components/homepage/Dashboard.jsx';
import SavedPasswords from './Components/homepage/password/saved/SavedPasswords.jsx';
import GeneratePassword from './Components/homepage/GeneratePassword.jsx';
import Settings from './Components/homepage/settings.jsx';
import AddPassword from './Components/homepage/password/add/AddPassword.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />,
  },
  {
    path:'/login',
    element:<LoginAuth/>
  },
  {
    path: '/signup',
    element: <SignupAuth />,
  },
  {
    path: '/home',
    element: <Homepage />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'saved-passwords', element: <SavedPasswords /> },
      { path: 'generate-password', element: <GeneratePassword /> },
      { path: 'settings', element: <Settings /> },
      { path: 'add-password', element: <AddPassword /> },
    ],
  },
]);

const App = () => {
  // Step 1: Theme state initialization
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Step 2: Effect hook to apply theme globally
  useEffect(() => {
    // Remove previous theme classes if any
    document.body.classList.remove('theme-light', 'theme-dark');
    
    // Add the current theme class
    document.body.classList.add(`theme-${theme}`);

    // Save the theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // This hook will run whenever the theme changes

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);