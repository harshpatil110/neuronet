import { SidebarProvider } from "@/components/ui/sidebar"
import { TherapistSidebar } from "@/components/therapist-sidebar"

export default function TherapistLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <TherapistSidebar />
            <main className="flex-1 overflow-auto bg-background transition-all duration-300 ease-in-out">
                {children}
            </main>
        </SidebarProvider>
    )
}
