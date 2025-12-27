import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Star, Target } from "lucide-react"

export function StreakCard() {
    return (
        <Card className="col-span-1 md:col-span-1 lg:col-span-1 bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
                    Daily Streak
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold">12</span>
                    <span className="text-muted-foreground mb-1">days</span>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> 2,450 XP</span>
                        <span className="text-muted-foreground">Level 5</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-1"><Target className="h-4 w-4 text-primary" /> Today's Goal</span>
                            <span>80%</span>
                        </div>
                        <Progress value={80} className="h-2 bg-background/50" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 italic">"You're doing great! Keep it up!"</p>
                </div>
            </CardContent>
        </Card>
    )
}
