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

    useEffect(() => {}, []);

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
                                        <strong>DJ Makisig</strong>
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
                                <p className="full-name">Ruel Viñas</p>
                                <p className="handle">@djmakisig</p>
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
                            <div className="program-item-box">
                                <div className="program-details">
                                    <h4 style={{ fontSize: '17px' }}>
                                        <strong>Harambogan sa Radyo</strong>
                                    </h4>
                                    <div className="time-slot">
                                        <Calendar size={15} />
                                        <span style={{ fontSize: '14px' }}>
                                            7:00 AM - 9:00 AM
                                        </span>
                                    </div>
                                </div>
                                <span className="status-badge">Confirmed</span>
                            </div>
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
                        <div className="notif-row">
                            <span className="status-dot red-dot"></span>
                            <p>DJ Apple confirmed her attendance to ho...</p>
                            <div className="notif-time">
                                <strong>2:00 PM</strong>
                                <span className="active-indicator"></span>
                            </div>
                        </div>
                        <div className="notif-row">
                            <span className="status-dot pink-dot"></span>
                            <p>DJ Barbie is not available to host "Energy sa...</p>
                            <div className="notif-time">Mar 13</div>
                        </div>
                        <div className="notif-row">
                            <span className="status-dot green-dot"></span>
                            <p>Papa Gats confirmed his attendance</p>
                            <div className="notif-time">Mar 13</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}