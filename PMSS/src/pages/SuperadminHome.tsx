import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Search, SlidersHorizontal, Bell } from "lucide-react"; 
import { useAuth } from "@/contexts/useAuth"

export default function SuperadminHome() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<any[]>([]);
    const [programs, setPrograms] = useState<any[]>([]);
    const [program_schedules, setProgramSchedules] = useState<any[]>([]);
    const [djs, setDjs] = useState<any[]>([]);
    const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth()

    useEffect(() => {
    const fetchData = async () => {
      try {
        const djsRes = await fetch("http://localhost:5000/api/djs");
        const djsJson = await djsRes.json();

        const notificationsRes = await fetch("http://localhost:5000/api/notifications");
        const notificationsJson = await notificationsRes.json();

        const programsRes = await fetch("http://localhost:5000/api/programs");
        const programsJson = await programsRes.json();

        const schedulesRes = await fetch("http://localhost:5000/api/program_schedules");
        const schedulesJson = await schedulesRes.json();

        const programDjAssignmentsRes = await fetch("http://localhost:5000/api/program_dj_assignments");
        const programDjAssignmentsJson = await programDjAssignmentsRes.json();

        if (djsJson.success) {
          setDjs(djsJson.data);
        }

        if (notificationsJson.success) {
          setNotifications(notificationsJson.data);
        }

        if (programsJson.success) {
          setPrograms(programsJson.data);
        }

        if (schedulesJson.success) {
          setProgramSchedules(schedulesJson.data);
        }

        if (programDjAssignmentsJson.success) {
          setProgramDjAssignments(programDjAssignmentsJson.data);
        }
      } catch(err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

    const programCards = program_schedules.map((schedule: any) => {
        const matchedProgram = programs.find(p => p.program_ID === schedule.program_ID);
        const matchedAssignment = program_dj_assignments.find(
  (a) => a.schedule_ID === schedule.schedule_ID
);
        const matchedDj = djs.find(dj => dj.dj_ID === matchedAssignment?.dj_ID);

    return {
        ...schedule,
        program_name:
        matchedProgram?.program_name || "Unknown Program",

        dj_name:
        matchedDj?.stage_name || "No DJ Assigned",
    };
    });

    const handleNotifClick = (notif: any) => {
        navigate("/superadmin-profile", { state: { selectedNotif: notif } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // const currentDj = djs[0];

    return (
        <>
            <div className="welcome-section">
                <h1 className="welcome-text">Welcome, {user?.stage_name || "DJ"}!</h1>
            </div>

            <div className="dashboard-grid">
                <section className="search-container">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search" />
                        <SlidersHorizontal size={18} className="filter-icon" />
                    </div>
                    {programCards.map((program: any) => (
                        <div className="program-card" key={program.schedule_ID}>
                        <div className="program-info">
                            <h3>{program.program_name}</h3>
                            <p><Calendar size={14} /> {program.start_time} - {program.end_time}</p>
                        </div>
                        <div className="assigned-dj-badge">{program.dj_name}</div>
                    </div>
                    ))}
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
                        {notifications.map((notif: any) => (
                            <div className="notif-item clickable" key={notif.notification_ID} onClick={() => handleNotifClick(notif)}>
                                <div className="notif-dot red"></div>
                                <div className="notif-content">
                                    <p>{notif.message}</p>
                                    <span className="notif-time">
                                    {new Date(
                                        notif.notified_at
                                        ).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    );
}