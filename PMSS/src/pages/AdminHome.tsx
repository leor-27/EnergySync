import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Search, SlidersHorizontal, Bell } from "lucide-react";
import { useAuth } from "@/contexts/useAuth"

export default function AdminHome() {
  const API_URL =
  import.meta.env.VITE_API_URL
  const [notifications, setNotifications] = useState<any[]>([]);
  const [
  readNotifications,
  setReadNotifications
] = useState<number[]>([])

useEffect(() => {

  const saved =
    localStorage.getItem(
      "readNotifications"
    )

  if (saved) {

    setReadNotifications(
      JSON.parse(saved)
    )

  }

}, [])

useEffect(() => {

  localStorage.setItem(
    "readNotifications",
    JSON.stringify(
      readNotifications
    )
  )

}, [readNotifications])

  const [programs, setPrograms] = useState<any[]>([]);
  const [program_schedules, setProgramSchedules] = useState<any[]>([]);
  const [djs, setDjs] = useState<any[]>([]);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  )
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
        const [
          djsRes,
          notificationsRes,
          programsRes,
          schedulesRes,
          assignmentsRes
        ] = await Promise.all([
         fetch(`${API_URL}/api/djs`, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
}),
         fetch(`${API_URL}/api/notifications`, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
}),
         fetch(`${API_URL}/api/programs`, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
}),
         fetch(`${API_URL}/api/program_schedules`, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
}),
fetch(`${API_URL}/api/program_dj_assignments`, {
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
})

        ])
        const djsJson = await djsRes.json();

        const notificationsJson = await notificationsRes.json();

        const programsJson = await programsRes.json();

        const schedulesJson = await schedulesRes.json();

const programDjAssignmentsJson =
  await assignmentsRes.json();

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
  }, [API_URL]);

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
  const handleNotifClick =
(notif: any) => {

  setReadNotifications((prev) => {

  if (
    prev.includes(
      notif.notification_ID
    )
  ) {
    return prev
  }

  return [
    ...prev,
    notif.notification_ID
  ]

})

  navigate(
    "/admin-profile",
    {
      state: {
        selectedNotif: notif
      }
    }
  )

}

  if (loading) {
    return <div>Loading...</div>;
  } // change to the query

  const handleAvailabilityUpdate =
async (
  program: any,
  status: "Available" | "Unavailable"
) => {

  try {

    const matchedAssignment =
      program_dj_assignments.find(
        (a) =>
          a.schedule_ID ===
          program.schedule_ID
      )

    if (!matchedAssignment) {
      alert("Assignment not found")
      return
    }

    if (
      status === "Unavailable" &&
      !remarks[program.schedule_ID]
    ) {
      alert("Remarks are required.")
      return
    }

    const res = await fetch(
       `${API_URL}/api/dj-availability`,
      {
        method: "POST",

        headers: {
  "Content-Type":
    "application/json",

  Authorization:
    `Bearer ${localStorage.getItem("token")}`
},

        body: JSON.stringify({

          assignment_ID:
            matchedAssignment.assignment_ID,

          broadcast_date: selectedDate,

          status,

          remarks:
            status === "Unavailable"
              ? remarks[
                  program.schedule_ID
                ]
              : null

        })
      }
    )

    const data = await res.json()

    if (data.success) {

      alert(
        `DJ marked as ${status}`
      )

    }

  } catch (err) {

    console.error(err)

  }

}
  
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

  value={
    selectedStatuses[
      program.schedule_ID
    ] || "Available"
  }

  onChange={(e) => {

    const value = e.target.value

    setSelectedStatuses({
      ...selectedStatuses,
      [program.schedule_ID]: value
    })

    // only auto-submit AVAILABLE
    if (value === "Available") {

      handleAvailabilityUpdate(
        program,
        "Available"
      )

    }

  }}
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
          [program.schedule_ID]:
            e.target.value
        })
      }
    />

    <button
      onClick={() =>
        handleAvailabilityUpdate(
          program,
          "Unavailable"
        )
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
              <span>
  Notifications
  (
    {
      notifications.filter(
        (n) =>
          !readNotifications.includes(
            n.notification_ID
          )
      ).length
    }
  )
</span>
            </div>
            <div className="notif-search">
              <input type="text" placeholder="Search..." />
              <Search size={14} />
            </div>
          </div>

          <div className="notif-list">
            {[...notifications]

  .sort(
    (a, b) =>
      new Date(
        b.notified_at
      ).getTime()
      -
      new Date(
        a.notified_at
      ).getTime()
  )

  .map((notif) => (
              <div className="notif-item clickable" key={notif.notification_ID} onClick={() => handleNotifClick(notif)}>
              {!readNotifications.includes(
  notif.notification_ID
) && (
  <div className="notif-dot red"></div>
)}
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