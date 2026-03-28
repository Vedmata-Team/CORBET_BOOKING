'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  MapPin,
  Hotel,
  BookOpen,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TreePine,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/safari', label: 'Safari Booking', icon: MapPin },
  { href: '/hotels', label: 'Hotels', icon: Hotel },
  { href: '/bookings', label: 'My Bookings', icon: BookOpen },
  { href: '/chat', label: 'Support Chat', icon: MessageSquare },
  { href: '/user', label: 'User Panel', icon: User },
  { href: '/admin', label: 'Admin Panel', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-10 left-4 z-50 md:hidden bg-[#1B4332] text-white p-2 rounded-lg shadow-lg"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full z-40
          bg-[#081C15] flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#1B4332]/50 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#FF8C42] flex items-center justify-center flex-shrink-0 shadow-lg">
            <TreePine size={20} className="text-[#081C15]" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-white font-bold text-sm leading-tight font-poppins tracking-wide">WildEarth</div>
              <div className="text-[#D4AF37] text-[10px] font-semibold tracking-widest uppercase">Safari Pro</div>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`
                  sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${active
                    ? 'bg-[#1B4332] text-[#D4AF37] shadow-lg border border-[#D4AF37]/20'
                    : 'text-[#a0bfad] hover:text-white'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#D4AF37] rounded-r-full" />
                )}
                <Icon size={18} className={active ? 'text-[#D4AF37]' : 'text-[#4a7c64] group-hover:text-[#D4AF37] transition-colors'} />
                {!collapsed && <span>{label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#1B4332] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    {label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-[#1B4332]/50 space-y-1">
          <Link
            href="/login"
            className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#a0bfad] hover:text-red-400 hover:bg-red-400/10 transition-all ${collapsed ? 'justify-center' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <LogOut size={17} />
            {!collapsed && <span>Logout</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#a0bfad] hover:text-white transition-all ${collapsed ? 'justify-center' : 'justify-between'}`}
          >
            {!collapsed && <span className="text-xs">Collapse</span>}
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  )
}
