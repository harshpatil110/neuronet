"use client"

import {
  Bot,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Menu,
  User,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Companion",
    url: "/chat",
    icon: Bot,
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: ClipboardList,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
]

// Separate profile item for footer
const profileItem = {
  title: "Profile",
  url: "/profile",
  icon: User,
}

export function AppSidebar() {
  const { toggleSidebar, isMobile, state } = useSidebar()

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-row items-center justify-between py-4 px-4 h-16 group-data-[collapsible=icon]:justify-center">
          <h1 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">
            NeuraNet
          </h1>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={profileItem.title}>
                <a href={profileItem.url}>
                  <profileItem.icon />
                  <span>{profileItem.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Mobile Toggle Button - Visible only on mobile when sidebar is closed (Sheet logic handles open state) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="bg-background/80 backdrop-blur-sm border shadow-sm rounded-full"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
    </>
  )
}
