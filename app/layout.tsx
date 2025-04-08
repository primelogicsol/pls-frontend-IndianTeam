import type React from "react"
import "@/app/globals.css"
import { SiteHeader } from "@/components/site-header"
import { Providers } from "@/components/providers"
import type { Metadata } from "next"
import FooterCard from "@/components/footer-card"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Custom Admin Dashboard",
  description: "A custom admin dashboard for managing content",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <FooterCard />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'