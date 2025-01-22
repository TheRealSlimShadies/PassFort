import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Passfort from './Passfort.jsx'
import Landingpage from './Components/Landingpage.jsx'
import { createBrowserRouter,  RouterProvider} from 'react-router-dom';
import LoginAuth from './Components/LoginAuth.jsx';
import SignupAuth from './Components/SignupAuth.jsx';
import ResetPassword from './Components/resetPassword.jsx';
import ConfirmReset from './Components/confirmReset.jsx';
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
    element: <Passfort/>
  }
  ,
  {
    path:'/reset-password',
    element:<ResetPassword/>
  },
  {
    path:'/reset-password-confirm/:uid/:token',
    element:<ConfirmReset/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
