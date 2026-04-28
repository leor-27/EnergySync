import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, User, Calendar, LogOut, Search, SlidersHorizontal, Bell } from "lucide-react"; 
import { Button } from "@/components/ui/button"

export default function AdminHome() {
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    return (
        <div className="admin-layout">
            <header className="main-header">
                <div className="header-content">
                    <section className="header-image">
                        <Link to="/admin-home">
                            <img src="/logo.png" className="logo" alt="Energy FM 106.3 Naga Logo" />
                        </Link>
                    </section>
                    <div className="title"> 
                        <h1>EnergySync</h1>
                    </div>
                </div>
            </header>

            <div className="app-body">
                <nav className="sidebar">
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/admin-home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <Home size={20} />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin-profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <User size={20} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin-schedule" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <Calendar size={20} />
                                <span>Schedule</span>
                            </NavLink>
                        </li>
                        <li>
                            <button className="nav-item logout" onClick={() => {
                                localStorage.removeItem("auth")
                                navigate("/")
                            }}>
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </li>

                        {
                            /* const handleLogout = () => {
  localStorage.removeItem("auth")
  navigate("/login")
} <button onClick={handleLogout}>
  <LogOut size={20} />
  Logout
</button> */
                        }
                    </ul>
                </nav>

                <main className="main-content">
                    <div className="welcome-section">
                        <h1 className="welcome-text">Welcome, DJ Apple!</h1>
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
                                <select className="status-dropdown">
                                    <option>Available</option>
                                    <option>Unavailable</option>
                                </select>
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
                                        <p>You confirmed your attendance</p>
                                        <span className="notif-time">2:00 PM</span>
                                    </div>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-dot red"></div>
                                    <div className="notif-content">
                                        <p>DJ Makisig assigned you to host "Energy s...</p>
                                        <span className="notif-time">Mar 13</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/*
                    <Button onClick={() => alert("Button clicked!")} className="test-button"> Test Button </Button>
                    <Button onClick={() => alert("Button 2 clicked!")} className="secondary-button"> Secondary Button</Button>
                    */}
                </main> 
            </div>

            <footer>
                Privacy Policy | Energy FM © 2026
            </footer>
        </div>
    );
}