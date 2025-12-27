"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getDashboardRoute, isValidRole } from "@/lib/role-redirect"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Heart, Users } from "lucide-react"

export default function OnboardingPage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login')
                return
            }

            // If user has a valid role, redirect them to their dashboard
            if (user && isValidRole(user.role)) {
                const redirectPath = getDashboardRoute(user.role)
                router.push(redirectPath)
            }
        }
    }, [isAuthenticated, isLoading, user, router])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome to NeuroNet!</CardTitle>
                    <CardDescription>
                        It looks like your account needs some setup. Please contact support or re-register with a valid role.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                            <UserCircle className="h-10 w-10 text-blue-500" />
                            <div>
                                <h3 className="font-semibold">User</h3>
                                <p className="text-sm text-muted-foreground">
                                    Access wellness tracking, AI companion, and therapy sessions
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                            <Heart className="h-10 w-10 text-pink-500" />
                            <div>
                                <h3 className="font-semibold">Therapist</h3>
                                <p className="text-sm text-muted-foreground">
                                    Manage patients, schedule sessions, and track progress
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                            <Users className="h-10 w-10 text-green-500" />
                            <div>
                                <h3 className="font-semibold">Peer Buddy</h3>
                                <p className="text-sm text-muted-foreground">
                                    Connect with others and provide peer support
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                                logout()
                                router.push('/register')
                            }}
                        >
                            Re-register
                        </Button>
                        <Button 
                            className="flex-1"
                            onClick={() => router.push('/login')}
                        >
                            Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
