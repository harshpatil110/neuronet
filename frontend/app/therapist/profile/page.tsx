"use client"

import * as React from "react"
import { CheckCircle2, Globe, GraduationCap, Languages, Mail, MapPin, Pencil, Shield, Star, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 animate-in fade-in-50">

            {/* Header / Cover Area - could be added if design required, keeping simple for now */}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column: Identity & Status */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="text-center border-none shadow-md overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary/40" />
                        <div className="-mt-12 flex justify-center">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                <AvatarImage src="/avatars/dr-grey.png" />
                                <AvatarFallback>DG</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardHeader className="pt-4 pb-2">
                            <div className="flex items-center justify-center gap-2">
                                <CardTitle className="text-xl">Dr. Mary Grey</CardTitle>
                                <CheckCircle2 className="h-5 w-5 text-white bg-blue-500 rounded-full p-0.5" fill="currentColor" />
                            </div>
                            <CardDescription>Clinical Psychologist, PhD</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" /> New York, NY (Remote)
                            </div>
                            <div className="flex justify-center gap-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Verified</Badge>
                                <Badge variant="secondary">Top Rated</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <p className="text-2xl font-bold">4.9</p>
                                    <p className="text-xs text-muted-foreground">Rating</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">1k+</p>
                                    <p className="text-xs text-muted-foreground">Sessions</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Pencil className="mr-2 h-4 w-4" /> Edit Public Profile
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Verification Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">License</span>
                                <span className="font-medium">Valid</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Identity</span>
                                <span className="font-medium">Verified</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Insurance</span>
                                <span className="font-medium">Active</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Editable Details */}
                <div className="md:col-span-8 space-y-6">

                    {/* Professional Info */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Professional Information</CardTitle>
                            <CardDescription>Manage your specializations and expertise displayed to patients.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    Specializations
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {["Anxiety", "Depression", "CBT", "Trauma"].map(tag => (
                                        <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                                            {tag} &times;
                                        </Badge>
                                    ))}
                                    <Badge variant="outline" className="px-3 py-1 text-sm border-dashed text-muted-foreground cursor-pointer hover:bg-muted">
                                        + Add
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        Languages Spoken
                                    </label>
                                    <Input defaultValue="English, Spanish, French" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Wallet className="h-4 w-4 text-muted-foreground" />
                                        Hourly Rate ($)
                                    </label>
                                    <Input type="number" defaultValue="150" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bio / About Me</label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue="Dr. Mary Grey is a licensed clinical psychologist with over 10 years of experience specializing in cognitive behavioral therapy (CBT) for anxiety and depression to help patients lead healthier lives..."
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t pt-4">
                            <Button variant="ghost">Cancel</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    {/* Availability Settings (Mini) */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Quick Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium">Accepting New Patients</div>
                                    <div className="text-xs text-muted-foreground">Toggle this to appear in search results</div>
                                </div>
                                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
