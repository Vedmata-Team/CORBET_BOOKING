import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', icon: 'bi-house-door', activeIcon: 'bi-house-door-fill', href: '/', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Safari', icon: 'bi-compass', activeIcon: 'bi-compass-fill', href: '/safari', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Stays', icon: 'bi-houses', activeIcon: 'bi-houses-fill', href: '/stays', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Bookings', icon: 'bi-journal-check', activeIcon: 'bi-journal-text', href: '/bookings', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Profile', icon: 'bi-person', activeIcon: 'bi-person-fill', href: '/user', color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="relative bg-white border-t border-gray-100 pt-3 z-[90] shadow-[0_-5px_20px_rgba(0,0,0,0.03)] font-poppins" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div className="flex items-center justify-around max-w-md mx-auto relative px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.name === 'Home' && pathname === '/');
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 flex-1"
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  initial={false}
                  animate={{ 
                    y: isActive ? -2 : 0,
                    scale: isActive ? 1.15 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "w-10 h-8 flex items-center justify-center rounded-xl transition-colors duration-300 relative",
                    isActive ? item.color : "text-gray-300"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className={cn("absolute inset-0 rounded-xl", item.bg)}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ borderRadius: 12 }}
                    />
                  )}
                  <i 
                    className={cn(
                        "bi relative z-10", 
                        isActive ? item.activeIcon : item.icon, 
                        "text-lg"
                    )} 
                  />
                </motion.div>
                <span className={cn(
                  "text-[9px] font-medium transition-colors duration-300",
                  isActive ? "text-primary font-bold" : "text-gray-400 font-medium"
                )}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
