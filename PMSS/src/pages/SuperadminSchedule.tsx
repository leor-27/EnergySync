import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, User, Tv, Calendar, LogOut } from "lucide-react"; 

export default function SuperadminSchedule() {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <div className="superadmin-layout">
            <header className="main-header">
                <div className="header-content">
                    <section className="header-image">
                        <Link to="/superadmin-home">
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
                            <NavLink to="/superadmin-home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <Home size={20} />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/superadmin-profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <User size={20} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/superadmin-program" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <Tv size={20} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/superadmin-schedule" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
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
                    </ul>
                </nav>

                {/* <main className="main-content">
                    <div className="welcome-section">
                         <h1 className="welcome-text">Welcome, DJ Makisig!</h1>
                    </div>
                </main> */}
            </div>

            <footer>
                Privacy Policy | Energy FM © 2026
            </footer>
        </div>
    );
}