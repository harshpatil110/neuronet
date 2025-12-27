"use client"

import * as React from "react"
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    MessageSquare,
    FileText,
    MonitorUp,
    MoreVertical,
    User,
    Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function VideoSessionPage() {
    const [isMuted, setIsMuted] = React.useState(false)
    const [isVideoOff, setIsVideoOff] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState<"notes" | "ai" | "chat">("notes")
    const [duration, setDuration] = React.useState("00:00")

    // Simulate timer
    React.useEffect(() => {
        let seconds = 0
        const interval = setInterval(() => {
            seconds++
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
            const secs = (seconds % 60).toString().padStart(2, '0')
            setDuration(`${mins}:${secs}`)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex h-[calc(100vh-2rem)] flex-col gap-4 p-4 lg:flex-row bg-background text-foreground animate-in fade-in-50">

            {/* Main Video Area */}
            <div className="flex flex-1 flex-col gap-4">
                <div className="relative flex-1 overflow-hidden rounded-xl bg-black/90 shadow-2xl border border-border/20">
                    {/* Patient Video Feed (Mock) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/20">
                                <AvatarImage src="/avatars/01.png" className="object-cover" />
                                <AvatarFallback className="text-4xl">AW</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-semibold text-white/90">Augustine Watts</h2>
                            <p className="text-white/60">Connecting...</p>
                        </div>
                    </div>

                    {/* Top Info Bar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 border border-white/10">
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Augustine Watts</span>
                            <Separator orientation="vertical" className="h-4 bg-white/20 mx-1" />
                            <Badge variant="outline" className="text-xs border-green-500/50 text-green-400 bg-green-500/10">Online</Badge>
                        </div>
                        <div className="flex items-center gap-2 bg-red-500/90 backdrop-blur-md px-3 py-1.5 rounded-full text-white shadow-lg shadow-red-500/20">
                            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            <span className="text-sm font-mono font-medium">{duration}</span>
                        </div>
                    </div>

                    {/* Self View (PIP) */}
                    <div className="absolute bottom-4 right-4 h-32 w-48 rounded-lg bg-gray-800 border-2 border-white/10 shadow-xl overflow-hidden">
                        <div className="flex items-center justify-center h-full text-white/50 bg-gray-900">
                            {isVideoOff ? <VideoOff className="h-8 w-8" /> : (
                                <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                    <span className="text-xs text-white/70">You</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-center gap-4 rounded-xl bg-card p-4 shadow-sm border border-border">
                    <Button
                        variant={isMuted ? "destructive" : "secondary"}
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Button
                        variant={isVideoOff ? "destructive" : "secondary"}
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                    <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                        <MonitorUp className="h-5 w-5" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-12 w-16 rounded-full px-8">
                        <PhoneOff className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Right Sidebar (Notes & AI) */}
            <div className="flex w-full flex-col gap-4 lg:w-96">
                <Card className="flex h-full flex-col border-none shadow-md">
                    <CardHeader className="border-b pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Session Tools</CardTitle>
                            {/* Tab Switcher - Simple Implementation */}
                            <div className="flex bg-muted rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('notes')}
                                    className={`p-1.5 rounded-md transition-all ${activeTab === 'notes' ? 'bg-background shadow-sm' : 'hover:text-primary'}`}
                                >
                                    <FileText className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setActiveTab('ai')}
                                    className={`p-1.5 rounded-md transition-all ${activeTab === 'ai' ? 'bg-background shadow-sm' : 'hover:text-primary'}`}
                                >
                                    <div className="relative">
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 flex flex-col min-h-0">
                        {activeTab === 'notes' && (
                            <div className="flex flex-col h-full p-4 gap-2">
                                <label className="text-sm font-medium text-muted-foreground">Private Session Notes</label>
                                <textarea
                                    className="flex-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    placeholder="Type observations, key themes, and action items here..."
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-muted-foreground">Auto-saved 2m ago</span>
                                    <Button size="sm">Save Note</Button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'ai' && (
                            <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto">
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className="text-primary border-primary/30">Live Insight</Badge>
                                        <span className="text-xs text-muted-foreground">Just now</span>
                                    </div>
                                    <p className="text-sm text-foreground/80">Patient mentioned "sleep" 3 times in the last 2 minutes. Correlation with reported anxiety spike?</p>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary">Suggestion</Badge>
                                    </div>
                                    <p className="text-sm text-foreground/80">Consider asking about their medication adherence based on the last session's notes.</p>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Topic Tracker</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">Anxiety (45%)</Badge>
                                        <Badge variant="outline">Work (30%)</Badge>
                                        <Badge variant="outline">Sleep (25%)</Badge>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
