import { useEffect } from "react";
import { Link, NavLink, useNavigate} from "react-router-dom";
import { Home, User, Calendar, LogOut } from "lucide-react"; 

export default function AdminProfile() {
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