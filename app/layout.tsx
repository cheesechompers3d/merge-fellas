import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export const metadata: Metadata = {
  title: 'Merge Fellas',
  description: "Experience Merge Fellas, an addictive merging game where you combine identical characters to create more powerful ones. With its unique merging mechanics and endless possibilities, Merge Fellas offers a perfect blend of strategy and fun!",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-900 text-white">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

import './globals.css'
