import { useEffect } from "react";

export default function AdminSchedule() {
    useEffect(() => {

    }, []);

    return (
    <div className="admin-schedule">

        <header>
            <div className="header-content">
                <section className="header-image">
                    <img src="/images/logo.png" className="logo" alt="Energy FM 106.3 Naga Logo" />
                </section>
                <div className="title"> 
                    <h1>EnergySync</h1>
                </div>
            </div>

            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

            <div className="dropdown-menu">
                <a href="/html/home-admin.html">Home</a>
                <a href="/html/profile-admin.html">Profile</a>
                <a href="/html/schedule-admin.html">Schedule</a>
                <a href="/backend/logout.js">Logout</a>
            </div>
        </header>
        
        <footer>
            Privacy Policy | Energy FM © 2026
        </footer>

    </div>
    );
}