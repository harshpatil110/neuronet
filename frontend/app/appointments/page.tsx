"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AppointmentsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const upcomingAppointments = [
    {
      therapist: "Dr. Sarah Johnson",
      specialty: "Cognitive Behavioral Therapy",
      date: "Dec 28, 2025",
      time: "10:00 AM",
      type: "video",
      status: "confirmed"
    },
    {
      therapist: "Dr. Michael Chen",
      specialty: "Anxiety & Depression",
      date: "Jan 2, 2026",
      time: "2:00 PM",
      type: "video",
      status: "pending"
    }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Appointments</h1>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
                <p className="text-muted-foreground">
                  Manage your therapy sessions and appointments with mental health professionals.
                </p>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{appointment.therapist}</CardTitle>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </div>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              Video Call
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button size="sm">Join Session</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No Upcoming Appointments</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You don't have any scheduled appointments. Book a session with a therapist.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Book Your First Session
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
