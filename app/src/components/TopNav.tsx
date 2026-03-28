'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopNav({ theme, toggleSidebar }: { theme?: string; toggleSidebar: () => void }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-2xl border-b border-primary/5 sticky top-0 z-[80] px-6 flex items-center justify-between shadow-premium font-poppins">
      {/* App Branding (HUD Style) */}
      <div className="flex items-center gap-3">
         <div className="bg-primary p-3 rounded-2xl shadow-premium shadow-primary/20 border border-white/10 group active:scale-95 transition-all">
            <i className="bi bi-pentagon-half text-gold text-lg group-hover:rotate-45 transition-transform" />
         </div>
         <div className="flex flex-col">
            <span className="text-sm font-black text-primary tracking-tighter leading-none uppercase italic">WildEarth <span className="text-gold NOT-italic">PRO</span></span>
            <div className="flex items-center gap-1.5 mt-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Command Hub</span>
            </div>
         </div>
      </div>

      {/* App Actions + Profile Snapshot */}
      <div className="flex items-center gap-3 relative">
        <button className="w-11 h-11 bg-offwhite rounded-2xl hover:bg-white border border-transparent hover:border-primary/10 transition-all group active:scale-95 flex items-center justify-center text-gray-400 hover:text-primary">
          <i className="bi bi-search font-black" />
        </button>

        <button className="w-11 h-11 bg-offwhite rounded-2xl hover:bg-white border border-transparent hover:border-primary/10 relative group transition-all active:scale-95 flex items-center justify-center text-gray-400 hover:text-primary">
          <i className="bi bi-bell-fill" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-gold rounded-full border-2 border-white animate-bounce" />
        </button>

        <div className="w-px h-8 bg-gray-100 mx-1" />

        {/* 🧑💼 Profile Snapshot */}
        <button 
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-primary/5 rounded-2xl shadow-premium active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center font-black text-[12px] shadow-lg shadow-primary/20 border-2 border-white/10">
            AD
          </div>
          <i className={cn("bi bi-chevron-down text-gray-300 transition-transform text-xs", showProfile && "rotate-180")} />
        </button>

        {/* Profile Snapshot Dropdown (Premium HUD) */}
        <AnimatePresence>
          {showProfile && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 15 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 15 }}
               className="absolute top-full right-0 mt-4 w-56 bg-white rounded-[2.5rem] shadow-premium border border-primary/5 overflow-hidden z-[100]"
            >
               <div className="p-7 border-b border-gray-100 bg-offwhite/50 space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-gold"><i className="bi bi-person-fill" /></div>
                     <div>
                        <p className="text-[11px] font-black text-dark tracking-tight leading-none uppercase">Admin User</p>
                        <p className="text-[9px] font-black text-green-500 uppercase mt-1 flex items-center gap-1.5 tracking-widest">
                           <i className="bi bi-patch-check-fill shadow-lg" /> Systems Op
                        </p>
                     </div>
                  </div>
               </div>
               <div className="p-3 space-y-1">
                  <button className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-offwhite transition-colors group">
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">Console Config</span>
                     <i className="bi bi-sliders text-gray-300 group-hover:text-primary transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-red-50 text-red-500 transition-colors group">
                     <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors">Terminate Session</span>
                     <i className="bi bi-box-arrow-right text-red-300 group-hover:text-red-500 transition-colors text-lg" />
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
