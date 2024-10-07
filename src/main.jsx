import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Passfort from './Passfort.jsx'
import Landingpage from './Landingpage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landingpage/>
  </StrictMode>,
)
