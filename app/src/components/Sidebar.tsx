import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Hotel, 
  BookOpen, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  PawPrint,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Safari Booking', icon: Map, href: '/safari' },
  { name: 'Hotel Booking', icon: Hotel, href: '/hotels' },
  { name: 'Booking Management', icon: BookOpen, href: '/bookings' },
  { name: 'Chat', icon: MessageSquare, href: '/chat' },
  { name: 'User Panel', icon: User, href: '/user' },
  { name: 'Admin Panel', icon: Settings, href: '/admin', priority: true },
];

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2 font-bold text-xl", className)}>
    <div className="bg-gold p-1.5 rounded-lg flex items-center justify-center">
      <PawPrint className="w-5 h-5 text-dark" />
    </div>
    <span className="text-white tracking-tight">
      Wild<span className="text-gold">Earth</span> <span className="text-gray-400 font-light text-sm">PRO</span>
    </span>
  </div>
);

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-dark z-50 flex flex-col transition-all lg:translate-x-0 overflow-hidden",
          !isOpen && "lg:w-20"
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center px-6 border-b border-primary/20">
          <Logo className={cn("transition-opacity", !isOpen && "lg:opacity-0")} />
          <div className={cn("absolute left-6 lg:block hidden", isOpen && "lg:hidden")}>
             <div className="bg-gold p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-dark" />
             </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-primary text-gold" 
                    : "text-gray-400 hover:bg-primary/30 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-gold")} />
                <span className={cn(
                  "font-medium transition-all",
                  !isOpen && "lg:opacity-0 lg:absolute lg:left-20"
                )}>
                  {item.name}
                </span>
                
                {isActive && (
                   <motion.div 
                     layoutId="sidebar-active"
                     className="absolute left-0 w-1 h-6 bg-gold rounded-full"
                   />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary/20">
          <button className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group">
            <LogOut className="w-5 h-5" />
            <span className={cn("font-medium", !isOpen && "lg:hidden")}>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
