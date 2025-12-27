"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MoodChart } from "@/components/dashboard/mood-chart"
import { StreakCard } from "@/components/dashboard/streak-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { UpcomingAppointments } from "@/components/dashboard/appointments"
import { ProgressIndicators } from "@/components/dashboard/progress-indicators"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, LogOut } from "lucide-react"

export default function DashboardPage() {
    const { user, logout, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase()
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good Morning"
        if (hour < 18) return "Good Afternoon"
        return "Good Evening"
    }

    return (
        <div className="flex flex-col h-full w-full bg-background p-6 space-y-6">
            {/* Header */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {getGreeting()}, {user.email.split('@')[0]}!
                        </h1>
                        <p className="text-muted-foreground">Here&apos;s your wellness overview.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-8 bg-card ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring" />
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <ModeToggle />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={logout}
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                    <Avatar>
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(user.email)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Dashboard Content */}
            {/* Grid: 4 columns on large screens. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Row 1: Mood Chart (Wide) */}
                <MoodChart />

                {/* Row 2: Streak (1), Quick (1), Appointments (2) */}
                <StreakCard />
                <QuickActions />
                <UpcomingAppointments />

                {/* Row 3: Progress Indicators (2 cards, each taking 2 cols in their original component but here they are placed in the grid directly?) 
              Wait, ProgressIndicators returns a Fragment with 2 Cards. Each Card has `lg:col-span-2`.
              So passing them here will fill Row 3 nicely (2 + 2 = 4).
          */}
                <ProgressIndicators />
            </div>
        </div>
    )
}
