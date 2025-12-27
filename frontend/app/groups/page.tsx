"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GroupsPage() {
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

  const groups = [
    {
      title: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety",
      members: 24,
      nextSession: "Tomorrow, 6:00 PM",
      tags: ["Anxiety", "Support"]
    },
    {
      title: "Mindfulness & Meditation",
      description: "Learn and practice mindfulness techniques together",
      members: 32,
      nextSession: "Wed, 7:00 PM",
      tags: ["Meditation", "Wellness"]
    },
    {
      title: "Student Stress Management",
      description: "For students dealing with academic pressure and stress",
      members: 18,
      nextSession: "Thu, 5:00 PM",
      tags: ["Students", "Stress"]
    }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Support Groups</h1>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Join a Community</h2>
                <p className="text-muted-foreground">
                  Connect with others who understand what you're going through. All groups are moderated 
                  and provide a safe, confidential environment.
                </p>
              </div>

              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">All groups are moderated by certified mental health professionals</span>
              </div>

              <div className="grid gap-4">
                {groups.map((group, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{group.title}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <Button>Join Group</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {group.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {group.nextSession}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {group.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
