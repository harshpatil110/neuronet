"use client"

import * as React from "react"
import {
    Bell,
    Calendar,
    GraduationCap,
    Heart,
    MessageCircle,
    MoreHorizontal,
    Search,
    Star,
    ThumbsUp,
    Trophy,
    Zap,
} from "lucide-react"
import Link from "next/link"

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

import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"

// --- Mock Data ---

const stories = [
    { id: 1, title: "+50 XP", type: "achievement", color: "bg-yellow-500" },
    { id: 2, title: "New Badge", type: "badge", color: "bg-purple-500" },
    { id: 3, title: "Streak", type: "streak", color: "bg-orange-500" },
]

const recentConnections = [
    {
        id: "1",
        name: "Alex M.",
        image: "/avatars/01.png",
        lastMsg: "Thanks for listening yesterday!",
        time: "2h ago",
        mood: "Happy",
        unread: 2,
    },
    {
        id: "2",
        name: "Jordan T.",
        image: "/avatars/02.png",
        lastMsg: "Can we reschedule?",
        time: "5h ago",
        mood: "Neutral",
        unread: 0,
    },
    {
        id: "3",
        name: "Casey R.",
        image: "/avatars/03.png",
        lastMsg: "I tried that breathing exercise.",
        time: "1d ago",
        mood: "Calm",
        unread: 0,
    },
]

const pendingRequests = [
    {
        id: "r1",
        name: "Sam Wilson",
        image: "/avatars/04.png",
        interests: ["Gaming", "Anxiety"],
        match: 85,
    },
    {
        id: "r2",
        name: "Taylor J.",
        image: "/avatars/05.png",
        interests: ["Art", "Depression"],
        match: 92,
    },
]

const stats = [
    { label: "Sessions", value: "24", icon: Calendar, color: "text-blue-500" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
    { label: "XP Earned", value: "1.2k", icon: Trophy, color: "text-purple-500" },
]

export default function BuddyDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground animate-in fade-in-50">

            {/* --- Header --- */}
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer">
                        <AvatarImage src="/avatars/buddy-self.png" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium leading-none">Buddy Check-in</p>
                        <div className="flex items-center gap-1.5 pt-1">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search buddies..."
                            className="h-9 w-[200px] rounded-full border border-input bg-muted/50 px-8 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                    </Button>
                    <ModeToggle />
                </div>
            </header>

            <main className="flex-1 space-y-8 p-6 md:p-8 pt-6">

                {/* --- Stories / Highlights --- */}
                <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {stories.map((story) => (
                        <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className={`h-16 w-16 rounded-full p-[2px] ${story.color} bg-gradient-to-tr from-transparent to-white/50`}>
                                <div className="h-full w-full rounded-full border-2 border-background bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <Zap className="h-6 w-6 text-foreground/80" />
                                </div>
                            </div>
                            <span className="text-xs font-medium">{story.title}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:bg-muted/50 transition-colors">
                            <Zap className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <span className="text-xs text-muted-foreground">Add Context</span>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left Col: Main Feed (Connections & Chats) */}
                    <div className="md:col-span-8 space-y-8">

                        {/* Session Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, i) => (
                                <Card key={i} className="shadow-sm border-none bg-card/60 backdrop-blur-sm">
                                    <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                        <div className={`p-2 rounded-full bg-background shadow-sm ${stat.color}`}>
                                            <stat.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">{stat.value}</div>
                                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Active Connections (Instagram DM Style) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold tracking-tight">Recent Messages</h2>
                                <Link href="/buddy/chat" className="text-sm text-primary hover:underline">View All</Link>
                            </div>
                            <div className="grid gap-4">
                                {recentConnections.map((conn) => (
                                    <Card key={conn.id} className="group border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={conn.image} />
                                                    <AvatarFallback>{conn.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${conn.mood === 'Happy' ? 'bg-green-500' : conn.mood === 'Neutral' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold truncate">{conn.name}</p>
                                                    <span className="text-xs text-muted-foreground">{conn.time}</span>
                                                </div>
                                                <p className={`text-sm truncate ${conn.unread > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                                                    {conn.lastMsg}
                                                </p>
                                            </div>
                                            {conn.unread > 0 && (
                                                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">{conn.unread}</Badge>
                                            )}
                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MessageCircle className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Col: Requests & Extras */}
                    <div className="md:col-span-4 space-y-8">

                        {/* Match Queue */}
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" /> Buddy Requests
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {pendingRequests.map((req, i) => (
                                    <div key={req.id} className={`p-4 flex flex-col gap-3 hover:bg-muted/20 transition-colors ${i !== pendingRequests.length - 1 ? 'border-b' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={req.image} />
                                                <AvatarFallback>{req.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm">{req.name}</p>
                                                <p className="text-xs text-muted-foreground">{req.match}% Match Score</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {req.interests.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90">Accept</Button>
                                            <Button variant="outline" className="flex-1 h-8 text-xs">Decline</Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 text-center border-t bg-muted/10">
                                    <Link href="/buddy/requests" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                                        View all requests
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips / Training Teaser */}
                        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">Peer Support Tip</CardTitle>
                                <CardDescription className="text-indigo-100">Daily wisdom for better connections.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium">"Active listening involves reflecting back what you hear, not just waiting for your turn to speak."</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" size="sm" className="w-full text-indigo-700 hover:bg-white/90">
                                    <GraduationCap className="mr-2 h-4 w-4" /> Start Training
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </main>
        </div>
    )
}

function UserPlus(props: any) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="25" y2="8" />
            <line x1="22" y1="5" x2="22" y2="11" />
        </svg>
    )
}
