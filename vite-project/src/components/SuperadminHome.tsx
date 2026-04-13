import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, User, Monitor, Calendar, LogOut } from "lucide-react"; 

export default function SuperadminHome() {
    useEffect(() => {

    }, []);

    return (
        <div className="superadmin-layout">
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
                        <li className="nav-item active">
                            <Link to="/superadmin-home">
                                <Home size={22} />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/superadmin-profile">
                                <User size={22} />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/superadmin-program">
                                <Monitor size={22} />
                                <span>Program</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/superadmin-schedule">
                                <Calendar size={22} />
                                <span>Schedule</span>
                            </Link>
                        </li>
                        <li className="nav-item logout">
                            <a href="/backend/logout.js">
                                <LogOut size={22} />
                                <span>Logout</span>
                            </a>
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