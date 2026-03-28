'use client';

import React from 'react';
import { Poppins } from "next/font/google";
import "./globals.css";
import MobileNav from '@/components/MobileNav';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        {/* Direct Link for Bootstrap Icons to ensure visibility */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
        />
      </head>
      <body className="min-h-full bg-slate-900 flex items-center justify-center p-0 m-0 overflow-hidden font-sans text-dark">
        
        {/* Force Mobile App Frame on Desktop */}
        <div className="w-full max-w-[450px] h-screen bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
          
          {/* Main Content Area */}
          <div className="flex-1 relative flex flex-col h-full bg-white overflow-hidden">
             {children}
          </div>

          {/* Global Mobile Bottom Navigation */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
