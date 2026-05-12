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

// const ADMINS_API = 'http://localhost:5000/api/admins';
// const DJ_AVAILABILITIES_API = 'http://localhost:5000/api/dj_availabilities';
// const DJS_API = 'http://localhost:5000/api/djs';
// const NOTIFICATIONS_API = 'http://localhost:5000/api/notifications';
// const PROGRAM_DJ_ASSIGNMENTS_API = 'http://localhost:5000/api/program_dj_assignments';
// const PROGRAM_SCHEDULES_API = 'http://localhost:5000/api/program_schedules';
// const PROGRAMS_API = 'http://localhost:5000/api/programs';
// const SCHEDULE_DAY_TYPES_API = 'http://localhost:5000/api/schedule_day_types';
// const SUBSTITUTIONS_API = 'http://localhost:5000/api/substitutions';
// const ACTIVITY_LOGS_API = 'http://localhost:5000/api/activity_logs'

function App() {
  // const [admins, setAdmins] = useState<any[]>([]);
  // const [dj_availabilities, setDjAvailabilities] = useState<any[]>([]);
  // const [djs, setDjs] = useState<any[]>([]);
  // const [notifications, setNotifications] = useState<any[]>([]);
  // const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
  // const [program_schedules, setProgramSchedules] = useState<any[]>([]);
  // const [programs, setPrograms] = useState<any[]>([]);
  // const [schedule_day_types, setScheduleDayTypes] = useState<any[]>([]);
  // const [substitutions, setSubstitutions] = useState<any[]>([]);
  // const [activity_logs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // const fetchData = async (
  //   url: string,
  //   setter: React.Dispatch<React.SetStateAction<any[]>>
  // ) => {
  //   try {
  //     const res = await fetch(url);
  //     const json = await res.json();

  //     if (json.success) {
  //       setter(json.data);
  //     }
  //   } catch (err) {
  //       console.error(`Error fetching ${url}:`, err);
  //   }
  // };

  // useEffect(() => { 
  //   const loadAllData = async () => {
  //     setLoading(true);

  //     await Promise.all([
  //       fetchData(ADMINS_API, setAdmins),
  //       fetchData(DJ_AVAILABILITIES_API, setDjAvailabilities),
  //       fetchData(DJS_API, setDjs),
  //       fetchData(NOTIFICATIONS_API, setNotifications),
  //       fetchData(PROGRAM_DJ_ASSIGNMENTS_API, setProgramDjAssignments),
  //       fetchData(PROGRAM_SCHEDULES_API, setProgramSchedules),
  //       fetchData(PROGRAMS_API, setPrograms),
  //       fetchData(SCHEDULE_DAY_TYPES_API, setScheduleDayTypes),
  //       fetchData(SUBSTITUTIONS_API, setSubstitutions),
  //       fetchData(ACTIVITY_LOGS_API, setActivityLogs)
  //     ]);
  //     setLoading(false);
  //   };
  //   loadAllData();
  // }, []);

  // console.log(admins);
  // console.log(programs);
  // console.log(djs);

  return (
    <AuthProvider>
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
          <Route path="/superadmin-reports" element={<SuperadminReports />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
);
}

export default App