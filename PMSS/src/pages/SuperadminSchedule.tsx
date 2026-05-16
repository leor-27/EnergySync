import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Edit, Trash2, Plus, Clock } from "lucide-react"; 
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/useAuth"

type ScheduledProgram = {
    schedule_ID: number;
    program_ID: number;
    program_name: string;

    start_time: string;
    end_time: string;

    start: number;
    end: number;

    timeSlot: string;

    day_types: string;

    dj_name: string;

    status: string;

approval_status?: string;

availability_status?: string;

substitute_dj?: string;
};

export default function SuperadminSchedule() {
    const navigate = useNavigate();

    // const [schedule, setSchedule] = useState<ScheduledProgram[]>([
    // { 
    //     id: "1", 
    //     title: "KUMPLETOS REKADOS", 
    //     timeSlot: "9:00 AM - 11:00 AM | WEEKDAYS", 
    //     start: 9.0, // 9:00 AM
    //     end: 11.0,  // 11:00 AM
    //     dj: "DJ Barbie", 
    //     status: "Unavailable" 
    // },
    // { 
    //     id: "2", 
    //     title: "LOVELINES", 
    //     timeSlot: "12:00 PM - 2:00 PM | WEEKDAYS", 
    //     start: 12.0, // 12:00 PM
    //     end: 14.0,   // 2:00 PM (14:00 in 24hr time)
    //     dj: "Papa Gats", 
    //     status: "Available" 
    // }
// ]);

    // 2. UPDATE STATE TO USE REAL DATE OBJECTS (Defaults to today)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const [newProgram, setNewProgram] = useState({
        title: "", 
        dj: "",
        timeSlot: "",
    })

    const [programs, setPrograms] = useState<any[]>([]);
    const [program_schedules, setProgramSchedules] = useState<any[]>([]);
    const [djs, setDjs] = useState<any[]>([]);
    const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
    const [schedule_day_types, setScheduleDayTypes] = useState<any[]>([]);
    const [substitutions, setSubstitutions] = useState<any[]>([]);
    const [
  pendingRequests,
  setPendingRequests
] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSubDialog, setOpenSubDialog] = useState(false);
    const [editingProgram, setEditingProgram] = useState<any | null>(null);
    const [selectedDjId, setSelectedDjId] =
  useState<number | null>(null);
  const { user } = useAuth();

       // Formats the Date object
    const formattedDate = selectedDate 
        ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
        : "Select a date";

    useEffect(() => {
    const fetchData = async () => {
      try {
        const djsRes = await fetch("http://localhost:5000/api/djs");
        const djsJson = await djsRes.json();

        const programsRes = await fetch("http://localhost:5000/api/programs");
        const programsJson = await programsRes.json();

        // const schedulesRes = await fetch("http://localhost:5000/api/program_schedules");
        // const schedulesJson = await schedulesRes.json();

        const formattedSelectedDate =
selectedDate
  ?.toISOString()
  .split("T")[0];

const schedulesRes =
await fetch(
  `http://localhost:5000/api/schedule-by-date/${formattedSelectedDate}`
);

const schedulesJson =
await schedulesRes.json();

if (schedulesJson.success) {

  setProgramSchedules(
    schedulesJson.data
  );

}

        const programDjAssignmentsRes = await fetch("http://localhost:5000/api/program_dj_assignments");
        const programDjAssignmentsJson = await programDjAssignmentsRes.json();

        const scheduleDayTypesRes = await fetch("http://localhost:5000/api/schedule_day_types");
        const scheduleDayTypesJson = await scheduleDayTypesRes.json();

        const substitutionsRes = await fetch("http://localhost:5000/api/substitutions");
        const substitutionsJson = await substitutionsRes.json();

        const pendingRes =
  await fetch(
    "http://localhost:5000/api/dj_availability/pending-unavailability"
  );

const pendingJson =
  await pendingRes.json();

if (pendingJson.success) {

  setPendingRequests(
    pendingJson.data
  );

}

        if (djsJson.success) {
          setDjs(djsJson.data);
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

        if (scheduleDayTypesJson.success) {
            setScheduleDayTypes(scheduleDayTypesJson.data);
        }

        if (substitutionsJson.success) {
            setSubstitutions(substitutionsJson.data);
        }
      } catch(err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

        if (selectedDate) {
            console.log("Fetching schedule for:", selectedDate.toISOString());
        }
    }, [selectedDate]);

    const handleCreate = () => alert("Open Create Schedule Form");
    const handleEdit = (id: number) => {
        const selectedProgram = programSchedules.find(
            (prog: any) => prog.schedule_ID === id
        );

        if (selectedProgram) {
            setEditingProgram(selectedProgram);
            setOpenEditDialog(true);
        }
    };

    const handleApprove = async (
  availability_ID: number
) => {

  try {

    const response =
      await fetch(
        "http://localhost:5000/api/dj_availability/approve",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            availability_ID,
            superadmin_ID: 1
          })
        }
      );

    const data =
      await response.json();

    if (data.success) {

      alert("Approved!");

    }

  } catch (err) {

    console.error(err);

  }

};

