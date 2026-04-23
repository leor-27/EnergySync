import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Index.css'
import './AdminHome.css'
import './SuperadminHome.css'
import './AdminProfile.css'
import './SuperadminProfile.css'
import './SuperadminProgram.css'
import './AdminSchedule.css'
import './SuperadminSchedule.css'
import App from './App.tsx'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode> {/* add daa digdi c browserrouter amp */}
    <App />
  </StrictMode>,
)