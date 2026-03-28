'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Jim Corbett Safari High-Fidelity Data
const heroImages = [
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1590424753051-9e2b1000f7d4?auto=format&fit=crop&q=80&w=1600"
];

const trendingNow = [
  { name: 'Dhikala Tiger Sightings', views: '2.4k', icon: 'bi-radar', tag: 'High Intensity' },
  { name: 'Elephant Path Crossing', views: '1.8k', icon: 'bi-truck-flatbed', tag: 'Core Zone' },
  { name: 'Bijrani Sunset Gypsy', views: '980', icon: 'bi-camera-reels', tag: 'Sought After' },
  { name: 'Jhirna Bamboo Trail', views: '450', icon: 'bi-geo-alt', tag: 'Hidden Gem' }
];

const travelerStories = [
  { author: 'Rahul S.', comment: 'Found the king of Dhikala today! Amazing.', avatar: 'https://i.pravatar.cc/150?u=1' },
  { author: 'Elena M.', comment: 'The lodge vibe is next level.', avatar: 'https://i.pravatar.cc/150?u=2' },
  { author: 'Saurav', comment: 'Best safari app I have used.', avatar: 'https://i.pravatar.cc/150?u=3' },
  { author: 'Priya K.', comment: 'Seamless booking experience.', avatar: 'https://i.pravatar.cc/150?u=4' },
  { author: 'Vikram', comment: 'The forest maps were a life saver.', avatar: 'https://i.pravatar.cc/150?u=5' }
];

