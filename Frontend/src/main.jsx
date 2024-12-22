import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Passfort from './Passfort.jsx'
import Landingpage from './Components/Landingpage.jsx'
import { PasswordProvider } from './Components/homepage/password/PasswordContext.jsx'
import { createBrowserRouter,  RouterProvider} from 'react-router-dom';
import LoginAuth from './Components/LoginAuth.jsx';
import SignupAuth from './Components/SignupAuth.jsx';
import Homepage from './Components/homepage/Homepage.jsx';
import Dashboard from './Components/homepage/Dashboard.jsx';
import SavedPasswords from './Components/homepage/password/saved/SavedPasswords.jsx';
import GeneratePassword from './Components/homepage/GeneratePassword.jsx';
import Settings from './Components/homepage/settings.jsx';
import Account from './Components/homepage/account.jsx';
import AddPassword from './Components/homepage/password/add/AddPassword.jsx'; // Import AddPassword component

//Router configuration
const router = createBrowserRouter([
  {
     path:'/',
     element:<Landingpage/>
  },
  {
    path:'/login',
    element:<LoginAuth/>
  },
  {
    path:'/signup',
    element:<SignupAuth/>
  },
  {
    path: '/home',
    element: <Homepage />,
    children: [
      { path: '', element: <Dashboard /> }, // Default content for /home
      { path: 'saved-passwords', element: <SavedPasswords /> },
      { path: 'generate-password', element: <GeneratePassword /> },
      { path: 'settings', element: <Settings /> },
      { path: 'account', element: <Account /> },
      { path: 'add-password', element: <AddPassword /> },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordProvider>
    <RouterProvider router = {router}/>
    </PasswordProvider>
  </StrictMode>,
)
