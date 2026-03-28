'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const myBookings = [
  { id: 'WB-1025', zone: 'Dhikala Core', date: '28 Mar 2026', status: 'Confirmed', amount: '₹4,500', type: 'Safari Expedition', icon: 'bi-compass' },
  { id: 'WB-1028', zone: 'Grand Forest Lodge', date: '30 Mar 2026', status: 'Confirmed', amount: '₹12,400', type: 'Luxury Stay', icon: 'bi-houses' },
  { id: 'WB-1032', zone: 'Bijrani Range', date: '02 Apr 2026', status: 'Pending', amount: '₹3,200', type: 'Safari Expedition', icon: 'bi-compass' }
];

export default function MyBookingsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = myBookings.filter(b => filter === 'All' || b.status === filter);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-40 font-poppins relative">
      {/* HEADER */}
      <header className="sticky top-0 h-16 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between z-50 border-b border-gray-100">
         <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg flex items-center justify-center text-primary active:scale-95 transition-all"><i className="bi bi-chevron-left" /></Link>
            <h1 className="text-sm font-bold text-dark tracking-tight">My Bookings</h1>
         </div>
         <button className="w-8 h-8 rounded-lg bg-offwhite text-primary flex items-center justify-center border border-gray-100"><i className="bi bi-bell text-sm" /></button>
      </header>

      {/* FILTER TABS */}
      <section className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-xl font-bold text-dark tracking-tighter">Your Expeditions.</h2>
               <p className="text-[11px] font-medium text-gray-400">Track and manage your forest permits.</p>
            </div>
         </div>

         <div className="flex bg-offwhite p-1 rounded-2xl border border-gray-100">
            {['All', 'Confirmed', 'Pending'].map((t) => (
               <button 
                 key={t}
                 onClick={() => setFilter(t)}
                 className={cn(
                    "flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all",
                    filter === t ? "bg-white text-primary shadow-sm" : "text-gray-400"
                 )}
               >
                  {t}
               </button>
            ))}
         </div>
      </section>

      {/* BOOKINGS LIST */}
      <section className="px-6 space-y-4 pb-10">
         <AnimatePresence mode="popLayout">
            {filtered.map((booking, i) => (
               <motion.div 
                 key={booking.id}
                 layout
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-white rounded-[2rem] border border-gray-100 p-5 space-y-5 shadow-sm active:scale-98 transition-all"
               >
                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/5">
                           <i className={cn("bi text-xl", booking.icon)} />
                        </div>
                        <div className="space-y-0.5">
                           <h3 className="text-sm font-bold text-dark leading-none">{booking.zone}</h3>
                           <p className="text-[10px] font-medium text-gray-400">{booking.type} • {booking.id}</p>
                        </div>
                     </div>
                     <div className={cn(
                        "px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest",
                        booking.status === 'Confirmed' ? "bg-green-50 text-green-600 border border-green-100" : "bg-yellow-50 text-yellow-600 border border-yellow-100"
                     )}>
                        {booking.status}
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-4">
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Entry Date</p>
                           <p className="text-[11px] font-bold text-dark">{booking.date}</p>
                        </div>
                        <div className="w-px h-6 bg-gray-100" />
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Amount</p>
                           <p className="text-[11px] font-bold text-primary">{booking.amount}</p>
                        </div>
                     </div>
                     <button className="w-10 h-10 rounded-xl bg-offwhite border border-gray-50 flex items-center justify-center text-primary active:bg-primary active:text-white transition-all shadow-sm">
                        <i className="bi bi-arrow-right-short text-xl" />
                     </button>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>

         {filtered.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="w-16 h-16 bg-offwhite rounded-full flex items-center justify-center mx-auto text-gray-300"><i className="bi bi-journal-x text-3xl" /></div>
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">No matching records</p>
            </div>
         )}
      </section>

      {/* HELP CARD */}
      <section className="px-6 pb-20">
          <div className="bg-primary rounded-3xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12"><i className="bi bi-shield-check text-6xl text-white" /></div>
             <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest leading-none">Support Active</p>
                <h3 className="text-sm font-bold text-white leading-none">Issues with your booking?</h3>
             </div>
             <button className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest active:bg-white active:text-primary transition-all relative z-10">
                Contact
             </button>
          </div>
      </section>

    </div>
  );
}
