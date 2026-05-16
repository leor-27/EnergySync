import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Search, SlidersHorizontal, Bell } from "lucide-react";
import { useAuth } from "@/contexts/useAuth"

export default function AdminHome() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [program_schedules, setProgramSchedules] = useState<any[]>([]);
  const [djs, setDjs] = useState<any[]>([]);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [
  program_dj_assignments,
  setProgramDjAssignments
] = useState<any[]>([]);

const [
  selectedStatuses,
  setSelectedStatuses
] = useState<Record<number, string>>({});

const [
  remarks,
  setRemarks
] = useState<Record<number, string>>({});

  const navigate = useNavigate();

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

        const programDjAssignmentsRes =
  await fetch(
    "http://localhost:5000/api/program_dj_assignments"
  );

const programDjAssignmentsJson =
  await programDjAssignmentsRes.json();

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

  setProgramDjAssignments(
    programDjAssignmentsJson.data
  );

}
      } catch(err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentDj = djs.find(
    (dj) => Number(dj.admin_ID) === Number(user?.admin_ID)
  );

  // Merge schedules with programs
  const programCards =
  program_schedules
    .map((schedule: any) => {

      const matchedProgram =
        programs.find(
          (p) =>
            p.program_ID ===
            schedule.program_ID
        );

      const matchedAssignment =
  program_dj_assignments.find(
    (a) =>
      a.schedule_ID ===
      schedule.schedule_ID
  );

      return {

        ...schedule,

        assignment_ID:
          matchedAssignment?.assignment_ID,

        dj_ID:
          matchedAssignment?.dj_ID,

        program_name:
          matchedProgram?.program_name
          || "Unknown Program"

      };

    })

    .filter(
      (program: any) =>
        Number(program.dj_ID) ===
        Number(currentDj?.dj_ID)
    );

   // Handler to navigate and pass notification data
  const handleNotifClick = (notif: any) => {
    navigate("/admin-profile", { state: { selectedNotif: notif } });
  };

  if (loading) {
    return <div>Loading...</div>;
  } // change to the query

const handleSubmitUnavailable =
async (program: any) => {

  try {

    const matchedAssignment =
      program_dj_assignments.find(
        (a) =>
          a.schedule_ID ===
          program.schedule_ID
      );

    if (!matchedAssignment) {

      alert("Assignment not found");

      return;

    }

    if (
  !remarks[program.schedule_ID]
) {

  alert(
    "Remarks are required."
  );

  return;

}

    const res = await fetch(
      "http://localhost:5000/api/dj-availability",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          assignment_ID:
            matchedAssignment.assignment_ID,

          broadcast_date:
            new Date()
              .toISOString()
              .split("T")[0],

          status: "Unavailable",

          remarks:
            remarks[
              program.schedule_ID
            ]

        })

      }
    );

    const data = await res.json();

    if (data.success) {

      alert(
        "Unavailability submitted successfully."
      );

    }

  } catch (err) {

    console.error(err);

  }

};
  
  return (
    <>
      <div className="welcome-section">
        <h1 className="welcome-text">Welcome, {user?.stage_name || "DJ"}!</h1>
        {/* <h1 className="welcome-text">Welcome, {user?.stage_name || "DJ"}!</h1> */}
      </div>

      <div className="dashboard-grid">
        <section className="search-container">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search" />
            <SlidersHorizontal size={18} className="filter-icon" />
          </div>
        {programCards.length > 0 ? (
          programCards.map((program: any) => (
            <div className="program-card" key={program.schedule_ID}>
              <div className="program-info">
                <h3>{program.program_name}</h3>
                <p><Calendar size={14} /> {program.start_time} - {program.end_time}</p>
              </div>
              <select
  className="status-dropdown"
  value={selectedStatuses[program.schedule_ID] || "Available"}
  onChange={(e) =>
    setSelectedStatuses({
      ...selectedStatuses,
      [program.schedule_ID]: e.target.value
    })
  }
>
  <option value="Available">Available</option>
  <option value="Unavailable">Unavailable</option>
</select>

{selectedStatuses[program.schedule_ID] === "Unavailable" && (
  <div style={{ marginTop: "10px" }}>
    
    <textarea
      placeholder="Enter remarks..."
      value={remarks[program.schedule_ID] || ""}
      onChange={(e) =>
        setRemarks({
          ...remarks,
          [program.schedule_ID]: e.target.value
        })
      }
    />

    <button
      onClick={() =>
        handleSubmitUnavailable(program)
      }
    >
      Submit
    </button>

  </div>
)}
            </div>
          ))
        ) : (
          <p>No programs scheduled.</p> // Added the missing ":" part of the ternary
        )}
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
            {notifications.map((notif) => (
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