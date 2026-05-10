import { useEffect, useRef, useState } from "react";
import { Calendar, Camera, Edit2, Bell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProfile() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
  
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };
  useEffect(() => {}, []);

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
                    <strong>DJ Apple</strong>
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
                          <Input defaultValue="DJ Makisig" />
                        </div>
                
                        <div className="profile-dialog-group">
                          <Label>Full Name</Label>
                          <Input defaultValue="Ruel Viñas" />
                        </div>
                
                        <div className="profile-dialog-group">
                          <Label>Username</Label>
                          <Input defaultValue="@djmakisig" />
                        </div>
                      </div>
                
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="full-name">Ne-A Bongalbal</p>
                <p className="handle">@djapple</p>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Programs */}
          <Card className="programs-container border shadow-none">
            <CardHeader className="blue-header p-0 space-y-0">
              <h3>Assigned Programs</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="program-row">
                  <div className="prog-details">
                    <h4 style={{ fontSize: "17px" }}>
                      <strong>Energy sa Hapon</strong>
                    </h4>
                    <div className="time-slot">
                      <Calendar size={15} />
                      <span>3:00 PM - 5:00 PM</span>
                    </div>
                  </div>
                <span className="status-badge">Confirmed</span>
              </div>
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
              <div className="notif-card light-grey">
                <p>You confirmed your attendance.</p>
                <span className="notif-time">
                  <strong>2:00 PM</strong>
                  <span className="unread-dot"></span>
                </span>
              </div>

              <div className="notif-card light-grey">
                <div className="user-icon-row">
                  <div className="circle-icon blue-bg"></div>
                  <p>DJ Makisig assigned you to host "Energy s...</p>
                </div>
                <span className="notif-time">Mar 13</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}