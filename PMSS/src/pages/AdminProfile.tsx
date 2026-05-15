import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import { Calendar, Camera, Edit2, Bell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/useAuth"

export default function AdminProfile() {
    const location = useLocation();
    const passedNotif = location.state?.selectedNotif;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { user } = useAuth();
    

  // const [admins, setAdmins] = useState<any[]>([]);
  const [djs, setDjs] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [program_schedules, setProgramSchedules] = useState<any[]>([]);
  const [program_dj_assignments, setProgramDjAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDj = djs.find(
    (dj) =>
      Number(dj.admin_ID) ===
      Number(user?.admin_ID)
  );

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

        // if (adminsJson.success) {
        //   setAdmins(adminsJson.data);
        // }

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

  // const currentAdmin = admins.find(
  //   (admin) => Number(admin.admin_ID) === Number(user?.admin_ID)
  // );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
  
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

  const programCards = program_schedules
  .map((schedule: any) => {

    const matchedProgram = programs.find(
      (p) => p.program_ID === schedule.program_ID
    );

    const matchedAssignment =
      program_dj_assignments.find(
        (a) => a.schedule_ID === schedule.schedule_ID
      );

    const matchedDj = djs.find(
      (d) => d.dj_ID === matchedAssignment?.dj_ID
    );

    return {
      ...schedule,

      program_name:
        matchedProgram?.program_name ||
        "Unknown Program",

      dj_ID: matchedDj?.dj_ID,

      dj_name:
        matchedDj?.stage_name ||
        "No DJ Assigned",
    };
  })

  .filter(
  (program: any) =>
    Number(program.dj_ID) === Number(user?.dj_ID)
);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="profile-grid">
        <div className="left-column">
          {/* Admin Info Card */}
          <Card className="info-card border shadow-none">
            <CardContent className="profile-card-content p-0">
              <div className="avatar-circle red-bg" onClick={() => fileInputRef.current?.click()}>
                  {profileImage ? (<img src={profileImage} alt="Profile" className="profile-avatar-image"/>
                    ) : (<Camera size={35} color="white" />)}
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
              </div>
              <div className="admin-info-text">
                <div className="name-header">
                  <h2 style={{ fontSize: "23px" }}>
                    <strong>{user?.stage_name || "DJ"}</strong>
                  </h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Edit2 size={22} className="edit-btn" />
                    </DialogTrigger>
                
                    <DialogContent className="sm:max-w-[500px] bg-white text-black border shadow-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                
                      <div className="profile-dialog-form">
                        <div className="profile-dialog-group">
                          <Label>Stage Name</Label>
                          <Input defaultValue={user?.stage_name || ""} />
                        </div>
                
                        <div className="profile-dialog-group">
                          <Label>Full Name</Label>
                          <Input defaultValue={`${user?.first_name || ""} ${user?.last_name || ""}`} />
                        </div>
                
                        <div className="profile-dialog-group">
                          <Label>Username</Label>
                          <Input defaultValue={`@${user?.username || ""}`} />
                        </div>
                      </div>
                
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="full-name">{user?.first_name} {user?.last_name}</p>
                <p className="handle">@{user?.username}</p>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Programs */}
          <Card className="programs-container border shadow-none">
            <CardHeader className="blue-header p-0 space-y-0">
              <h3>Assigned Programs</h3>
            </CardHeader>
            <CardContent className="p-0">
              {programCards.map((program: any) => (
              <div className="program-row" key={program.schedule_ID}>
                  <div className="prog-details">
                    <h4 style={{ fontSize: "17px" }}>
                      <strong>{program.program_name}</strong>
                    </h4>
                    <div className="time-slot">
                      <Calendar size={15} />
                      <span>{program.start_time} - {program.end_time}</span>
                    </div>
                  </div>
                <span className="status-badge">Confirmed</span>
              </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="notif-panel border shadow-none">
          <CardHeader className="notif-header p-0">
            <Bell size={22} />
            <h3>Notifications</h3>
          </CardHeader>

          <CardContent className="p-0">
            <div className="notif-list">
              {passedNotif && (
                            <div className="notif-card detailed highlighted">
                                <div className="notif-user-row">
                                    <div className="circle-icon blue-bg"></div>
                                    <span className="notif-author">Sender Name</span>
                                </div>
                                <div className="notif-body">
                                    <p>{passedNotif.message}</p>
                                    <span className="notif-author-line">
                                        Posted on {new Date(passedNotif.notified_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}
              {notifications.map((notif) => (
              <div className="notif-card light-grey" key={notif.notification_ID}>
                <p>{notif.message}</p>
                <span className="notif-time">
                                    {new Date(notif.notified_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    <span className="unread-dot"></span>
                                </span>
              </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}