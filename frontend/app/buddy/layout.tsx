import { SidebarProvider } from "@/components/ui/sidebar"
import { BuddySidebar } from "@/components/buddy-sidebar"

export default function BuddyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <BuddySidebar />
            <main className="flex-1 overflow-auto bg-background transition-all duration-300 ease-in-out">
                {children}
            </main>
        </SidebarProvider>
    )
}
