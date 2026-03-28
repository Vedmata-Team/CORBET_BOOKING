import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WildEarth Pro – Safari Booking System',
  description: 'Application interface for WildEarth Pro Safari Booking Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
