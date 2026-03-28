'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const hotels = [
  { id: 1, name: 'Grand Forest', type: 'VVIP Estate', price: '₹14,500', rating: 4.9, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400', location: 'Dhikala' },
  { id: 2, name: 'River View', type: 'Luxury Suite', price: '₹8,500', rating: 4.8, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400', location: 'Kosi River' },
  { id: 3, name: 'Wild Heritage', type: 'Eco-Lodge', price: '₹4,200', rating: 4.7, img: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=400', location: 'Jhirna' },
  { id: 4, name: 'Tusk & Mane', type: 'Boutique Stay', price: '₹11,000', rating: 4.9, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=400', location: 'Bijrani' },
  { id: 5, name: 'Tiger Nest', type: 'Nature Retreat', price: '₹6,400', rating: 4.6, img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400', location: 'Dhela' },
  { id: 6, name: 'Mountain View', type: 'Eco Stay', price: '₹3,800', rating: 4.5, img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400', location: 'Pawalgarh' }
];

export default function StaysPage() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-40 font-poppins relative">
      {/* MINIMALIST HEADER */}
      <header className="sticky top-0 h-16 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between z-50 border-b border-gray-100">
         <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg flex items-center justify-center text-primary active:scale-95 transition-all"><i className="bi bi-chevron-left" /></Link>
            <h1 className="text-sm font-bold text-dark tracking-tight">Luxury Stays</h1>
         </div>
         <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm"><i className="bi bi-sliders2 rotate-90 text-sm" /></button>
      </header>

      {/* MINIMALIST SEARCH */}
      <section className="p-6 space-y-6">
         <div className="space-y-1">
            <h2 className="text-xl font-bold text-dark tracking-tighter">Find the Perfect Stay.</h2>
            <p className="text-[11px] font-medium text-gray-400">Available core forest rest houses.</p>
         </div>

         <div className="relative">
            <i className="bi bi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="w-full pl-12 pr-4 py-4 bg-offwhite rounded-2xl outline-none text-xs font-medium text-dark focus:bg-white focus:ring-1 ring-primary/5 transition-all"
            />
         </div>
      </section>

      {/* 🏨 HOTEL GRID (MINIMALIST) */}
      <section className="px-6 grid grid-cols-2 gap-4 pb-10">
         {hotels.map((hotel, i) => (
            <motion.div 
              key={hotel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 relative cursor-pointer active:scale-98 transition-all"
            >
               <div className="h-28 relative">
                  <img src={hotel.img} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 py-0.5 px-2 bg-black/40 backdrop-blur-md rounded-lg text-[8px] font-bold text-white uppercase tracking-widest shadow-lg">
                      <i className="bi bi-star-fill text-gold mr-1" /> {hotel.rating}
                  </div>
               </div>
               
               <div className="p-3.5 space-y-3">
                  <div className="space-y-0.5">
                     <h3 className="text-[11px] font-bold text-dark leading-tight line-clamp-1">{hotel.name}</h3>
                     <p className="text-[9px] font-medium text-gray-400 flex items-center gap-1"><i className="bi bi-geo-alt-fill text-[8px] text-primary/50" /> {hotel.location}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                     <p className="text-[11px] font-bold text-primary">{hotel.price}</p>
                     <div className="w-6 h-6 rounded-lg bg-offwhite flex items-center justify-center text-primary text-[10px] active:bg-primary active:text-white transition-all"><i className="bi bi-arrow-up-right" /></div>
                  </div>
               </div>
            </motion.div>
         ))}
      </section>

      {/* HELP BUTTON */}
      <section className="px-6 pb-10">
          <div className="bg-primary rounded-3xl p-6 text-center space-y-3 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10"><i className="bi bi-houses text-5xl text-white" /></div>
             <p className="text-xs font-bold text-white tracking-tight">Custom Booking Support?</p>
             <button className="w-full py-3 bg-white text-dark rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">
                Contact Ops
             </button>
          </div>
      </section>

    </div>
  );
}
