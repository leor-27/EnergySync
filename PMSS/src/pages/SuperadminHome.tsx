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