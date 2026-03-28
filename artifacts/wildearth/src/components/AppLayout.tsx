'use client'

import Sidebar from './Sidebar'
import DemoBanner from './DemoBanner'
import { Bell, Search, ChevronDown } from 'lucide-react'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f0f4f0]">
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DemoBanner />
      </div>

      {/* Main Layout */}
      <div className="flex pt-[30px]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
          {/* Top Bar */}
          <header className="sticky top-[30px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
            <div>
              <h1 className="text-lg font-bold text-[#081C15] font-poppins leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 w-52">
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none text-gray-600 w-full placeholder:text-gray-400"
                />
              </div>
              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full border border-white" />
              </button>
              {/* User Avatar */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white text-xs font-bold">
                  RK
                </div>
                <div className="hidden md:block">
                  <div className="text-xs font-semibold text-gray-800">Rahul Kumar</div>
                  <div className="text-[10px] text-gray-500">Admin</div>
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden md:block" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 md:p-8 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
