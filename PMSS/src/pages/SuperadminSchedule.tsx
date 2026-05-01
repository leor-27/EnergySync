// import { useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Home, User, Tv, Calendar, LogOut } from "lucide-react"; 

// export default function SuperadminSchedule() {
//     const navigate = useNavigate();

//     useEffect(() => {

//     }, []);

//     return (
//         <div className="superadmin-layout">
//             <header className="main-header">
//                 <div className="header-content">
//                     <section className="header-image">
//                         <Link to="/superadmin-home">
//                             <img src="/logo.png" className="logo" alt="Energy FM 106.3 Naga Logo" />
//                         </Link>
//                     </section>
//                     <div className="title"> 
//                         <h1>EnergySync</h1>
//                     </div>
//                 </div>
//             </header>

//             <div className="app-body">
//                 <nav className="sidebar">
//                     <ul className="nav-links">
//                         <li>
//                             <NavLink to="/superadmin-home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Home size={20} />
//                                 <span>Home</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <User size={20} />
//                                 <span>Profile</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-program" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Tv size={20} />
//                                 <span>Program</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-schedule" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Calendar size={20} />
//                                 <span>Schedule</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <button className="nav-item logout" onClick={() => {
//                                 localStorage.removeItem("auth")
//                                 navigate("/")
//                             }}>
//                                 <LogOut size={20} />
//                                 <span>Logout</span>
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* <main className="main-content">
//                     <div className="welcome-section">
//                          <h1 className="welcome-text">Welcome, DJ Makisig!</h1>
//                     </div>
//                 </main> */}
//             </div>

//             <footer>
//                 Privacy Policy | Energy FM © 2026
//             </footer>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit, Trash2, Plus, Clock } from "lucide-react";
import { Home, User, Tv, Calendar, LogOut } from "lucide-react";
import { DayPicker } from 'react-day-picker';

// Start and end numbers for the math calculations (unfinished feature)
type ScheduledProgram = {
    id: string;
    title: string;
    timeSlot: string; // visual text display
    start: number;    // e.g., 9.0 for 9:00 AM
    end: number;      // e.g., 11.0 for 11:00 AM
    dj: string;
    status: "Available" | "Unavailable";
};

export default function SuperadminSchedule() {
    
    const [schedule, setSchedule] = useState<ScheduledProgram[]>([
    { 
        id: "1", 
        title: "KUMPLETOS REKADOS", 
        timeSlot: "9:00 AM - 11:00 AM | WEEKDAYS", 
        start: 9.0, // 9:00 AM
        end: 11.0,  // 11:00 AM
        dj: "DJ Barbie", 
        status: "Unavailable" 
    },
    { 
        id: "2", 
        title: "LOVELINES", 
        timeSlot: "12:00 PM - 2:00 PM | WEEKDAYS", 
        start: 12.0, // 12:00 PM
        end: 14.0,   // 2:00 PM (14:00 in 24hr time)
        dj: "Papa Gats", 
        status: "Available" 
    }
]);

    // 2. UPDATE STATE TO USE REAL DATE OBJECTS (Defaults to today)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        // BACKEND TODO: Fetch schedule data when 'selectedDate' changes
        if (selectedDate) {
            console.log("Fetching schedule for:", selectedDate.toISOString());
        }
    }, [selectedDate]);

    const handleCreate = () => alert("Open Create Schedule Form");
    const handleEdit = (id: string) => console.log("Editing schedule ID:", id);
    const handleDelete = (id: string) => {
        if(window.confirm("Remove this program?")) setSchedule(schedule.filter(s => s.id !== id));
    };
    const handleAssignSub = (id: string) => console.log("Assigning sub for:", id);

    // Formats the Date object
    const formattedDate = selectedDate 
        ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
        : "Select a date";

    return (
        <div className="ss-page-container">
            <h1 className="ss-page-title">Program Scheduling</h1>

            <div className="ss-grid">
                
                {/* LEFT COLUMN */}
                <div className="ss-left-col">
                    
                    <div className="ss-card ss-calendar-widget">

                        <DayPicker 
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="ss-custom-calendar" 
                        />
                    </div>

                    {/* DJ AVAILABILITY LIST */}
                    <div className="ss-card ss-availability-widget">
                        <div className="ss-avail-list">
                            {schedule.map(prog => (
                                <div key={`avail-${prog.id}`} className="ss-avail-item">
                                    <div className="ss-avail-info">
                                        <h4>{prog.title}</h4>
                                        <p>Assigned DJ: <strong>{prog.dj}</strong></p>
                                    </div>
                                    <span className={`ss-badge ${prog.status === 'Available' ? 'ss-badge-blue' : 'ss-badge-yellow'}`}>
                                        {prog.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="ss-right-col">
                    <div className="ss-timeline-card">
                        
                        <div className="ss-timeline-header">
                            <button className="ss-btn-create" onClick={handleCreate}>
                                Create <Plus size={16} />
                            </button>
                            
                            <button className="ss-btn-date">
                                <CalendarIcon size={16} /> {formattedDate}
                            </button>
                        </div>

                        <div className="ss-timeline-body">
                            <div className="ss-time-gutter">
                                <span>8:00 AM</span><span>9:00 AM</span><span>10:00 AM</span>
                                <span>11:00 AM</span><span>12:00 PM</span><span>1:00 PM</span>
                                <span>2:00 PM</span><span>3:00 PM</span><span>4:00 PM</span>
                                <span>5:00 PM</span><span>6:00 PM</span>
                            </div>

                            <div className="ss-schedule-content">
                                {schedule.map(prog => (
                                    <div key={prog.id} className="ss-schedule-item">
                                        <div className="ss-sched-header">
                                            <h3>{prog.title}</h3>
                                            <div className="ss-sched-actions">
                                                <button onClick={() => handleEdit(prog.id)}><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(prog.id)}><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                        
                                        <div className="ss-sched-time">
                                            <Clock size={14} /> {prog.timeSlot}
                                        </div>
                                        
                                        <div className="ss-sched-footer">
                                            <div className="ss-dj-info">
                                                <strong>{prog.dj}</strong>
                                                <span className={`ss-badge ${prog.status === 'Available' ? 'ss-badge-blue' : 'ss-badge-yellow'}`}>
                                                    {prog.status}
                                                </span>
                                            </div>
                                            {prog.status === 'Unavailable' && (
                                                <button className="ss-btn-outline" onClick={() => handleAssignSub(prog.id)}>
                                                    Assign Substitute DJ
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
