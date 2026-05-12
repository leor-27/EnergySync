import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function AdminSchedule() {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const [viewMode, setViewMode] = useState("month");

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

    useEffect(() => {

    }, []);

    return (
        <>
        <div className="ss-page-container">
            <div className="ss-grid">

                {/* LEFT COLUMN */}
                <div className="ss-left-col">
                    <Card className="ss-calendar-widget">
                        <CardContent className="p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="ss-custom-calendar" />
                        </CardContent>
                    </Card>

                    <Card className="ss-availability-widget">
                        <CardHeader>
                            <h1>Program Schedule</h1>
                        </CardHeader>
                        <CardContent>
                            <div className="ss-avail-list">
                                {schedule.map(prog => (<Card key={prog.id} className="ss-avail-item bg-[#1C5186] text-white">
                                    <CardContent className="p-4">
                                        <div className="ss-avail-info">
                                            <h4>{prog.title}</h4>
                                            <p>🕒 {prog.timeSlot.split("|")[0]}</p>
                                        </div>
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
                                <span>SUN</span>
                                <span>MON</span>
                                <span>TUE</span>
                                <span>WED</span>
                                <span>THU</span>
                                                <span>FRI</span>
                                                <span>SAT</span>
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
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
            </div>
        </div>
        </>
    );
}