"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { date: "Mon", mood: 6, sentiment: 7 },
    { date: "Tue", mood: 7, sentiment: 8 },
    { date: "Wed", mood: 5, sentiment: 6 },
    { date: "Thu", mood: 8, sentiment: 9 },
    { date: "Fri", mood: 9, sentiment: 8 },
    { date: "Sat", mood: 8, sentiment: 9 },
    { date: "Sun", mood: 9, sentiment: 9 },
]

const chartConfig = {
    mood: {
        label: "Mood Score",
        color: "var(--chart-1)",
    },
    sentiment: {
        label: "AI Sentiment",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function MoodChart() {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 shadow-md border-none">
            <CardHeader>
                <CardTitle>Weekly Mood Trend</CardTitle>
                <CardDescription>Your emotional wellness over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="mood"
                            type="natural"
                            stroke="var(--color-mood)"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            dataKey="sentiment"
                            type="natural"
                            stroke="var(--color-sentiment)"
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
