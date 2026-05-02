// import { useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Home, User, Tv, Calendar, LogOut, Search, SlidersHorizontal, Bell } from "lucide-react"; 

// export default function SuperadminHome() {
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

//                 <main className="main-content">
//                     <div className="welcome-section">
//                          <h1 className="welcome-text">Welcome, DJ Makisig!</h1>
//                     </div>

//                     <div className="dashboard-grid">
//                         <section className="search-container">
//                             <div className="search-bar">
//                                 <Search size={18} className="search-icon" />
//                                 <input type="text" placeholder="Search" />
//                                 <SlidersHorizontal size={18} className="filter-icon" />
//                             </div>

//                             <div className="program-card">
//                                 <div className="program-info">
//                                     <h3>Energy sa Hapon</h3>
//                                     <p><Calendar size={14} /> 3:00 PM - 5:00 PM</p>
//                                 </div>
//                                 <div className="assigned-dj-badge">
//                                     DJ Apple
//                                 </div>
//                             </div>
//                         </section>

//                         <aside className="notifications-panel">
//                             <div className="notifications-header">
//                                 <div className="notif-title">
//                                     <Bell size={18} />
//                                     <span>Notifications</span>
//                                 </div>
//                                 <div className="notif-search">
//                                     <input type="text" placeholder="Search..." />
//                                     <Search size={14} />
//                                 </div>
//                             </div>
//                             <div className="notif-list">
//                                 <div className="notif-item">
//                                     <div className="notif-dot red"></div>
//                                     <div className="notif-content">
//                                         <p>DJ Apple confirmed her attendance to ho...</p>
//                                         <span className="notif-time">2:00 PM</span>
//                                     </div>
//                                 </div>
//                                 <div className="notif-item">
//                                     <div className="notif-dot pink"></div>
//                                     <div className="notif-content">
//                                         <p>DJ Barbie is not available to host "Energy sa...</p>
//                                         <span className="notif-time">Mar 13</span>
//                                     </div>
//                                 </div>
//                                 <div className="notif-item">
//                                     <div className="notif-dot green"></div>
//                                     <div className="notif-content">
//                                         <p>Papa Gats confirmed his attendance</p>
//                                         <span className="notif-time">Mar 13</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </aside>
//                     </div>
//                 </main>
//             </div>

//             <footer>
//                 Privacy Policy | Energy FM © 2026
//             </footer>
//         </div>
//     );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Search, SlidersHorizontal, Bell } from "lucide-react"; 

export default function SuperadminHome() {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <>
                    <div className="welcome-section">
                         <h1 className="welcome-text">Welcome, DJ Makisig!</h1>
                    </div>

                    <div className="dashboard-grid">
                        <section className="search-container">
                            <div className="search-bar">
                                <Search size={18} className="search-icon" />
                                <input type="text" placeholder="Search" />
                                <SlidersHorizontal size={18} className="filter-icon" />
                            </div>

                            <div className="program-card">
                                <div className="program-info">
                                    <h3>Energy sa Hapon</h3>
                                    <p><Calendar size={14} /> 3:00 PM - 5:00 PM</p>
                                </div>
                                <div className="assigned-dj-badge">
                                    DJ Apple
                                </div>
                            </div>
                        </section>

                        <aside className="notifications-panel">
                            <div className="notifications-header">
                                <div className="notif-title">
                                    <Bell size={18} />
                                    <span>Notifications</span>
                                </div>
                                <div className="notif-search">
                                    <input type="text" placeholder="Search..." />
                                    <Search size={14} />
                                </div>
                            </div>
                            <div className="notif-list">
                                <div className="notif-item">
                                    <div className="notif-dot red"></div>
                                    <div className="notif-content">
                                        <p>DJ Apple confirmed her attendance to ho...</p>
                                        <span className="notif-time">2:00 PM</span>
                                    </div>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-dot pink"></div>
                                    <div className="notif-content">
                                        <p>DJ Barbie is not available to host "Energy sa...</p>
                                        <span className="notif-time">Mar 13</span>
                                    </div>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-dot green"></div>
                                    <div className="notif-content">
                                        <p>Papa Gats confirmed his attendance</p>
                                        <span className="notif-time">Mar 13</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
        </>
    );
}