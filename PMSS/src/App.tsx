import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from "./pages/LandingPage"
import AdminHome from './pages/AdminHome';
import SuperadminHome from './pages/SuperadminHome'
import AdminProfile from './pages/AdminProfile'
import SuperadminProfile from './pages/SuperadminProfile'
import SuperadminProgram from './pages/SuperadminProgram'
import AdminSchedule from './pages/AdminSchedule'
import SuperadminSchedule from './pages/SuperadminSchedule'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<ProtectedRoute> <LandingPage /> </ProtectedRoute>}/>
        <Route path = "/admin-home" element={<ProtectedRoute> <AdminHome /> </ProtectedRoute>}/>
        <Route path = "/admin-profile" element={<ProtectedRoute> <AdminProfile /> </ProtectedRoute>}/>
        <Route path = "/admin-schedule" element={<ProtectedRoute> <AdminSchedule /> </ProtectedRoute>}/>
        <Route path = "/superadmin-home" element={ <SuperadminHome /> }/> { /* add <ProtectedRoute> later */ }
        <Route path = "/superadmin-profile" element={<ProtectedRoute> <SuperadminProfile /> </ProtectedRoute>}/>
        <Route path = "/superadmin-program" element={<ProtectedRoute> <SuperadminProgram /> </ProtectedRoute>}/>
        <Route path = "/superadmin-schedule" element={<ProtectedRoute> <SuperadminSchedule /> </ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
    // <>
    // </>
);
}

export default App