"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const assessmentData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 70 },
    { month: "Apr", score: 85 },
    { month: "May", score: 82 },
    { month: "Jun", score: 90 },
]

const sentimentData = [
    { day: "M", positive: 40, neutral: 30, negative: 30 },
    { day: "T", positive: 50, neutral: 30, negative: 20 },
    { day: "W", positive: 45, neutral: 40, negative: 15 },
    { day: "Th", positive: 60, neutral: 20, negative: 20 },
    { day: "F", positive: 70, neutral: 20, negative: 10 },
    { day: "Sa", positive: 65, neutral: 25, negative: 10 },
    { day: "Su", positive: 80, neutral: 10, negative: 10 },
]

const assessmentConfig = {
    score: {
        label: "Wellness Score",
        color: "var(--chart-3)"
    }
} satisfies ChartConfig

const sentimentConfig = {
    positive: { label: "Positive", color: "var(--chart-4)" },
    neutral: { label: "Neutral", color: "var(--chart-5)" },
    negative: { label: "Negative", color: "var(--muted-foreground)" }
} satisfies ChartConfig

export function ProgressIndicators() {
    return (
        <>
            <Card className="col-span-1 md:col-span-1 lg:col-span-2 shadow-md border-none">
                <CardHeader>
                    <CardTitle>Assessment Trends</CardTitle>
                    <CardDescription>Monthly wellness improvement</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={assessmentConfig} className="h-[200px] w-full">
                        <BarChart data={assessmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-1 lg:col-span-2 shadow-md border-none">
                <CardHeader>
                    <CardTitle>Sentiment Breakdown</CardTitle>
                    <CardDescription>This week's emotional analysis</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={sentimentConfig} className="h-[200px] w-full">
                        <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" />
                            <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}
