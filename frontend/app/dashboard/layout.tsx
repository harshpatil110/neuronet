"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RoleGuard } from "@/components/role-guard"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RoleGuard allowedRoles={["user"]}>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <main className="flex-1 overflow-auto bg-background transition-all duration-300 ease-in-out">
                    {children}
                </main>
            </SidebarProvider>
        </RoleGuard>
    )
}
