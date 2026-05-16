import { useState, useEffect } from 'react'
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
import SuperadminReports from './pages/SuperadminReports'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path = "/" element={ <LandingPage /> }/>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>
        <Route element={<ProtectedRoute allowedRoles={["Admin"]}><AppLayout /></ProtectedRoute>}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/admin-schedule" element={<AdminSchedule />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Superadmin"]}><AppLayout /></ProtectedRoute>}>
          <Route path="/superadmin-home" element={<SuperadminHome />} />
          <Route path="/superadmin-profile" element={<SuperadminProfile />} />   
          <Route path="/superadmin-program" element={<SuperadminProgram />} />
          <Route path="/superadmin-schedule" element={<SuperadminSchedule />} />
          <Route path="/superadmin-reports" element={<SuperadminReports />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
);
}

export default App