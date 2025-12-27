"use client"

import * as React from "react"
import { MoreHorizontal, ArrowUpDown, Filter, Search, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const patients = [
    {
        id: "1",
        name: "Augustine Watts",
        email: "augustine@example.com",
        status: "Active",
        risk: "Low",
        lastSession: "2024-03-25",
        nextSession: "Today, 08:00 AM",
        image: "/avatars/01.png",
    },
    {
        id: "2",
        name: "Clementine Baker",
        email: "clementine@example.com",
        status: "Active",
        risk: "Moderate",
        lastSession: "2024-03-20",
        nextSession: "Today, 09:00 AM",
        image: "/avatars/02.png",
    },
    {
        id: "3",
        name: "Jimmie Christian",
        email: "jimmie@example.com",
        status: "Inactive",
        risk: "High",
        lastSession: "2024-03-10",
        nextSession: "Pending",
        image: "/avatars/03.png",
    },
    {
        id: "4",
        name: "Greg McPherson",
        email: "greg@example.com",
        status: "Active",
        risk: "Low",
        lastSession: "2024-03-22",
        nextSession: "Tomorrow, 11:30 AM",
        image: "/avatars/04.png",
    },
    {
        id: "5",
        name: "Sarah Jenkins",
        email: "sarah@example.com",
        status: "Active",
        risk: "High",
        lastSession: "2024-03-26",
        nextSession: "Mar 29, 02:00 PM",
        image: "/avatars/05.png",
    },
    {
        id: "6",
        name: "Michael Ross",
        email: "michael@example.com",
        status: "On Hold",
        risk: "Moderate",
        lastSession: "2024-03-15",
        nextSession: "Unscheduled",
        image: "/avatars/06.png",
    }
]

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [riskFilter, setRiskFilter] = React.useState<string | null>(null)

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRisk = riskFilter ? patient.risk === riskFilter : true
        return matchesSearch && matchesRisk
    })

    return (
        <div className="flex flex-col h-full p-6 animate-in fade-in-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Patients</h1>
                    <p className="text-muted-foreground">Manage your patient records and monitor risk levels.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>All Patients</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search patients..."
                                    className="pl-8 w-[250px] h-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9 gap-1">
                                        <Filter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            {riskFilter ? `Risk: ${riskFilter}` : "Filter"}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by Risk</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setRiskFilter(null)}>All</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setRiskFilter("High")}>High Risk</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setRiskFilter("Moderate")}>Moderate Risk</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setRiskFilter("Low")}>Low Risk</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[300px]">Patient</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Risk Level</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Last Session</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Next Session</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={patient.image} />
                                                        <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{patient.name}</span>
                                                        <span className="text-xs text-muted-foreground">{patient.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'} className={patient.status === 'Active' ? 'bg-primary/90 hover:bg-primary' : 'bg-muted text-muted-foreground'}>
                                                    {patient.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant="outline" className={`
                                                ${patient.risk === 'High' ? 'text-destructive border-destructive/50 bg-destructive/10' : ''}
                                                ${patient.risk === 'Moderate' ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' : ''}
                                                ${patient.risk === 'Low' ? 'text-green-500 border-green-500/50 bg-green-500/10' : ''}
                                            `}>
                                                    {patient.risk}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {patient.lastSession}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center">
                                                    {patient.nextSession}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <Link href={`/therapist/patients/${patient.id}`}>
                                                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem>View Notes</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-sm text-muted-foreground flex-1">
                            Showing {filteredPatients.length} of {patients.length} patients
                        </div>
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
