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

type ScheduledProgram = {
    id: string;
    title: string;
    timeSlot: string; // visual text display
    start: number;    // e.g., 9.0 for 9:00 AM
    end: number;      // e.g., 11.0 for 11:00 AM
    dj: string;
    status: "Available" | "Unavailable";
};

export default function SuperadminSchedule() {
    const navigate = useNavigate();

    const [schedule, setSchedule] = useState<ScheduledProgram[]>([
    { 
        id: "1", 
        title: "KUMPLETOS REKADOS", 
        timeSlot: "9:00 AM - 11:00 AM | WEEKDAYS", 
        start: 9.0, // 9:00 AM
        end: 11.0,  // 11:00 AM
        dj: "DJ Barbie", 
        status: "Unavailable" 
    },
    { 
        id: "2", 
        title: "LOVELINES", 
        timeSlot: "12:00 PM - 2:00 PM | WEEKDAYS", 
        start: 12.0, // 12:00 PM
        end: 14.0,   // 2:00 PM (14:00 in 24hr time)
        dj: "Papa Gats", 
        status: "Available" 
    }
]);

    // 2. UPDATE STATE TO USE REAL DATE OBJECTS (Defaults to today)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const [openDialog, setOpenDialog] = useState(false);

    const [newProgram, setNewProgram] = useState({
        title: "", 
        dj: "",
        timeSlot: "",
    })

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingProgram, setEditingProgram] = useState<ScheduledProgram | null>(null);

       // Formats the Date object
    const formattedDate = selectedDate 
        ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
        : "Select a date";

    useEffect(() => {
         // BACKEND TODO: Fetch schedule data when 'selectedDate' changes
        if (selectedDate) {
            console.log("Fetching schedule for:", selectedDate.toISOString());
        }
    }, [selectedDate]);

    const handleCreate = () => alert("Open Create Schedule Form");
    const handleEdit = (id: string) => {
        const selectedProgram = schedule.find((prog) => prog.id === id);

        if (selectedProgram) {
            setEditingProgram(selectedProgram);
            setOpenEditDialog(true);
        }
    };

    const handleDelete = (id: string) => {
        if(window.confirm("Remove this program?")) setSchedule(schedule.filter(s => s.id !== id));
    };
    const handleAssignSub = (id: string) => console.log("Assigning sub for:", id);
    
    return (
        <>
            <div className="ss-page-container">
            <h1 className="ss-page-title">Program Scheduling</h1>

            <div className="ss-grid">

                {/* LEFT COLUMN */}
                <div className="ss-left-col">

                    <Card className="ss-calendar-widget">
                        <CardContent className="p-0">
                            <Calendar 
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="ss-custom-calendar" 
                            />
                        </CardContent>
                    </Card>

                    {/* DJ AVAILABILITY LIST */}
                    <Card className="ss-availability-widget">
                        <CardContent>
                            <div className="ss-avail-list">
                                {schedule.map(prog => (
                                    <Card key={prog.id} className="ss-avail-item">
                                        <CardContent className="p-4">
                                            <div className="ss-avail-info">
                                                <h4>{prog.title}</h4>
                                                <p>Assigned DJ: <strong>{prog.dj}</strong></p>
                                            </div>
                                            <span className={`ss-badge ${prog.status === 'Available' ? 'ss-badge-blue' : 'ss-badge-yellow'}`}>
                                                {prog.status}
                                            </span>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
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
                                                    <Input value={editingProgram.title} disabled className="ss-disabled-input" />
                                                </div>

                                                <div className="ss-form-group">
                                                    <Label>Assign a DJ</Label>
                                                    <Input value={editingProgram.dj} onChange={(e) =>
                                                        setEditingProgram({...editingProgram, dj: e.target.value, })} />
                                                </div>

                                                <div className="ss-form-group">
                                                    <Label>Time</Label>
                                                        <div className="ss-time-slot-row">
                                                            <Input placeholder="9:00" className="ss-time-input" />

                                                            <select className="ss-time-select">
                                                                <option>AM</option>
                                                                <option>PM</option>
                                                            </select>

                                                            <span className="ss-time-dash">-</span>

                                                            <Input placeholder="11:00" className="ss-time-input" />

                                                            <select className="ss-time-select">
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
                                            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                                            <Button onClick={() => {
                                                    if (!editingProgram) return;

                                                    setSchedule(schedule.map((prog) =>
                                                            prog.id === editingProgram.id ? editingProgram : prog));

                                                    setOpenEditDialog(false);
                                                }}
                                            >
                                               Edit Schedule 
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
                                                <Input value={newProgram.title} onChange={(e) =>
                                                        setNewProgram({...newProgram, title: e.target.value, })} />
                                            </div>

                                            <div className="ss-form-group">
                                                <Label>Assign a DJ</Label>
                                                <Input
                                                    value={newProgram.dj} onChange={(e) =>
                                                        setNewProgram({...newProgram, dj: e.target.value, })} />
                                            </div>

                                            <div className="ss-form-group">
                                                <Label>Time Slot</Label>

                                                <div className="ss-time-slot-row">
                                                    <Input placeholder="9:00" className="ss-time-input"/>

                                                    <select className="ss-time-select">
                                                        <option>AM</option>
                                                        <option>PM</option>
                                                    </select>

                                                    <span className="ss-time-dash">-</span>

                                                    {/* END TIME */}
                                                    <Input placeholder="11:00" className="ss-time-input"/>

                                                    <select className="ss-time-select">
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

                                            <Button onClick={() => {
                                                    const newItem: ScheduledProgram = {
                                                        id: Date.now().toString(),
                                                        title: newProgram.title,
                                                        dj: newProgram.dj,
                                                        timeSlot: newProgram.timeSlot,
                                                        start: 9,
                                                        end: 11,
                                                        status: "Available",
                                                    };

                                                    setSchedule([...schedule, newItem]);

                                                    setOpenDialog(false);

                                                    setNewProgram({
                                                        title: "",
                                                        dj: "",
                                                        timeSlot: "",
                                                    });
                                                }}
                                            >
                                                Create Schedule
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
                                    {schedule.map(prog => (
                                        <div key={prog.id} className="ss-schedule-item">

                                            <div className="ss-sched-header">
                                                <h3>{prog.title}</h3>

                                                <div className="ss-sched-actions">
                                                    <button onClick={() => handleEdit(prog.id)}>
                                                        <Edit size={18} />
                                                    </button>

                                                    <button onClick={() => handleDelete(prog.id)}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="ss-sched-time">
                                                <Clock size={14} /> {prog.timeSlot}
                                            </div>

                                            <div className="ss-sched-footer">
                                                <div className="ss-dj-info">
                                                    <strong>{prog.dj}</strong>

                                                    <span className={`ss-badge ${
                                                            prog.status === 'Available' ? 'ss-badge-blue' : 'ss-badge-yellow' }`}>
                                                        {prog.status}
                                                    </span>
                                                </div>

                                                {prog.status === 'Unavailable' && (
                                                    <button className="ss-btn-outline" onClick={() => handleAssignSub(prog.id)}>
                                                        Assign Substitute DJ
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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
                                        {schedule.map((prog) => (
                                            <TableRow key={prog.id}>
                                                <TableCell>{prog.title}</TableCell>
                                                <TableCell>{prog.dj}</TableCell>
                                                <TableCell>{prog.timeSlot}</TableCell>

                                                <TableCell>
                                                    <span className={`ss-badge ${
                                                            prog.status === "Available" ? "ss-badge-blue" : "ss-badge-yellow" }`} >
                                                        {prog.status}
                                                    </span>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="ss-table-actions">
                                                        <button onClick={() => handleEdit(prog.id)}>
                                                            <Edit size={16} />
                                                        </button>

                                                        <button onClick={() => handleDelete(prog.id)}>
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