const handleReject = async (
  availability_ID: number
) => {

  try {

    const response =
      await fetch(
        "http://localhost:5000/api/dj_availability/reject",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            availability_ID,
            superadmin_ID: 1
          })
        }
      );

    const data =
      await response.json();

    if (data.success) {

      alert("Rejected!");

    }

  } catch (err) {

    console.error(err);

  }

};

const handleAssignDJ = async (
  program_ID: number
) => {

  if (!selectedDjId) {

    alert("Select a DJ first");
    return;

  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/program_dj_assignments/assign-dj",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          dj_ID: selectedDjId,
          program_ID,
          admin_ID: 1,
          start_date: new Date()
            .toISOString()
            .split("T")[0]
        })
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("DJ assigned!");

      setOpenEditDialog(false);

    }

  } catch (err) {

    console.error(err);

  }

};

    const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this program?")) return;

    try {
        const response = await fetch(
            `http://localhost:5000/api/program_schedules/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (data.success) {
            setProgramSchedules(
                program_schedules.filter(
                    (s: any) => s.schedule_ID !== id
                )
            );
        }
    } catch (err) {
        console.error("Delete Error:", err);
    }
};

    const handleAssignSub = (id: number) => {
        const selectedProgram = programSchedules.find((prog) => prog.schedule_ID === id);

        if (selectedProgram) {
            setEditingProgram(selectedProgram);
            setOpenSubDialog(true);
        }
    };

    const handleAssignSubstitute =
async (
  assignment_ID: number,
  substitute_dj_ID: number
) => {

  try {

    const res = await fetch(
      "http://localhost:5000/api/substitutions/assign-substitute",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          assignment_ID,

          substitute_dj_ID,

          broadcast_date:
            new Date()
              .toISOString()
              .split("T")[0],

          admin_ID:
            user?.admin_ID

        })

      }
    );

    const data = await res.json();

    if (data.success) {

      alert(
        "Substitute assigned!"
      );

    }

  } catch (err) {

    console.error(err);

  }

};

    const programSchedules: ScheduledProgram[] = programs
    .map((program: any) => {
        const matchedSchedules = program_schedules.filter(
            (schedule: any) =>
                schedule.program_ID === program.program_ID
        );

        if (!matchedSchedules.length) return null;

        const dayTypes = matchedSchedules.map((schedule: any) => {
            const matchedDayType = schedule_day_types.find(
                (day: any) =>
                    day.schedule_day_type_ID === schedule.schedule_day_type_ID
            );

            return matchedDayType?.schedule_day_type || "";
        });

        const matchedAssignment = program_dj_assignments.find(
            (assignment: any) =>
                assignment.program_ID === program.program_ID
        );

        const matchedDj = djs.find(
            (dj: any) =>
                dj.dj_ID === matchedAssignment?.dj_ID
        );

        const convertTimeToDecimal = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours + minutes / 60;
        };

        // Convert SQL time into decimal for timeline
        const startHour = matchedSchedules[0]?.start_time
            ? convertTimeToDecimal(matchedSchedules[0].start_time)
            : 0;

        const endHour = matchedSchedules[0]?.end_time
            ? convertTimeToDecimal(matchedSchedules[0].end_time)
            : 0;

        return {
            ...program,

            schedule_ID:
                matchedSchedules[0]?.schedule_ID,

            assignment_ID:
                matchedAssignment?.assignment_ID,

            start_time:
                matchedSchedules[0]?.start_time || "",

            end_time:
                matchedSchedules[0]?.end_time || "",

            start:
                startHour,

            end:
                endHour,

            timeSlot:
                `${matchedSchedules[0]?.start_time || ""} - ${matchedSchedules[0]?.end_time || ""}`,

            day_types:
                dayTypes.join(", "),

            dj_name:
                matchedDj?.stage_name || "No DJ Assigned",

            status:
    matchedSchedules[0]
      ?.availability_status
      || "Not Confirmed",

approval_status:
    matchedSchedules[0]
      ?.approval_status,

substitute_dj:
    matchedSchedules[0]
      ?.substitute_dj,
        };
    })
    .filter(Boolean) as ScheduledProgram[];
    
    return (
        <>
            <div className="ss-page-container">
            <h1 className="ss-page-title">Program Scheduling</h1>
                <div className="ss-grid">

                    {/* LEFT COLUMN */}
                    <div className="ss-left-col">
                        <Card className="ss-calendar-widget">
                            <CardContent className="p-0">
                                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="ss-custom-calendar" />
                            </CardContent>
                        </Card>

                        {/* DJ AVAILABILITY LIST */}
                        <Card className="ss-availability-widget">
                            <CardContent>
                                <div className="ss-avail-list">
                                    {programSchedules.map(prog => (
                                        <Card key={prog.schedule_ID} className="ss-avail-item">
                                            <CardContent className="p-4">
                                                <div className="ss-avail-info">
                                                    <h4>{prog.program_name}</h4>
                                                    <p>Assigned DJ: <strong>{prog.dj_name}</strong></p>

                                                    <span className={`ss-badge ${
                                                        prog.status === "Available"
                                                            ? "ss-badge-blue"
                                                            : prog.status === "Unavailable"
                                                            ? "ss-badge-yellow"
                                                            : "ss-badge-red"
                                                        }`}>
                                                        {prog.status}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="ss-availability-widget mt-4">

  <CardHeader>
    <h3>
      Pending Unavailability Requests
    </h3>
  </CardHeader>

  <CardContent>

    {pendingRequests.length === 0 && (
      <p>
        No pending requests
      </p>
    )}

    {pendingRequests.map((item) => (

      <div
        key={item.availability_ID}
        className="mb-4 border-b pb-4"
      >

        <p>
          <strong>
            {item.stage_name}
          </strong>
          {" "}filed unavailability
        </p>

        <p>
          Program:
          {" "}
          {item.program_name}
        </p>

        <p>
          Remarks:
          {" "}
          {item.remarks}
        </p>

        <div className="flex gap-2 mt-2">

          <Button
            onClick={() =>
              handleApprove(
                item.availability_ID
              )
            }
          >
            Approve
          </Button>

          <Button
            variant="destructive"
            onClick={() =>
              handleReject(
                item.availability_ID
              )
            }
          >
            Reject
          </Button>

        </div>

      </div>

    ))}

  </CardContent>

</Card>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="ss-right-col">
                        <Card className="ss-timeline-card">
                            <CardHeader>
                                <div className="ss-timeline-header">
                                    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                                        <DialogContent className="ss-dialog-content sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Program Schedule</DialogTitle>
                                            </DialogHeader>

                                            {editingProgram && (
                                                <div className="ss-dialog-form">

                                                    {/* PROGRAM TITLE (READ ONLY) */}
                                                    <div className="ss-form-group">
                                                        <Label>Program Title</Label>
                                                        <Input value={editingProgram.program_name} disabled className="ss-disabled-input" />
                                                    </div>

                                                    <div className="ss-form-group">
                                                        <Label>Assign a DJ</Label>
                                                        <select
  className="ss-dj-select"

  value={selectedDjId || ""}

  onChange={(e) =>
    setSelectedDjId(
      Number(e.target.value)
    )
  }
>
  <option value="">
    Select DJ
  </option>

  {djs.map((dj) => (
    <option
      key={dj.dj_ID}
      value={dj.dj_ID}
    >
      {dj.stage_name}
    </option>
  ))}
</select>
                                                    </div>

                                                    <div className="ss-form-group">
                                                        <Label>Time Slot</Label>

                                                        <div className="ss-time-slot-row">
                                                            <select className="ss-time-dropdown">
                                                                <option>9:00</option>
                                                                <option>10:00</option>
                                                                <option>11:00</option>
                                                            </select>

                                                            <select className="ss-ampm-dropdown">
                                                                <option>AM</option>
                                                                <option>PM</option>
                                                            </select>

                                                            <span className="ss-time-dash">-</span>

                                                            {/* END TIME */}
                                                            <select className="ss-time-dropdown">
                                                                <option>9:00</option>
                                                                <option>10:00</option>
                                                                <option>11:00</option>
                                                            </select>

                                                            <select className="ss-ampm-dropdown">
                                                                <option>AM</option>
                                                                <option>PM</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="ss-form-group">
                                                        <Label>Day</Label>

                                                        <select className="ss-day-select">
                                                            <option>WEEKDAYS</option>
                                                            <option>SATURDAY</option>
                                                            <option>SUNDAY</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            )}

<DialogFooter>

  <Button
    variant="outline"
    onClick={() =>
      setOpenEditDialog(false)
    }
  >
    Cancel
  </Button>

  <Button
    onClick={() =>
      handleAssignDJ(
        editingProgram.program_ID
      )
    }
  >
    Assign DJ
  </Button>

</DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                        <DialogTrigger asChild>
                                            <Button className="ss-btn-create">
                                                Create <Plus size={16} />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="ss-dialog-content sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle>New Program Schedule</DialogTitle>
                                            </DialogHeader>

                                            <div className="ss-dialog-form">
                                                <div className="ss-form-group">
                                                    <Label>Program</Label>
                                                    <select className="ss-program-select">
                                                        <option>Harambogan Sa Radyo</option>
                                                        <option>Kumpletos Rekados</option>
                                                    </select>
                                                </div>

                                                <div className="ss-form-group">
                                                    <Label>Assign a DJ</Label>
                                                    <select className="ss-dj-select">
                                                        <option>DJ Makisig</option>
                                                        <option>DJ Barbie</option>
                                                        <option>DJ Apple</option>
                                                    </select>
                                                </div>

                                                <div className="ss-form-group">
                                                    <Label>Time Slot</Label>

                                                    <div className="ss-time-slot-row">
                                                        <select className="ss-time-dropdown">
                                                            <option>9:00</option>
                                                            <option>10:00</option>
                                                            <option>11:00</option>
                                                        </select>

                                                        <select className="ss-ampm-dropdown">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>

                                                        <span className="ss-time-dash">-</span>

                                                        {/* END TIME */}
                                                        <select className="ss-time-dropdown">
                                                            <option>9:00</option>
                                                            <option>10:00</option>
                                                            <option>11:00</option>
                                                        </select>

                                                        <select className="ss-ampm-dropdown">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="ss-form-group">
                                                    <Label>Day</Label>

                                                    <select className="ss-day-select">
                                                        <option>WEEKDAYS</option>
                                                        <option>SATURDAY</option>
                                                        <option>SUNDAY</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                                                    Cancel
                                                </Button>

                                                <Button
    onClick={async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/program_schedules",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        program_ID: 1, // replace with selected program
                        start_time: "09:00:00",
                        end_time: "11:00:00",
                        schedule_day_type_ID: 1,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setProgramSchedules([
                    ...program_schedules,
                    data.data,
                ]);

                setOpenDialog(false);
            }
        } catch (err) {
            console.error("Create Error:", err);
        }
    }}
>
    Create Schedule
</Button>
                                                
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog open={openSubDialog} onOpenChange={setOpenSubDialog}>
                                        <DialogContent className="ss-dialog-content sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle>Assign Substitute DJ</DialogTitle>
                                            </DialogHeader>

                                            <div className="ss-dialog-form">
                                                <div className="ss-form-group">
                                                    <Label>Available DJs</Label>
                                                    <select
  className="ss-day-select"
  value={newProgram.dj}
  onChange={(e) =>
    setNewProgram({
      ...newProgram,
      dj: e.target.value,
    })
  }
>

  <option value="">
    Select DJ
  </option>

  {djs.map((dj) => (

    <option
      key={dj.dj_ID}
      value={dj.dj_ID}
    >
      {dj.stage_name}
    </option>

  ))}

</select>
                                                </div>
                                            </div>

                                            <DialogFooter>

  <Button
    variant="outline"
    onClick={() => setOpenSubDialog(false)}
  >
    Cancel
  </Button>

  <Button
    onClick={() => {

      if (!editingProgram) return;

      handleAssignSubstitute(
        editingProgram.assignment_ID,
        Number(newProgram.dj)
      );

      setOpenSubDialog(false);

      setNewProgram({
        title: "",
        dj: "",
        timeSlot: "",
      });

    }}
  >
    Assign
  </Button>

</DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button className="ss-btn-date">
                                        <CalendarIcon size={16} /> {formattedDate}
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="ss-timeline-body">
                                    <div className="ss-time-gutter">
                                        <span>8:00 AM</span>
                                        <span>9:00 AM</span>
                                        <span>10:00 AM</span>
                                        <span>11:00 AM</span>
                                        <span>12:00 PM</span>
                                        <span>1:00 PM</span>
                                        <span>2:00 PM</span>
                                        <span>3:00 PM</span>
                                        <span>4:00 PM</span>
                                        <span>5:00 PM</span>
                                        <span>6:00 PM</span>
                                    </div>

                                    <div className="ss-schedule-content">
                                        {programSchedules.map(prog => {
                                            const top = (prog.start - 8) * 90;
                                            const height = (prog.end - prog.start) * 90;

                                            return (
                                                <div key={prog.schedule_ID} className="ss-schedule-item"
                                                    style={{
                                                        top: `${top}px`,
                                                        height: `${height}px`,
                                                        position: "absolute",
                                                        left: "1rem",
                                                        right: "1rem",
                                                    }}
                                                >
                                                <div className="ss-sched-header">
                                                    <h3>{prog.program_name}</h3>

                                                    <div className="ss-sched-actions">
                                                        <button onClick={() => handleEdit(prog.schedule_ID)}>
                                                            <Edit size={18} />
                                                        </button>

                                                        <button onClick={() => handleDelete(prog.schedule_ID)}>
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="ss-sched-time">
                                                    <Clock size={14} /> {prog.timeSlot}
                                                </div>

                                                <div className="ss-sched-footer">
                                                    <div className="ss-dj-info">
                                                        <strong>{prog.dj_name}</strong>

                                                        <span
                                                            className={`ss-badge ${
  prog.status === "Available"
    ? "ss-badge-blue"
    : prog.status === "Unavailable"
    ? "ss-badge-yellow"
    : "ss-badge-red"
}`} >
                                                            {prog.status}
                                                        </span>
                                                    </div>

                                                    {prog.substitute_dj && (
  <p>
    Substitute:
    <strong>
      {prog.substitute_dj}
    </strong>
  </p>
)}

                                                        {prog.status === "Unavailable"
&&
prog.approval_status === "Approved" && (
                                                            <button className="ss-btn-outline" onClick={() => handleAssignSub(prog.schedule_ID)}>
                                                                Assign Substitute DJ
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ADD THE TABLE HERE */}
                                <div className="ss-table-wrapper">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Program</TableHead>
                                                <TableHead>DJ</TableHead>
                                                <TableHead>Time Slot</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {programSchedules.map((prog) => (
                                                <TableRow key={prog.schedule_ID}>
                                                    <TableCell>{prog.program_name}</TableCell>
                                                    <TableCell>{prog.dj_name}</TableCell>
                                                    <TableCell>{prog.timeSlot}</TableCell>

                                                    <TableCell>
                                                        <span className={`ss-badge ${
  prog.status === "Available"
    ? "ss-badge-blue"
    : prog.status === "Unavailable"
    ? "ss-badge-yellow"
    : "ss-badge-red"
}`} >
                                                            {prog.status}
                                                        </span>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="ss-table-actions">
                                                            <button onClick={() => handleEdit(prog.schedule_ID)}>
                                                                <Edit size={16} />
                                                            </button>

                                                            <button onClick={() => handleDelete(prog.schedule_ID)}>
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}