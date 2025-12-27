"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { redirect } from 'next/navigation'

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default function HomePage() {
  // Redirect to dashboard
  redirect('/dashboard')
}
