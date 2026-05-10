import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Program = {
    id: string;
    title: string;
    status: "ON AIR" | "OFFLINE";
    timeSlot: string;
    type: string;
    dj: string;
    description: string;
};

export default function SuperadminProgram() {
    const navigate = useNavigate();

    const [programs, setPrograms] = useState<Program[]>([
        {
            id: "1",
            title: "GOOD MORNING ENERGY",
            status: "OFFLINE",
            timeSlot: "12:00 AM - 5:00 AM | WEEKDAYS, SAT",
            type: "MUSIC ONLY",
            dj: "",
            description: "An all-night musical journey for the late hours. This program provides a continuous stream of hits, creating a serene and dreamlike atmosphere as the city rests."
        },
        {
            id: "2",
            title: "HARAMBOGAN SA RADYO",
            status: "ON AIR",
            timeSlot: "7:00 AM - 9:00 AM | WEEKDAYS",
            type: "TALK SHOW",
            dj: "DJ MAKISIG",
            description: "A vibrant and entertaining morning program filled with humor, laughter, and lively conversation to ensure a fun and engaging start to your day with no dull moments."
        },
        {
            id: "3",
            title: "AFTERNOON DELIGHT",
            status: "OFFLINE",
            timeSlot: "1:00 PM - 4:00 PM | WEEKDAYS",
            type: "MUSIC ONLY",
            dj: "DJ SUNSHINE",
            description: "Keep your energy up during the afternoon slump with a mix of upbeat pop and classic hits."
        }
    ]);

    // Search & Form States
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: ""
    });

    // Edit/Create Program Tracker
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        // BACKEND TODO: Fetch initial programs from database (GET request)
    }, []);

    const handleEditClick = (program: Program) => {
        setFormData({
            title: program.title,
            type: program.type,
            description: program.description
        });
        setEditingId(program.id);
    };

    const handleCancel = () => {
        setFormData({ title: "", type: "", description: "" });
        setEditingId(null);
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.type) return;

        if (editingId) {
            // BACKEND TODO: Send a PUT or PATCH request to update the DB
            alert("Ready to UPDATE database for ID: " + editingId);

            setPrograms(programs.map(p => 
                p.id === editingId ? { ...p, ...formData } : p
            ));
        } else {
            // BACKEND TODO: Send a POST request to add a new program to the DB
            alert("Ready to CREATE new program in database: " + formData.title);

            const newProg: Program = {
                id: Date.now().toString(), // Fake unique ID
                status: "OFFLINE", 
                timeSlot: "TBD", 
                dj: "",
                ...formData
            };
            setPrograms([...programs, newProg]);
        }

        handleCancel();
    };

    const handleDelete = (id: string) => {
        // BACKEND TODO: Send a DELETE request for this ID
        setPrograms(programs.filter(p => p.id !== id));
    };

    const filteredPrograms = programs.filter(program => 
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    filteredPrograms.map((program) => (
                                        <Card key={program.id} className="sp-item-card border-0 shadow-none">
                                            <CardContent className="p-0">
                                                <div className="sp-item-header">
                                                    <div className="sp-item-title-row">
                                                        <h3>{program.title}</h3>
                                                        <span className={`sp-status-badge ${program.status === 'ON AIR' ? 'sp-status-on-air' : 'sp-status-offline'}`}>
                                                            {program.status}
                                                        </span>
                                                    </div>
                                                    <div className="sp-actions">
                                                        <Button className="sp-icon-btn sp-edit-btn focus-visible:ring-0" title="Edit" onClick={() => handleEditClick(program)}>
                                                            <Edit size={20} />
                                                        </Button>
                                                        <Button className="sp-icon-btn sp-delete-btn focus-visible:ring-0" title="Delete" onClick={() => handleDelete(program.id)}>
                                                            <Trash2 size={20} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="sp-timeslot">{program.timeSlot}</p>
                                                <p className="sp-type-dj">{program.type} {program.dj && `• ${program.dj}`}</p>
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