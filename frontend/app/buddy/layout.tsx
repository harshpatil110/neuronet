"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { BuddySidebar } from "@/components/buddy-sidebar"
import { RoleGuard } from "@/components/role-guard"

export default function BuddyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RoleGuard allowedRoles={["buddy"]}>
            <SidebarProvider defaultOpen={true}>
                <BuddySidebar />
                <main className="flex-1 overflow-auto bg-background transition-all duration-300 ease-in-out">
                    {children}
                </main>
            </SidebarProvider>
        </RoleGuard>
    )
}
