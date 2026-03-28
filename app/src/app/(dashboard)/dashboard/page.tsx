'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const trendData = [
  { name: 'Mon', bookings: 400, revenue: 2400 },
  { name: 'Tue', bookings: 300, revenue: 1398 },
  { name: 'Wed', bookings: 500, revenue: 9800 },
  { name: 'Thu', bookings: 278, revenue: 3908 },
  { name: 'Fri', bookings: 689, revenue: 4800 },
  { name: 'Sat', bookings: 839, revenue: 8800 },
  { name: 'Sun', bookings: 949, revenue: 9300 },
];

const stats = [
  { label: 'Total Safaris', value: '1,280', icon: 'bi-grid-fill', color: 'primary', trend: '+12%', bg: 'bg-primary/10' },
  { label: 'Hotel Bookings', value: '456', icon: 'bi-houses-fill', color: 'gold', trend: '+8%', bg: 'bg-gold/10' },
  { label: 'Total Revenue', value: '₹12.4L', icon: 'bi-graph-up-arrow', color: 'green', trend: '+15%', bg: 'bg-green-500/10' },
  { label: 'Active Users', value: '24K', icon: 'bi-people-fill', color: 'earth', trend: '+5%', bg: 'bg-earth/10' },
  { label: 'Today Booking', value: '156', icon: 'bi-lightning-charge-fill', color: 'warning', trend: '+4%', bg: 'bg-warning/10' },
];

const recentBookings = [
  { id: 'BK-4521', user: 'Rahul Sharma', zone: 'Dhikala', date: '03-28', status: 'Confirmed', price: '₹4.5k' },
  { id: 'BK-4522', user: 'Anjali Gupta', zone: 'Bijrani', date: '03-29', status: 'Pending', price: '₹3.2k' },
  { id: 'BK-4523', user: 'Vikram Singh', zone: 'Jhirna', date: '03-28', status: 'Cancelled', price: '₹2.8k' },
];

const zoneCards = [
  { name: 'Dhikala (Core)', slots: 8, price: '₹4,500', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bijrani Range', slots: 12, price: '₹3,200', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=400' },
  { name: 'Jhirna Sector', slots: 15, price: '₹2,800', img: 'https://images.unsplash.com/photo-1590424753051-9e2b1000f7d4?auto=format&fit=crop&q=80&w=400' },
];

const notifications = [
  { text: 'Slot velocity high in Dhikala Core', type: 'warning' },
  { text: 'Auth Terminal synchronized (v2.4)', type: 'success' },
];

