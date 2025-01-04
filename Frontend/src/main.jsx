import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Passfort from './Passfort.jsx'
import Landingpage from './Components/Landingpage.jsx'
import { createBrowserRouter,  RouterProvider} from 'react-router-dom';
import LoginAuth from './Components/LoginAuth.jsx';
import SignupAuth from './Components/SignupAuth.jsx';

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
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
