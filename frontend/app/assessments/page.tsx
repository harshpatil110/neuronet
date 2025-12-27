"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Brain, Heart, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AssessmentsPage() {
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

  const assessments = [
    {
      title: "Mental Wellness Check",
      description: "A quick 5-minute assessment to understand your current mental state",
      icon: Brain,
      duration: "5 min",
      status: "available"
    },
    {
      title: "Anxiety & Stress Assessment",
      description: "Evaluate your anxiety and stress levels with our comprehensive questionnaire",
      icon: Activity,
      duration: "10 min",
      status: "available"
    },
    {
      title: "Emotional Well-being",
      description: "Track your emotional health and identify areas for improvement",
      icon: Heart,
      duration: "8 min",
      status: "coming_soon"
    }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Assessments</h1>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Self-Assessment Tools</h2>
                <p className="text-muted-foreground">
                  Take assessments to better understand your mental health and track your progress over time.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assessments.map((assessment, index) => (
                  <Card key={index} className={assessment.status === "coming_soon" ? "opacity-60" : ""}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <assessment.icon className="h-8 w-8 text-primary" />
                        <span className="text-xs text-muted-foreground">{assessment.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        disabled={assessment.status === "coming_soon"}
                        variant={assessment.status === "coming_soon" ? "secondary" : "default"}
                      >
                        {assessment.status === "coming_soon" ? "Coming Soon" : "Start Assessment"}
                      </Button>
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
