"use client"

import {
    Calendar,
    LayoutDashboard,
    User,
    Users,
    Video,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/therapist/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Patients",
        url: "/therapist/patients",
        icon: Users,
    },
    {
        title: "Video Sessions",
        url: "/therapist/video-sessions",
        icon: Video,
    },
    {
        title: "Schedule",
        url: "/therapist/schedule",
        icon: Calendar,
    },
    {
        title: "Profile",
        url: "/therapist/profile",
        icon: User,
    },
]

export function TherapistSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row items-center justify-between py-4 px-4 h-16 group-data-[collapsible=icon]:justify-center">
                <h1 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">NeuraNet</h1>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Therapy Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
