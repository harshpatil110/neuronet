"use client"

import * as React from "react"
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    TrendingUp,
    User,
    Video,
} from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ModeToggle } from "@/components/mode-toggle"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

// --- Mock Data ---

const upcomingAppointments = [
    {
        id: "1",
        name: "Augustine Watts",
        time: "08:00 AM",
        type: "Consultation",
        status: "confirmed",
        image: "/avatars/01.png",
        risk: "low",
    },
    {
        id: "2",
        name: "Clementine Baker",
        time: "09:00 AM",
        type: "First Visit",
        status: "confirmed",
        image: "/avatars/02.png",
        risk: "moderate",
    },
    {
        id: "3",
        name: "Jimmie Christian",
        time: "10:30 AM",
        type: "Emergency",
        status: "urgent",
        image: "/avatars/03.png",
        risk: "high",
    },
    {
        id: "4",
        name: "Greg McPherson",
        time: "11:30 AM",
        type: "Consultation",
        status: "confirmed",
        image: "/avatars/04.png",
        risk: "low",
    },
]

const urgentCases = [
    {
        id: "u1",
        name: "Sarah Jenkins",
        reason: "Severe Mood Drop",
        detectedAt: "2h ago",
        image: "/avatars/05.png",
    },
    {
        id: "u2",
        name: "Michael Ross",
        reason: "Crisis Keywords Detected",
        detectedAt: "4h ago",
        image: "/avatars/06.png",
    },
]

const chartData = [
    { day: "Mon", sessions: 4, rating: 4.5 },
    { day: "Tue", sessions: 6, rating: 4.8 },
    { day: "Wed", sessions: 5, rating: 4.6 },
    { day: "Thu", sessions: 8, rating: 4.9 },
    { day: "Fri", sessions: 7, rating: 4.7 },
    { day: "Sat", sessions: 3, rating: 5.0 },
    { day: "Sun", sessions: 2, rating: 5.0 },
]

const chartConfig = {
    sessions: {
        label: "Sessions",
        color: "hsl(var(--chart-1))",
    },
    rating: {
        label: "Rating",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function TherapistDashboardPage() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen bg-background text-foreground animate-in fade-in-50">



            {/* --- Top Header --- */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome, Dr. Grey</h1>
                    <p className="text-muted-foreground mt-1">
                        {currentDate}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/therapist/schedule">
                        <Button variant="outline" className="hidden md:flex">
                            <Calendar className="mr-2 h-4 w-4" /> Schedule
                        </Button>
                    </Link>
                    <Link href="/therapist/video-sessions">
                        <Button>
                            <Video className="mr-2 h-4 w-4" /> Start Session
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
                        <ModeToggle />
                        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src="/avatars/dr-grey.png" />
                            <AvatarFallback>DG</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* --- Stats Overview --- */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm border-none bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">129</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-none bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sessions (Wk)</CardTitle>
                        <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">35</div>
                        <p className="text-xs text-muted-foreground">+2 since last week</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-none bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8</div>
                        <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-none bg-primary text-primary-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary-foreground/90">Urgent Alerts</CardTitle>
                        <AlertCircle className="h-4 w-4 text-primary-foreground/90" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-primary-foreground/80">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-12 lg:grid-cols-12 h-full">

                {/* --- Left Column: Appointments (Queue) --- */}
                <div className="md:col-span-4 lg:col-span-4 space-y-6">
                    <Card className="h-full shadow-md border-none">
                        <CardHeader>
                            <CardTitle>Today's Appointments</CardTitle>
                            <CardDescription>You have 4 sessions remaining today</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {upcomingAppointments.map((appt) => (
                                <Link href={`/therapist/patients/${appt.id}`} key={appt.id} className="block">
                                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 border-2 border-background">
                                                <AvatarImage src={appt.image} alt={appt.name} />
                                                <AvatarFallback>{appt.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium leading-none">{appt.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{appt.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex items-center text-sm font-medium">
                                                <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {appt.time}
                                            </div>
                                            {appt.risk === 'high' && (
                                                <Badge variant="destructive" className="text-[10px] h-5 px-1.5">High Risk</Badge>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full text-muted-foreground text-sm">View Full Schedule</Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* --- Middle/Right Column: Analytics & Urgent --- */}
                <div className="md:col-span-8 lg:col-span-8 space-y-6">

                    {/* Urgent Cases Section */}
                    {urgentCases.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2">
                            {urgentCases.map((c) => (
                                <Card key={c.id} className="border-l-4 border-l-destructive shadow-sm bg-destructive/5">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-destructive flex items-center">
                                            <AlertCircle className="mr-2 h-4 w-4" />
                                            AI Alert: {c.reason}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={c.image} />
                                                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold">{c.name}</p>
                                                    <p className="text-xs text-muted-foreground">Detected {c.detectedAt}</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="destructive">Review</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Analytics Chart */}
                    <Card className="shadow-md border-none">
                        <CardHeader>
                            <CardTitle>Total Sessions</CardTitle>
                            <CardDescription>Weekly session overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* AI Insight / Pre-briefing */}
                    <Card className="bg-gradient-to-r from-primary/10 to-transparent border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                AI Insights for Next Session
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">
                                Augustine Watts (08:00 AM) has shown a 15% increase in positive sentiment over the last 3 days.
                                However, sleep patterns remain irregular. Consider discussing sleep hygiene.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" className="px-0 text-primary">View Full Report</Button>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    )
}
