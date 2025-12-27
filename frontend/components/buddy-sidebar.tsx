"use client"

import {
    Calendar,
    GraduationCap,
    LayoutDashboard,
    MessageCircle,
    User,
    UserPlus,
    Users,
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
        url: "/buddy/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Connections",
        url: "/buddy/connections",
        icon: Users,
    },
    {
        title: "Requests",
        url: "/buddy/requests",
        icon: UserPlus,
    },
    {
        title: "Sessions",
        url: "/buddy/sessions",
        icon: Calendar,
    },
    {
        title: "Chat",
        url: "/buddy/chat",
        icon: MessageCircle,
    },
    {
        title: "Training",
        url: "/buddy/training",
        icon: GraduationCap,
    },
    {
        title: "Profile",
        url: "/buddy/profile",
        icon: User,
    },
]

export function BuddySidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row items-center justify-between py-4 px-4 h-16 group-data-[collapsible=icon]:justify-center">
                <h1 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">NeuraNet Buddy</h1>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Social Workspace</SidebarGroupLabel>
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
