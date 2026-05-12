import { useEffect, useRef, useState } from "react";
import { Calendar, Camera, Edit2, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SuperadminProfile() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const [admins, setAdmins] = useState<any[]>([]);
    const [djs, setDjs] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [programs, setPrograms] = useState<any[]>([]);
    const [program_schedules, setProgramSchedules] = useState<any[]>([]);
    const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
      try {
        const adminsRes = await fetch("http://localhost:5000/api/admins");
        const adminsJson = await adminsRes.json();

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

        if (adminsJson.success) {
          setAdmins(adminsJson.data);
        }

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
    // Find matching program
    const matchedProgram = programs.find(
        (program: any) =>
        program.program_ID === schedule.program_ID
    );

    // Find assignment for this program
    const matchedAssignment = program_dj_assignments.find(
        (assignment: any) =>
        assignment.program_ID === schedule.program_ID
    );

    // Find DJ from assignment
    const matchedDj = djs.find(
        (dj: any) =>
        dj.dj_ID === matchedAssignment?.dj_ID
    );

    return {
        ...schedule,
        program_name:
        matchedProgram?.program_name || "Unknown Program",

        dj_name:
        matchedDj?.stage_name || "No DJ Assigned",
    };
    }); // change to the query

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="profile-container-grid">
                <div className="profile-info-column">
                    <Card className="white-card user-identity-card border shadow-none">
                        <CardContent className="profile-card-content p-0">
                            <div className="profile-avatar-circle" onClick={() => fileInputRef.current?.click()}>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="profile-avatar-image"/>
                                ) : (
                                    <Camera size={35} color="white" />
                                )}

                                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
                            </div>
                            <div className="user-text-info">
                                <div className="name-row">
                                    <h2 style={{ fontSize: '23px' }}>
                                        <strong>{djs[0]?.stage_name || "DJ"}</strong>
                                    </h2>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Edit2 size={22} className="edit-pencil" />
                                        </DialogTrigger>

                                        <DialogContent className="sm:max-w-[500px] bg-white text-black border shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle>Edit Profile</DialogTitle>
                                            </DialogHeader>

                                            <div className="profile-dialog-form">
                                                <div className="profile-dialog-group">
                                                    <Label>Stage Name</Label>
                                                    <Input defaultValue={djs[0]?.stage_name || ""} />
                                                </div>

                                                <div className="profile-dialog-group">
                                                    <Label>Full Name</Label>
                                                    <Input defaultValue={`${admins[0]?.first_name || ""} ${admins[0]?.last_name || ""}`} />
                                                </div>

                                                <div className="profile-dialog-group">
                                                    <Label>Username</Label>
                                                    <Input defaultValue={`@${admins[0]?.username || ""}`} />
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button>Save Changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <p className="full-name">{admins[0]?.first_name} {admins[0]?.last_name}</p>
                                <p className="handle">@{admins[0]?.username}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="programs-section border shadow-none">
                        <CardHeader className="blue-section-bar p-0">
                            <CardTitle className="text-inherit font-inherit">
                                <h3>Assigned Programs</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {programCards.map((program: any) => (
                            <div className="program-item-box" key={program.schedule_ID}>
                                <div className="program-details">
                                    <h4 style={{ fontSize: '17px' }}>
                                        <strong>{program.program_name}</strong>
                                    </h4>
                                    <div className="time-slot">
                                        <Calendar size={15} />
                                        <span style={{ fontSize: '14px' }}>
                                            {program.start_time} - {program.end_time}
                                        </span>
                                    </div>
                                </div>
                                <span className="status-badge">Confirmed</span>
                            </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className="notifications-sidebar-panel border shadow-none">
                    <CardHeader className="notif-title-area p-0">
                        <Bell size={22} />
                        <CardTitle className="text-inherit font-inherit">
                            <h3>Notifications</h3>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        {notifications.map((notif) => (
                        <div className="notif-row" key={notif.notification_ID}>
                            <span className="status-dot red-dot"></span>
                            <p>{notif.message}</p>
                            <div className="notif-time">
                                <strong>{new Date(
                      notif.notified_at
                    ).toLocaleString()}</strong>
                                <span className="active-indicator"></span>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}