export default function AppDashboardPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="space-y-12 pb-40 font-poppins px-1">
      
      {/* 🚀 1. SYSTEM HEADER (ADMIN HUD) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl font-black text-dark tracking-tighter leading-none italic"
            >
              System <span className="text-primary NOT-italic">Sync</span> <i className="bi bi-broadcast text-red-500 text-sm align-middle ml-2 animate-pulse" />
            </motion.h1>
            <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-[0.4em] flex items-center gap-2 leading-none">
                <i className="bi bi-shield-lock-fill text-primary" /> SECURE OPERATOR ACCESS
            </p>
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-offwhite rounded-[2rem] shadow-premium text-primary font-black text-xs flex flex-col items-center gap-1 border border-primary/5"
          >
             <span className="text-[8px] text-gray-400 uppercase tracking-widest">Operator ID</span>
             <span>WE-842</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.slice(0, 4).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white rounded-4xl border border-primary/5 shadow-premium active:scale-95 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg", stat.bg)}>
                  <i className={cn("bi", stat.icon, `text-${stat.color}`)} />
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full leading-none">
                  {stat.trend}
                </span>
              </div>
              <div className="mt-8 relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none mb-2">{stat.label}</p>
                <h3 className="text-2xl font-black text-dark leading-none">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 📊 2. ANALYTICS (CLEAN & PRO) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-8 bg-dark rounded-[3.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 pointer-events-none">
            <i className="bi bi-activity text-[10rem] text-gold" />
        </div>
        
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="space-y-1">
             <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Live Permits Flow</h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Global booking density index</p>
          </div>
          <div className="p-3 border border-white/10 rounded-2xl text-[10px] font-black text-gold bg-white/5 uppercase tracking-widest">7 Days <i className="bi bi-chevron-down ml-1" /></div>
        </div>
        
        <div className="h-[220px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPermit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: '#081C15', border: '1px solid #1B4332', borderRadius: '15px', fontSize: '10px' }}
                itemStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="bookings" stroke="#D4AF37" strokeWidth={4} fillOpacity={1} fill="url(#colorPermit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 📅 3. QUICK BOOKING (MASTER OVERRIDE) */}
      <section className="p-1 px-1">
        <div className="bg-primary rounded-[3.5rem] p-8 shadow-premium shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12">
               <i className="bi bi-lightning-charge-fill text-9xl text-gold" />
            </div>
            <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-dark text-2xl shadow-lg shadow-gold/20"><i className="bi bi-terminal-fill" /></div>
                  <div className="space-y-1">
                     <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Master Hub</h3>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Force Inventory Entry</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                     <label className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] ml-2">Sector</label>
                     <div className="relative">
                        <select className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white outline-none appearance-none cursor-pointer">
                           <option>Dhikala Range</option>
                           <option>Bijrani Core</option>
                           <option>Jhirna Range</option>
                        </select>
                        <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-xs pointer-events-none" />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] ml-2">Batch No</label>
                     <div className="relative">
                        <select className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white outline-none appearance-none cursor-pointer">
                           <option>Morning (06:00)</option>
                           <option>Evening (14:30)</option>
                        </select>
                        <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-xs pointer-events-none" />
                     </div>
                  </div>
               </div>
               <button className="w-full py-6 bg-gold text-dark rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-lg shadow-gold/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  Check Inventory <i className="bi bi-hdd-network-fill text-xl" />
               </button>
            </div>
        </div>
      </section>

      {/* 🐯 4. INFRASTRUCTURE STATUS */}
      <section className="space-y-8">
         <div className="flex items-center justify-between px-3">
            <div className="space-y-1">
               <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] leading-none">Park Infrastructure</h2>
               <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest leading-none">Real-time gate synchronization</p>
            </div>
            <button className="p-3 bg-offwhite rounded-2xl text-primary text-xl active:scale-90 transition-all shadow-sm"><i className="bi bi-sliders2" /></button>
         </div>
         <div className="flex gap-6 overflow-x-auto no-scrollbar px-1 pb-6">
            {zoneCards.map((zone, i) => (
               <motion.div 
                 key={zone.name}
                 whileInView={{ opacity: 1, scale: 1 }}
                 initial={{ opacity: 0, scale: 0.9 }}
                 transition={{ delay: i * 0.1 }}
                 className="min-w-[280px] bg-white rounded-4xl overflow-hidden border border-primary/5 shadow-premium active:scale-98 transition-all relative group"
               >
                  <div className="h-32 relative overflow-hidden">
                     <img src={zone.img} className="w-full h-full object-cover brightness-75 group-hover:scale-110 transition-all duration-1000" />
                     <div className="absolute top-4 left-4 flex gap-2">
                        <div className="px-3 py-1 bg-green-500 rounded-full text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                           <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> GATE OPEN
                        </div>
                     </div>
                  </div>
                  <div className="p-7 space-y-6">
                     <div className="flex items-center justify-between">
                        <h4 className="text-[13px] font-black text-dark uppercase tracking-tighter leading-none">{zone.name}</h4>
                        <div className="w-8 h-8 bg-offwhite rounded-xl flex items-center justify-center text-primary"><i className="bi bi-arrow-up-right" /></div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Permit Index</p>
                           <p className="text-lg font-black text-primary leading-none">{zone.price}</p>
                        </div>
                        <button className="px-6 py-3 bg-primary text-gold rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Edit Protocol</button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 🚀 5. QUICK ACTIONS HUB */}
      <div className="grid grid-cols-2 gap-4 px-2">
         {[
            { label: 'Dispatch Gypsy', icon: 'bi-truck-front-fill', bg: 'bg-gold', text: 'text-dark', shadow: 'shadow-gold/30' },
            { label: 'Global Reports', icon: 'bi-file-earmark-bar-graph-fill', bg: 'bg-dark', text: 'text-white', shadow: 'shadow-dark/30' },
         ].map(action => (
            <motion.button 
               key={action.label} 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className={cn("p-7 rounded-4xl flex flex-col gap-6 items-start active:scale-95 transition-all shadow-2xl relative overflow-hidden group", action.bg, action.text, action.shadow)}
            >
               <div className="relative z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform shadow-lg">
                  <i className={cn("bi", action.icon)} />
               </div>
               <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em] leading-tight text-left">{action.label}</span>
               <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity"><i className={cn("bi", action.icon, "text-6xl")} /></div>
            </motion.button>
         ))}
      </div>

      {/* 🧾 6. INVENTORY LEDGER */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-3">
          <div className="space-y-1">
             <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] leading-none">Booking Inventory</h2>
             <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest leading-none">Real-time permit ledger synchronization</p>
          </div>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest border-b-2 border-gold pb-1">Historical Logs</button>
        </div>
        <div className="space-y-4 px-2">
          {recentBookings.map((booking, i) => (
            <motion.div 
              key={booking.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white rounded-4xl flex items-center gap-5 border border-primary/5 shadow-premium active:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-offwhite flex items-center justify-center shrink-0 border border-primary/5 shadow-inner text-primary/40 text-2xl group-hover:bg-primary/5 transition-colors">
                <i className="bi bi-person-badge-fill" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <p className="text-sm font-black text-dark truncate leading-none uppercase tracking-tight">{booking.user}</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{booking.zone} • {booking.date}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-sm font-black text-primary leading-none">{booking.price}</p>
                <span className={cn(
                  "text-[9px] font-black px-3 py-1 rounded-full uppercase inline-block leading-none border shadow-sm",
                  booking.status === 'Confirmed' ? "bg-green-50 text-green-700 border-green-100" :
                  booking.status === 'Pending' ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                  "bg-red-50 text-red-700 border-red-100"
                )}>
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 7. SYSTEM TELEMETRY (NOTIFICATIONS) */}
      <div className="space-y-3 px-3">
         {notifications.map((note, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-5 bg-offwhite border-l-4 border-gold rounded-3xl flex items-center justify-between shadow-sm group hover:bg-gold/5 transition-colors"
            >
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gold shadow-sm"><i className="bi bi-hdd-stack-fill" /></div>
                  <p className="text-[10px] font-black text-dark uppercase tracking-widest leading-none">{note.text}</p>
               </div>
               <i className="bi bi-bell-fill text-gold/30 group-hover:text-gold transition-colors" />
            </motion.div>
         ))}
      </div>

      {/* 🎧 8. SUPPORT HUD (SIMULATED) */}
      <AnimatePresence>
        {showChat ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-28 right-6 w-[340px] bg-white rounded-[3rem] shadow-premium border border-primary/10 z-[110] overflow-hidden"
          >
             <div className="p-6 bg-primary text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gold text-dark flex items-center justify-center text-2xl shadow-lg border-2 border-white/20"><i className="bi bi-headset" /></div>
                   <div>
                      <p className="text-[12px] font-black leading-none uppercase tracking-tighter">Command Support</p>
                      <p className="text-[10px] font-bold text-green-400 uppercase mt-2 tracking-[0.2em] flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> OPERATIONAL</p>
                   </div>
                </div>
                <button onClick={() => setShowChat(false)} className="bg-white/10 p-3 rounded-2xl active:scale-90 transition-all hover:bg-white/20"><i className="bi bi-x-lg text-xl" /></button>
             </div>
             <div className="p-16 text-center space-y-6">
                <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary/10 text-5xl"><i className="bi bi-layers-half" /></div>
                <div className="space-y-2">
                   <p className="text-[11px] font-black text-dark uppercase tracking-widest">Secure Comms Idle</p>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Waiting for terminal handshake...</p>
                </div>
             </div>
          </motion.div>
        ) : (
          <motion.button 
             onClick={() => setShowChat(true)}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             whileHover={{ scale: 1.1, rotate: 10 }}
             whileTap={{ scale: 0.9 }}
             className="fixed bottom-28 right-8 w-16 h-16 bg-primary text-gold rounded-full shadow-2xl z-[110] flex items-center justify-center active:scale-95 transition-all outline-none border-none ring-8 ring-gold/10 glow-primary"
          >
             <i className="bi bi-headset text-3xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
