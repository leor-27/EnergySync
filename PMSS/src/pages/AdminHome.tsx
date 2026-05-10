import { useEffect } from "react";
import { Calendar, Search, SlidersHorizontal, Bell } from "lucide-react";

export default function AdminHome() {
  useEffect(() => {}, []);

  return (
    <>
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
          </div>
        </aside>
      </div>
    </>
  );
}