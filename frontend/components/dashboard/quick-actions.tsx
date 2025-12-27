import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, FileText, Users, CalendarPlus } from "lucide-react"

export function QuickActions() {
    const actions = [
        { label: "Start AI Companion", icon: Bot, variant: "default" as const },
        { label: "Take Assessment", icon: FileText, variant: "outline" as const },
        { label: "Join Group", icon: Users, variant: "outline" as const },
        { label: "Book Therapist", icon: CalendarPlus, variant: "outline" as const },
    ]

    return (
        <Card className="col-span-1 md:col-span-1 lg:col-span-1 shadow-md border-none h-full">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <Button
                        key={action.label}
                        variant={action.variant}
                        className="h-24 flex flex-col gap-2 shadow-sm hover:shadow-md transition-all rounded-xl"
                    >
                        <action.icon className="h-6 w-6" />
                        {action.label}
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}
