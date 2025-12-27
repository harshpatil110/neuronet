"use client"

import * as React from "react"
import {
    Activity,
    Calendar,
    FileText,
    MessageSquare,
    Phone,
    TrendingUp,
    User,
    AlertTriangle,
    ClipboardList
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    const patient = {
        name: "Augustine Watts",
        age: 28,
        diagnosis: "Generalized Anxiety Disorder",
        status: "Active",
        risk: "Low",
        image: "/avatars/01.png",
        nextSession: "Tomorrow, 2:00 PM"
    }

    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in-50">

            {/* Header Profile Card */}
            <Card className="border-none shadow-md bg-gradient-to-r from-background to-muted/20">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                                <AvatarImage src={patient.image} />
                                <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" /> {patient.age} yrs • {patient.diagnosis}
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">{patient.status}</Badge>
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">Risk: {patient.risk}</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" /> Treatment Plan
                            </Button>
                            <Button>
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="h-auto w-full justify-start overflow-x-auto p-1 bg-transparent border-b rounded-none gap-2">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm">Overview</TabsTrigger>
                    <TabsTrigger value="assessments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm">Assessment History</TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm">Session Notes</TabsTrigger>
                    <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm">Chat Summaries</TabsTrigger>
                    <TabsTrigger value="mood" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm">Mood Graphs</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Last PHQ-9 Score</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">-2 pts since last month</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold truncate">{patient.nextSession}</div>
                                <p className="text-xs text-muted-foreground">Video Consultation</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="col-span-1 shadow-sm border-l-4 border-l-orange-400">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                    Recent Flag
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Patient reported increased anxiety levels related to "workplace performance" in the last chat session (2 days ago).
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Quick Notes</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <p>• Responded well to CBT techniques regarding sleep hygiene.</p>
                                <p>• Needs follow-up on medication adherence.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Assessments Tab */}
                <TabsContent value="assessments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assessment Timeline</CardTitle>
                            <CardDescription>PHQ-9 and GAD-7 scores over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Placeholder for a Chart */}
                            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> Chart Visualization Placeholder
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Session Notes Tab */}
                <TabsContent value="notes" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Session Notes History</CardTitle>
                            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Note</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-sm">Session #{10 - i} - Cognitive Restructuring</h4>
                                        <span className="text-xs text-muted-foreground">Mar {20 - i}, 2024</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Patient discussed progress with exposure exercises. Reported lower anxiety in social situations (SUDS 40/100).
                                        Agreed to continue current homework plan.
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}

function Plus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
