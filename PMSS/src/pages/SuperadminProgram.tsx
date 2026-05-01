// import { useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Home, User, Tv, Calendar, LogOut } from "lucide-react"; 

// export default function SuperadminProgram() {
//     const navigate = useNavigate();

//     useEffect(() => {

//     }, []);

//     return (
//         <div className="superadmin-layout">
//             <header className="main-header">
//                 <div className="header-content">
//                     <section className="header-image">
//                         <Link to="/superadmin-home">
//                             <img src="/logo.png" className="logo" alt="Energy FM 106.3 Naga Logo" />
//                         </Link>
//                     </section>
//                     <div className="title"> 
//                         <h1>EnergySync</h1>
//                     </div>
//                 </div>
//             </header>

//             <div className="app-body">
//                 <nav className="sidebar">
//                     <ul className="nav-links">
//                         <li>
//                             <NavLink to="/superadmin-home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Home size={20} />
//                                 <span>Home</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <User size={20} />
//                                 <span>Profile</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-program" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Tv size={20} />
//                                 <span>Program</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/superadmin-schedule" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
//                                 <Calendar size={20} />
//                                 <span>Schedule</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <button className="nav-item logout" onClick={() => {
//                                 localStorage.removeItem("auth")
//                                 navigate("/")
//                             }}>
//                                 <LogOut size={20} />
//                                 <span>Logout</span>
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* <main className="main-content">
//                     <div className="welcome-section">
//                          <h1 className="welcome-text">Welcome, DJ Makisig!</h1>
//                     </div>
//                 </main> */}
//             </div>

//             <footer>
//                 Privacy Policy | Energy FM © 2026
//             </footer>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Tv, Calendar, LogOut, Search, Edit, Trash2, ChevronDown } from "lucide-react"; 


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

    // Program List State (SAMPLE)
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

    return (
        <div className="sp-page-container">
            <h1 className="sp-page-title">Programs</h1>

            <div className="sp-grid">
                
                {/* LEFT COLUMN: PROGRAM CREATION FORM */}
                <div className="sp-form-col">
                    <div className="sp-card sp-form-wrapper">
                        <h2>{editingId ? "Edit Program" : "New Program"}</h2>
                        
                        <div className="sp-form-row">
                            <div className="sp-input-group">
                                <label>Program Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="sp-input-group">
                                <label>Program Type</label>
                                <select 
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}>
                                    <option value=""></option>
                                    <option value="Music Only">Music Only</option>
                                    <option value="Talk Show">Talk Show</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="sp-input-group">
                            <label>Program Description</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>

                        <div className="sp-form-actions">
                            <button className="sp-btn-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="sp-btn-create" onClick={handleSubmit}>
                                {editingId ? "Update Program" : "Create Program"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: PROGRAM LIST */}
                <div className="sp-list-col">
                    <div className="sp-card sp-list-wrapper">
                        
                        {/* Search Bar */}
                        <div className="sp-search-row">
                            <div className="sp-search-input-wrapper">
                                <Search className="sp-search-icon" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    value={searchTerm}
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
                                    <div key={program.id} className="sp-item-card">
                                        <div className="sp-item-header">
                                            <div className="sp-item-title-row">
                                                <h3>{program.title}</h3>
                                                <span className={`sp-status-badge ${program.status === 'ON AIR' ? 'sp-status-on-air' : 'sp-status-offline'}`}>
                                                    {program.status}
                                                </span>
                                            </div>
                                            <div className="sp-actions">
                                                <button 
                                                    className="sp-icon-btn sp-edit-btn" 
                                                    title="Edit"
                                                    onClick={() => handleEditClick(program)}
                                                >
                                                    <button 
                                                        className="sp-icon-btn sp-edit-btn" 
                                                        title="Edit"
                                                        onClick={() => handleEditClick(program)}
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                </button>
                                                <button 
                                                    className="sp-icon-btn sp-delete-btn" 
                                                    title="Delete" 
                                                    onClick={() => handleDelete(program.id)}
                                                >
                                                    <button 
                                                        className="sp-icon-btn sp-delete-btn" 
                                                        title="Delete" 
                                                        onClick={() => handleDelete(program.id)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="sp-timeslot">{program.timeSlot}</p>
                                        <p className="sp-type-dj">{program.type} {program.dj && `• ${program.dj}`}</p>
                                        <p className="sp-description">{program.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
