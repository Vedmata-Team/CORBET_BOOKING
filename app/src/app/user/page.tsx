'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function UserProfilePage() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-40 font-poppins relative">
      {/* 🔮 PROFILE HEADER */}
      <header className="sticky top-0 h-16 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between z-50 border-b border-gray-100 italic">
         <div className="flex items-center gap-3 NOT-italic">
            <Link href="/" className="w-8 h-8 rounded-lg flex items-center justify-center text-primary active:scale-95 transition-all"><i className="bi bi-chevron-left" /></Link>
            <h1 className="text-sm font-bold text-dark tracking-tight">System Profile</h1>
         </div>
         <button className="w-8 h-8 rounded-lg bg-offwhite text-primary flex items-center justify-center border border-gray-100 shadow-sm"><i className="bi bi-gear-fill text-sm" /></button>
      </header>

      {/* 👤 AVATAR SECTION */}
      <section className="p-10 flex flex-col items-center space-y-4">
          <div className="relative group">
             <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary border border-primary/5 shadow-2xl overflow-hidden active:scale-95 transition-all">
                <i className="bi bi-person-fill text-5xl" />
             </div>
             <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold text-dark rounded-xl flex items-center justify-center border-4 border-white shadow-lg active:bg-dark active:text-white transition-all">
                <i className="bi bi-camera-fill text-[10px]" />
             </button>
          </div>
          <div className="text-center space-y-1">
             <h2 className="text-xl font-bold text-dark tracking-tighter uppercase italic">Wild <span className="text-gold NOT-italic">Traveler</span></h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operator Identity • #WB-001</p>
          </div>
      </section>

      {/* 🛠️ PROFILE ACTIONS */}
      <section className="px-8 space-y-8">
          <div className="space-y-4">
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Account Identity</span>
             <div className="bg-white rounded-[2rem] border border-gray-50 shadow-premium overflow-hidden">
                {[ 
                  { label: 'Primary Contact', value: 'traveler@wildearth.pro', icon: 'bi-envelope' },
                  { label: 'Mobile Sync', value: '+91 98765 43210', icon: 'bi-phone' },
                  { label: 'Corbett Pass ID', value: 'GC-2024-X99', icon: 'bi-card-list' }
                ].map((item, i) => (
                  <div key={item.label} className={cn(
                    "p-5 flex items-center justify-between group active:bg-offwhite transition-all cursor-pointer",
                    i !== 2 && "border-b border-gray-50"
                  )}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-offwhite flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gold transition-all"><i className={cn("bi", item.icon)} /></div>
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                           <p className="text-[11px] font-bold text-dark">{item.value}</p>
                        </div>
                     </div>
                     <i className="bi bi-chevron-right text-gray-200 text-xs" />
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-4">
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Platform Security</span>
             <div className="bg-white rounded-[2rem] border border-gray-50 shadow-premium overflow-hidden">
                <div className="p-5 flex items-center justify-between bg-red-50/20 active:bg-red-50 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all"><i className="bi bi-power" /></div>
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Authenticated Session</p>
                         <p className="text-[11px] font-bold text-red-500">Terminate Operator Hub</p>
                      </div>
                   </div>
                   <i className="bi bi-arrow-right-short text-red-300 text-xl" />
                </div>
             </div>
          </div>
      </section>

      {/* 🚀 QUICK OPS */}
      <section className="p-8 mt-4 grid grid-cols-2 gap-4">
          <div className="bg-offwhite p-5 rounded-3xl border border-gray-50 flex flex-col items-center text-center space-y-2 group active:bg-primary transition-all">
             <i className="bi bi-shield-lock text-xl text-primary group-active:text-gold" />
             <p className="text-[10px] font-bold text-dark group-active:text-white tracking-tight leading-none uppercase italic">Change PIN</p>
          </div>
          <div className="bg-offwhite p-5 rounded-3xl border border-gray-50 flex flex-col items-center text-center space-y-2 group active:bg-primary transition-all">
             <i className="bi bi-arrow-down-circle text-xl text-primary group-active:text-gold" />
             <p className="text-[10px] font-bold text-dark group-active:text-white tracking-tight leading-none uppercase italic">History Log</p>
          </div>
      </section>

    </div>
  );
}
