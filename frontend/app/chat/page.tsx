"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement AI chat functionality
      setMessage("")
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <Bot className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">AI Companion</h1>
            </div>
          </header>
          
          <main className="flex-1 flex flex-col p-6">
            <div className="flex-1 max-w-3xl mx-auto w-full space-y-4">
              {/* Welcome message */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Hi {user?.email?.split('@')[0] || 'there'}! 👋</p>
                      <p className="text-muted-foreground">
                        I'm your AI wellness companion. I'm here to listen, support, and help you 
                        navigate through whatever you're experiencing. Feel free to share what's on 
                        your mind - our conversation is completely confidential.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Remember: I'm here to support you, but I'm not a replacement for professional 
                        mental health care. If you're in crisis, please reach out to a mental health 
                        professional or crisis helpline.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chat area placeholder */}
              <div className="flex-1 min-h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Start a conversation with your AI companion</p>
              </div>
            </div>

            {/* Input area */}
            <div className="max-w-3xl mx-auto w-full mt-4">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI-powered support is coming soon. Stay tuned!
              </p>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
