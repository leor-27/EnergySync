import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Program = {
    program_ID: number;
    program_name: string;
    program_type: string;
    description: string;
    created_at: string;
    added_by_admin_ID: number;
};

export default function SuperadminProgram() {
    const navigate = useNavigate();

    const [programs, setPrograms] = useState<any[]>([]);
    const [program_schedules, setProgramSchedules] = useState<any[]>([]);
    const [djs, setDjs] = useState<any[]>([]);
    const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
    const [schedule_day_types, setScheduleDayTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // const [programs, setPrograms] = useState<Program[]>([
    //     {
    //         id: "1",
    //         title: "GOOD MORNING ENERGY",
    //         status: "OFFLINE",
    //         timeSlot: "12:00 AM - 5:00 AM | WEEKDAYS, SAT",
    //         type: "MUSIC ONLY",
    //         dj: "",
    //         description: "An all-night musical journey for the late hours. This program provides a continuous stream of hits, creating a serene and dreamlike atmosphere as the city rests."
    //     },
    //     {
    //         id: "2",
    //         title: "HARAMBOGAN SA RADYO",
    //         status: "ON AIR",
    //         timeSlot: "7:00 AM - 9:00 AM | WEEKDAYS",
    //         type: "TALK SHOW",
    //         dj: "DJ MAKISIG",
    //         description: "A vibrant and entertaining morning program filled with humor, laughter, and lively conversation to ensure a fun and engaging start to your day with no dull moments."
    //     },
    //     {
    //         id: "3",
    //         title: "AFTERNOON DELIGHT",
    //         status: "OFFLINE",
    //         timeSlot: "1:00 PM - 4:00 PM | WEEKDAYS",
    //         type: "MUSIC ONLY",
    //         dj: "DJ SUNSHINE",
    //         description: "Keep your energy up during the afternoon slump with a mix of upbeat pop and classic hits."
    //     }
    // ]);

    // Search & Form States
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: ""
    });

    // Edit/Create Program Tracker
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const djsRes = await fetch("http://localhost:5000/api/djs");
        const djsJson = await djsRes.json();

        const programsRes = await fetch("http://localhost:5000/api/programs");
        const programsJson = await programsRes.json();

        const schedulesRes = await fetch("http://localhost:5000/api/program_schedules");
        const schedulesJson = await schedulesRes.json();

        const programDjAssignmentsRes = await fetch("http://localhost:5000/api/program_dj_assignments");
        const programDjAssignmentsJson = await programDjAssignmentsRes.json();

        const scheduleDayTypesRes = await fetch("http://localhost:5000/api/schedule_day_types");
        const scheduleDayTypesJson = await scheduleDayTypesRes.json();

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
      } catch(err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

    const programCards = programs.map((program: any) => {
    // Find schedules for this program
    const matchedSchedules = program_schedules.filter(
        (schedule: any) =>
            schedule.program_ID === program.program_ID
    );

    // Find day types
    const dayTypes = matchedSchedules.map((schedule: any) => {
        const matchedDayType = schedule_day_types.find(
            (day: any) =>
                day.schedule_day_type_ID === schedule.schedule_day_type_ID
        );

        return matchedDayType?.schedule_day_type || "";
    });

    // Find DJ assignment
    const matchedAssignment = program_dj_assignments.find(
        (assignment: any) =>
            assignment.program_ID === program.program_ID
    );

    // Find DJ
    const matchedDj = djs.find(
        (dj: any) =>
            dj.dj_ID === matchedAssignment?.dj_ID
    );

    return {
        ...program,

        start_time:
            matchedSchedules[0]?.start_time || "",

        end_time:
            matchedSchedules[0]?.end_time || "",

        day_types:
            dayTypes.join(", "),

        dj_name:
            matchedDj?.stage_name || "No DJ Assigned",
    };
});

    const handleEditClick = (program: Program) => {
        setFormData({
            title: program.program_name,
            type: program.program_type,
            description: program.description
        });
        setEditingId(program.program_ID);
    };

    const handleCancel = () => {
        setFormData({ title: "", type: "", description: "" });
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.type) return;

        try {
            if (editingId) {

                // UPDATE PROGRAM
                const response = await fetch(
                    `http://localhost:5000/api/programs/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            program_name: formData.title,
                            program_type: formData.type,
                            description: formData.description
                        })
                    }
                );

                const data = await response.json();

                if (data.success) {
                    alert("Program updated!");

                    setPrograms(
                        programs.map((p: any) =>
                            p.program_ID === editingId
                                ? {
                                    ...p,
                                    program_name: formData.title,
                                    program_type: formData.type,
                                    description: formData.description
                                }
                                : p
                        )
                    );
                }
            } else {
                // CREATE PROGRAM
                const response = await fetch(
                    "http://localhost:5000/api/programs",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            program_name: formData.title,
                            program_type: formData.type,
                            description: formData.description,
                            added_by_admin_ID: 1
                        })
                    }
                );

                const data = await response.json();

                if (data.success) {
                    alert("Program created!");

                    setPrograms([
                        ...programs,
                        data.data
                    ]);
                }
            }
            handleCancel();
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    const handleDelete = async (id: number) => {
    try {
        const response = await fetch(
            `http://localhost:5000/api/programs/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (data.success) {
            alert("Program deleted!");

            setPrograms(
                programs.filter(
                    (p: any) => p.program_ID !== id
                )
            );
        }

    } catch (err) {
        console.error("Delete Error:", err);
    }
};

    const filteredPrograms = programCards.filter((program: any) =>
    program.program_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

    program.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
);

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="sp-page-container">
            <h1 className="sp-page-title">Programs</h1>
                <div className="sp-grid">

                    {/* LEFT COLUMN: PROGRAM CREATION FORM */}
                    <div className="sp-form-col">
                        <Card className="sp-card sp-form-wrapper border-0 shadow-none">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle>
                                    <h2>{editingId ? "Edit Program" : "New Program"}</h2>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="sp-form-row">
                                    <div className="sp-input-group">
                                        <label>Program Title</label>
                                        <Input className="h-auto shadow-none" type="text" value={formData.title} onChange={(e) =>
                                                setFormData({...formData, title: e.target.value})} />
                                    </div>
                                    <div className="sp-input-group">
                                        <label>Program Type</label>
                                        <Select value={formData.type} onValueChange={(value) =>
                                                setFormData({...formData, type: value })}>
                                            <SelectTrigger className="sp-select-trigger">
                                                <SelectValue placeholder="Select program type" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Music Only">
                                                    Music Only
                                                </SelectItem>

                                                <SelectItem value="Talk Show">
                                                    Talk Show
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="sp-input-group">
                                    <label>Program Description</label>
                                    <Textarea className="shadow-none resize-none focus-visible:ring-0" value={formData.description} onChange={(e) =>
                                            setFormData({...formData, description: e.target.value})} />
                                </div>

                                <div className="sp-form-actions">
                                    <Button className="sp-btn-cancel focus-visible:ring-0" onClick={handleCancel}>Cancel</Button>
                                    <Button className="sp-btn-create border-0 shadow-none focus-visible:ring-0" onClick={handleSubmit}>
                                        {editingId ? "Update Program" : "Create Program"}
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: PROGRAM LIST */}
                    <div className="sp-list-col">
                        <Card className="sp-card sp-list-wrapper border-0 shadow-none">

                            {/* Search Bar */}
                            <div className="sp-search-row">
                                <div className="sp-search-input-wrapper">
                                    <Search className="sp-search-icon" size={16} />
                                    <Input className="h-auto shadow-none" type="text" placeholder="Search" value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="sp-filter-wrapper">
                                    <select className="sp-filter-dropdown">
                                        <option value="all">All Programs</option>
                                        <option value="on-air">On Air</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                    <ChevronDown className="sp-filter-icon" size={16} />
                                </div>
                            </div>

                            {/* Program List */}
                            <div className="sp-scrollable-list">
                                {filteredPrograms.length === 0 ? (
                                    <div className="sp-no-msg">No programs found.</div>
                                ) : (
                                    filteredPrograms.map((program: any) => (
                                        <Card key={program.program_ID} className="sp-item-card border-0 shadow-none">
                                            <CardContent className="p-0">
                                                <div className="sp-item-header">
                                                    <div className="sp-item-title-row">
                                                        <h3>{program.program_name}</h3>
                                                        <span className={`sp-status-badge ${program.status === 'ON AIR' ? 'sp-status-on-air' : 'sp-status-offline'}`}>
                                                            OFFLINE
                                                        </span>
                                                    </div>
                                                    <div className="sp-actions">
                                                        <Button className="sp-icon-btn sp-edit-btn focus-visible:ring-0" title="Edit" onClick={() => handleEditClick(program)}>
                                                            <Edit size={20} />
                                                        </Button>
                                                        <Button className="sp-icon-btn sp-delete-btn focus-visible:ring-0" title="Delete" onClick={() => handleDelete(program.program_ID)}>
                                                            <Trash2 size={20} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="sp-timeslot">{program.start_time} - {program.end_time} | {program.day_types}</p>
                                                <p className="sp-type-dj">  {program.program_type} | {program.dj_name}</p>
                                                <p className="sp-description">{program.description}</p>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}