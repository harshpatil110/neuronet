"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function UpcomingAppointments() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    
    // Set date only on client-side to avoid hydration mismatch
    useEffect(() => {
        setDate(new Date())
    }, [])

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 shadow-md border-none flex flex-col h-full">
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage your sessions and events</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col xl:flex-row gap-6 items-center xl:items-start justify-center">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-3 pointer-events-none" // Making it static for now as it's just visual in this demo context or fully interactive? Let's keep it interactive.
                    />
                </div>

                <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between p-4 border rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div>
                            <p className="font-semibold">Dr. Sarah Cole</p>
                            <p className="text-sm text-muted-foreground">One-on-One Therapy</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <Badge variant="default" className="mb-1 bg-primary text-primary-foreground">Upcoming</Badge>
                            <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/30">
                        <div>
                            <p className="font-medium text-muted-foreground">Wellness Circle</p>
                            <p className="text-sm text-muted-foreground">Group Meditation</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <Badge variant="secondary" className="mb-1">Completed</Badge>
                            <p className="text-xs text-muted-foreground">Yesterday, 9:00 AM</p>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full">View Full Schedule</Button>
                </div>
            </CardContent>
        </Card>
    )
}
