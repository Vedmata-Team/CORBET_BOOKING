import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', icon: 'bi-house-door', activeIcon: 'bi-house-door-fill', href: '/' },
  { name: 'Safari', icon: 'bi-compass', activeIcon: 'bi-compass-fill', href: '/safari' },
  { name: 'Stays', icon: 'bi-houses', activeIcon: 'bi-houses-fill', href: '/stays' },
  { name: 'Bookings', icon: 'bi-journal-check', activeIcon: 'bi-journal-check', href: '/bookings' },
  { name: 'Profile', icon: 'bi-person', activeIcon: 'bi-person-fill', href: '/user' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 pb-8 pt-4 z-[90] shadow-[0_-5px_20px_rgba(0,0,0,0.03)] font-poppins">
      <div className="flex items-center justify-around max-w-md mx-auto relative cursor-pointer">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.name === 'Home' && pathname === '/');
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex flex-col items-center gap-1.5 p-1 transition-all relative flex-1"
            >
              <div className={cn(
                "w-10 h-8 flex items-center justify-center rounded-xl transition-all duration-300 relative",
                isActive ? "text-primary scale-110" : "text-gray-300 hover:text-primary/60"
              )}>
                <i 
                  className={cn(
                      "bi", 
                      isActive ? item.activeIcon : item.icon, 
                      isActive ? "text-lg" : "text-md"
                  )} 
                />
              </div>
              
              <span className={cn(
                "text-[9px] font-medium transition-colors duration-300",
                isActive ? "text-primary font-bold" : "text-gray-400 font-medium"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-sm"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