const safariZones = [
  { name: 'Bijrani', price: '₹3,200', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=400', desc: 'River-bed sightings.' },
  { name: 'Dhikala', price: '₹4,500', img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=400', desc: 'Heart of Core.' },
  { name: 'Jhirna', price: '₹2,800', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400', desc: 'Bambood forests.' },
  { name: 'Dhela', price: '₹3,200', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400', desc: 'Eco-range sightings.' }
];

const hotelStays = [
  { name: 'Grand Forest', price: '₹14,500', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
  { name: 'River View', price: '₹8,500', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
  { name: 'Wild Heritage', price: '₹4,200', img: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=400', rating: 4.7 }
];

export default function PublicHomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-40 relative font-poppins selection:bg-primary/20 no-scrollbar">
      
      {/* 🔮 APP HEADER */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl z-[100] border-b border-gray-100 flex items-center justify-between px-6 max-w-[450px] mx-auto"
      >
         <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg"><i className="bi bi-pentagon-half text-sm"></i></div>
            <div className="flex flex-col">
               <span className="text-xs font-black text-dark tracking-tighter uppercase leading-none">WildEarth</span>
               <span className="text-[8px] font-bold text-primary tracking-widest uppercase leading-none mt-0.5">Safari Pro</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-offwhite text-dark flex items-center justify-center border border-gray-100"><i className="bi bi-search text-xs" /></button>
            <button onClick={() => setShowLoginPrompt(true)} className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/5"><i className="bi bi-person-circle text-lg"></i></button>
         </div>
      </motion.header>

      {/* 🎯 CINEMATIC HERO */}
      <section className="relative h-[68vh] shrink-0 overflow-hidden flex flex-col justify-center px-6 bg-dark">
        <AnimatePresence>
          <motion.div 
            key={currentHero}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 z-0"
          >
            <img 
               src={heroImages[currentHero]} 
               className="w-full h-full object-cover brightness-[0.55]" 
               alt="Corbett Safari"
               onError={(e) => {
                  (e.target as HTMLImageElement).src = heroImages[0];
               }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark/60" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 space-y-6 max-w-[340px]">
           <div className="space-y-4">
              <motion.div 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-xl"
              >
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">Active Ops Center</span>
              </motion.div>
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-4xl font-extrabold text-white leading-[1.05] tracking-tighter"
              >
                 Master <br /> the <span className="text-gold italic font-bold">Unseen</span> <br /> Wild.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-bold text-white/60 leading-relaxed max-w-[240px] uppercase tracking-[0.2em]"
              >
                 High-fidelity permit terminal & luxury forest stays.
              </motion.p>
           </div>
        </div>

        <motion.div 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, damping: 20, type: 'spring' }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-3xl p-5 rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] space-y-5 border border-white/30"
        >
             <div className="grid grid-cols-2 gap-3 pb-1">
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Range Node</p>
                   <div className="relative">
                      <select className="w-full p-4 bg-offwhite rounded-2xl text-[11px] font-black text-dark outline-none appearance-none cursor-pointer border border-gray-50">
                          <option>Dhikala Core</option>
                          <option>Bijrani Gate</option>
                          <option>Jhirna Zone</option>
                      </select>
                      <i className="bi bi-chevron-expand absolute right-4 top-1/2 -translate-y-1/2 text-primary text-[10px]" />
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Entry Node</p>
                   <input type="date" className="w-full p-4 bg-offwhite rounded-2xl text-[11px] font-black text-dark outline-none cursor-pointer border border-gray-50" />
                </div>
             </div>
             <button onClick={() => setShowLoginPrompt(true)} className="w-full py-5 bg-primary text-gold rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] active:scale-98 transition-all shadow-xl shadow-primary/20 glow-primary">
                Verify Availability
             </button>
        </motion.div>
      </section>

      {/* 🔥 [VERTICAL MINIMAL MARQUEE] TRENDING NOW (TYPICAL AAP STYLE) */}
      <section className="bg-white flex flex-col p-8 space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-dark tracking-tighter uppercase italic">Trending <span className="text-primary NOT-italic">Signals</span></h2>
            <div className="w-6 h-6 rounded-full bg-offwhite flex items-center justify-center text-primary text-[10px]"><i className="bi bi-broadcast"></i></div>
         </div>
         <div className="h-24 overflow-hidden relative border-t border-b border-gray-50 bg-offwhite/30 rounded-2xl">
            <motion.div 
               animate={{ y: [0, -200] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="flex flex-col gap-1 py-4"
            >
               {[...trendingNow, ...trendingNow, ...trendingNow].map((item, i) => (
                  <div 
                    key={`${item.name}-${i}`}
                    className="flex items-center gap-4 px-6 h-12 shrink-0 group border-b border-gray-100/30 last:border-0"
                  >
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-gray-50">
                        <i className={cn("bi text-xs", item.icon)} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-dark tracking-tight leading-none uppercase truncate">{item.name}</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">{item.tag}</p>
                     </div>
                     <div className="px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm">
                        <p className="text-[8px] font-black text-primary leading-none uppercase">Live</p>
                     </div>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* ⭐ [MARQUEE] VOICES OF THE WILD (HORIZONTAL CINEMATIC) */}
      <section className="bg-dark pt-20 pb-20 space-y-12 rounded-[4rem] mt-6 relative overflow-hidden mx-4 flex flex-col items-center min-h-[500px]">
         <div className="absolute top-4 right-1/2 translate-x-1/2 opacity-10 pointer-events-none z-0"><i className="bi bi-quote text-[160px] text-white" /></div>
         
         <div className="space-y-4 relative z-10 text-center">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-[1] flex flex-col">
                <span>Voices</span> 
                <span className="text-gold NOT-italic">of the Wild</span>
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full mx-auto shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
            <p className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase">Verified Travelers</p>
         </div>

         <div className="relative w-full overflow-hidden z-20 flex-1 flex items-center">
            <motion.div 
               animate={{ x: [0, -1200] }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="flex gap-6 w-max px-10"
            >
               {[...travelerStories, ...travelerStories, ...travelerStories].map((story, i) => (
                  <div 
                    key={`${story.author}-${i}`}
                    className="w-[280px] bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 flex flex-col items-center text-center space-y-6 shrink-0 shadow-2xl"
                  >
                     <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-white/10">
                        <img src={story.avatar} className="w-full h-full object-cover" />
                     </div>
                     <div className="space-y-4">
                        <p className="text-[13px] font-bold text-white/90 leading-relaxed italic line-clamp-3">"{story.comment}"</p>
                        <div className="flex items-center justify-center gap-3">
                           <div className="w-8 h-[1px] bg-gold/20" />
                           <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{story.author}</p>
                           <div className="w-8 h-[1px] bg-gold/20" />
                        </div>
                     </div>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* 🐅 ACTIVE SECTORS (GRID) */}
      <section className="p-8 space-y-6">
         <div className="flex items-end justify-between">
            <h2 className="text-xl font-black text-dark tracking-tighter uppercase italic">Core <span className="text-primary NOT-italic">Sectors</span></h2>
            <Link href="/safari" className="text-[10px] font-black text-primary uppercase tracking-widest border-b-2 border-primary/10 pb-1">All Ranges</Link>
         </div>
         <div className="grid grid-cols-2 gap-4">
            {safariZones.map((zone, i) => (
               <motion.div 
                 key={zone.name}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-white rounded-[2.2rem] overflow-hidden shadow-md border border-gray-100 active:scale-95 transition-all group cursor-pointer"
               >
                  <div className="h-28 relative overflow-hidden">
                     <img 
                        src={zone.img} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = safariZones[0].img;
                        }}
                     />
                  </div>
                  <div className="p-4 space-y-1">
                     <h4 className="text-[11px] font-black text-dark uppercase tracking-tight leading-none">{zone.name}</h4>
                     <p className="text-[10px] font-black text-primary leading-none">{zone.price}</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 🏨 LUXURY VAULT (LIST) */}
      <section className="p-8 space-y-6">
         <div className="flex items-end justify-between">
            <h2 className="text-xl font-black text-dark tracking-tighter uppercase italic">Stay <span className="text-primary NOT-italic">Vault</span></h2>
            <Link href="/stays" className="text-[10px] font-black text-primary uppercase tracking-widest border-b-2 border-primary/10 pb-1">Inventory</Link>
         </div>
         <div className="space-y-4">
            {hotelStays.map((hotel, i) => (
               <motion.div 
                 key={hotel.name}
                 initial={{ opacity: 0, x: 10 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-white rounded-[2rem] border border-gray-100 p-4 flex gap-5 items-center group active:scale-[0.98] transition-all cursor-pointer shadow-premium relative overflow-hidden"
               >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-gray-50 bg-offwhite">
                     <img src={hotel.img} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                     <div className="flex items-center gap-1.5">
                        <i className="bi bi-star-fill text-gold text-[8px]" />
                        <span className="text-[9px] font-black text-dark leading-none">{hotel.rating}</span>
                     </div>
                     <h4 className="text-[12px] font-black text-dark leading-none tracking-tight">{hotel.name}</h4>
                     <p className="text-[10px] font-black text-primary opacity-70 leading-none">{hotel.price}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-offwhite flex items-center justify-center text-primary text-xs active:bg-primary active:text-white transition-all shadow-sm border border-gray-50"><i className="bi bi-arrow-right" /></div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 🔮 COMPANION APP */}
      <section className="p-8 pt-0">
          <div className="bg-primary/5 rounded-[3.5rem] p-10 border border-primary/5 space-y-6 flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl text-primary mb-2 border border-gray-50"><i className="bi bi-phone-vibrate-fill text-3xl" /></div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-dark tracking-tight leading-none uppercase italic">Stay Verified</h3>
                <p className="text-[11px] font-bold text-gray-400 max-w-[200px] leading-relaxed uppercase tracking-[0.1em]">Companion platform for live tracking & offline maps.</p>
             </div>
             <button className="px-10 py-4 bg-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] active:scale-95 transition-all shadow-2xl glow-primary">
                Get Identity
             </button>
          </div>
      </section>

      {/* 🔐 CONSOLE ACCESS */}
      <AnimatePresence>
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-dark/40 backdrop-blur-xl z-[200] flex items-end justify-center px-4 pb-4">
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 20, opacity: 0 }}
               className="w-full max-w-[420px] bg-white rounded-[4rem] p-10 space-y-8 shadow-2xl relative overflow-hidden border border-white/20"
             >
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto cursor-pointer" onClick={() => setShowLoginPrompt(false)} />
                <div className="text-center space-y-2">
                   <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary mb-4 shadow-inner border border-primary/5"><i className="bi bi-shield-lock-fill text-4xl" /></div>
                   <h2 className="text-2xl font-black text-dark tracking-tight uppercase italic">Secure Hub</h2>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">"Biometric Session Control"</p>
                </div>
                <div className="space-y-4 pb-2">
                   <Link href="/login" onClick={() => setShowLoginPrompt(false)} className="w-full py-5 bg-primary text-gold rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-xl shadow-primary/20">
                      Enter Console <i className="bi bi-fingerprint text-xl" />
                   </Link>
                   <button onClick={() => setShowLoginPrompt(false)} className="w-full py-5 bg-offwhite text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-gray-100">
                      Dismiss
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
