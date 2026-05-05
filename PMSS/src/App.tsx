import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from "@/contexts/useAuth"
import { Toaster } from "@/components/ui/sonner"
import LandingPage from "./pages/LandingPage"
import AppLayout from "@/components/layout/AppLayout"
import AdminHome from './pages/AdminHome';
import SuperadminHome from './pages/SuperadminHome'
import AdminProfile from './pages/AdminProfile'
import SuperadminProfile from './pages/SuperadminProfile'
import SuperadminProgram from './pages/SuperadminProgram'
import AdminSchedule from './pages/AdminSchedule'
import SuperadminSchedule from './pages/SuperadminSchedule'

// const API_URL = 

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      {/* <Routes>
        <Route path = "/" element={ <LandingPage /> }/>
        <Route path = "/admin-home" element={<ProtectedRoute role="admin"> <AdminHome /> </ProtectedRoute>}/>
        <Route path = "/admin-profile" element={<ProtectedRoute role="admin"> <AdminProfile /> </ProtectedRoute>}/>
        <Route path = "/admin-schedule" element={<ProtectedRoute role="admin"> <AdminSchedule /> </ProtectedRoute>}/>
        <Route path = "/superadmin-home" element={<ProtectedRoute role="superadmin"> <SuperadminHome /> </ProtectedRoute>}/>
        <Route path = "/superadmin-profile" element={<ProtectedRoute role="superadmin"> <SuperadminProfile /> </ProtectedRoute>}/>
        <Route path = "/superadmin-program" element={<ProtectedRoute role="superadmin"> <SuperadminProgram /> </ProtectedRoute>}/>
        <Route path = "/superadmin-schedule" element={<ProtectedRoute role="superadmin"> <SuperadminSchedule /> </ProtectedRoute>}/>
      </Routes> */}
      <Routes>
        <Route path = "/" element={ <LandingPage /> }/>
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/admin-schedule" element={<AdminSchedule />} />

          <Route path="/superadmin-home" element={<SuperadminHome />} />
          <Route path="/superadmin-profile" element={<SuperadminProfile />} />
          <Route path="/superadmin-program" element={<SuperadminProgram />} />
          <Route path="/superadmin-schedule" element={<SuperadminSchedule />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
);
}

export default App