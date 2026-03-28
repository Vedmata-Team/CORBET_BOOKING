'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const safariZones = [
  { name: 'DHIKALA', slots: 12, price: '₹4,500', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
  { name: 'BIJRANI', slots: 18, price: '₹3,200', img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
  { name: 'JHIRNA', slots: 25, price: '₹2,800', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
  { name: 'SITABANI', slots: 40, price: '₹1,500', img: 'https://images.unsplash.com/photo-1590424753051-9e2b1000f7d4?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
  { name: 'DHELA', slots: 15, price: '₹3,200', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
  { name: 'GARJIYA', slots: 30, price: '₹2,500', img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=400', status: 'LIVE' },
];

export default function ExpeditionExplorerPage() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-40 relative font-poppins selection:bg-primary/20 no-scrollbar">
      
      {/* 🔮 STICKY MINIMALIST HEADER */}
      <header className="sticky top-0 h-14 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between z-50 border-b border-gray-100 italic">
         <div className="flex items-center gap-3 NOT-italic">
            <Link href="/" className="w-8 h-8 rounded-lg flex items-center justify-center text-primary active:scale-95 transition-all"><i className="bi bi-chevron-left" /></Link>
            <h1 className="text-sm font-bold text-dark tracking-tight">Active Core Zones</h1>
         </div>
         <div className="w-8 h-8 rounded-lg bg-primary text-gold flex items-center justify-center border border-primary/20 shadow-sm"><i className="bi bi-compass-fill text-sm" /></div>
      </header>

      {/* 🐆 TITLE & SEARCH */}
      <section className="p-8 space-y-6">
         <div className="space-y-1">
            <h2 className="text-3xl font-black text-dark tracking-tighter italic uppercase">Safari <br /> <span className="text-primary NOT-italic">Expeditions.</span></h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Available core forest permits.</p>
         </div>
      </section>

      {/* 🗺️ MINIMALIST GRID (2-COL) */}
      <section className="px-6 pb-10">
         <div className="grid grid-cols-2 gap-4">
            {safariZones.map((zone, i) => (
               <motion.div 
                 key={zone.name}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-offwhite rounded-[2rem] overflow-hidden shadow-sm border border-gray-50 active:scale-95 transition-all group cursor-pointer relative"
               >
                  <div className="h-28 relative overflow-hidden bg-gray-100">
                     <img 
                        src={zone.img} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400";
                        }}
                     />
                     <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-red-500/90 backdrop-blur-md rounded-lg text-white text-[8px] font-black tracking-widest flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                        {zone.status}
                     </div>
                  </div>
                  <div className="p-4 space-y-2">
                     <div className="space-y-0.5">
                        <h4 className="text-[11px] font-black text-dark uppercase tracking-tight leading-none">{zone.name}</h4>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Slots: {zone.slots}</p>
                     </div>
                     <div className="flex items-center justify-between pt-1 border-t border-gray-100/50">
                        <p className="text-[10px] font-black text-primary leading-none">{zone.price}</p>
                        <i className="bi bi-arrow-up-right text-gray-300 text-xs" />
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 🔮 ECOSYSTEM AD */}
      <section className="px-6 pb-20">
          <div className="bg-primary rounded-[2.5rem] p-8 flex flex-col items-center text-center space-y-4 shadow-xl shadow-primary/10">
             <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold border border-white/20"><i className="bi bi-map-fill text-xl" /></div>
             <div className="space-y-1">
                <h3 className="text-sm font-black text-white uppercase italic leading-none tracking-tight">Forest Map Access</h3>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">Download live routes for offline usage.</p>
             </div>
             <button className="px-8 py-3 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg">
                Activate Map
             </button>
          </div>
      </section>

    </div>
  );
}
