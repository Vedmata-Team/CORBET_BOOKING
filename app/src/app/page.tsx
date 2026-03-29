'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const heroImages = [
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=1600",
];

const zones = [
  { name: 'Dhikala', price: '₹4,500', tag: 'Core Zone', img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bijrani', price: '₹3,200', tag: 'River Belt', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=400' },
  { name: 'Jhirna', price: '₹2,800', tag: 'Bamboo Trail', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Dhela', price: '₹3,200', tag: 'Eco Range', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sitabani', price: '₹1,500', tag: 'Buffer Zone', img: 'https://loremflickr.com/400/400/forest,safari/all?lock=10' },
];

const stays = [
  { name: 'Grand Forest', type: 'VVIP Estate', price: '₹14,500', rating: 4.9, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400', loc: 'Dhikala' },
  { name: 'River View', type: 'Luxury Suite', price: '₹8,500', rating: 4.8, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400', loc: 'Kosi River' },
  { name: 'Wild Heritage', type: 'Eco-Lodge', price: '₹4,200', rating: 4.7, img: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=400', loc: 'Jhirna' },
  { name: 'Tusk & Mane', type: 'Boutique Stay', price: '₹11,000', rating: 4.9, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=400', loc: 'Bijrani' },
];

const trending = [
  { label: 'Dhikala Tiger Sighting', sub: 'High Intensity · 2.4k views', icon: 'bi-eye', color: 'text-orange-500' },
  { label: 'Elephant Path Crossing', sub: 'Core Zone · 1.8k views', icon: 'bi-geo-alt', color: 'text-primary' },
  { label: 'Bijrani Sunset Gypsy', sub: 'Sought After · 980 views', icon: 'bi-camera', color: 'text-gold' },
  { label: 'Jhirna Bamboo Trail', sub: 'Hidden Gem · 450 views', icon: 'bi-tree', color: 'text-green-600' },
];

const experiences = [
  { title: 'Jeep Safari', desc: 'Core zone permit', icon: 'bi-truck', price: 'From ₹2,800' },
  { title: 'Canter Safari', desc: 'Group forest ride', icon: 'bi-bus-front', price: 'From ₹800' },
  { title: 'Night Stay', desc: 'Forest rest house', icon: 'bi-moon-stars', price: 'From ₹3,500' },
  { title: 'Bird Walk', desc: 'Dawn guided trail', icon: 'bi-binoculars', price: 'From ₹500' },
];

const reviews = [
  { name: 'Rahul S.', text: 'Spotted a tiger at Dhikala. Absolutely breathtaking!', rating: 5, avatar: 'https://i.pravatar.cc/80?u=1' },
  { name: 'Elena M.', text: 'The lodge experience was next level. Will return.', rating: 5, avatar: 'https://i.pravatar.cc/80?u=2' },
  { name: 'Priya K.', text: 'Seamless booking, instant confirmation. Loved it.', rating: 5, avatar: 'https://i.pravatar.cc/80?u=4' },
  { name: 'Vikas T.', text: 'Safari guides were extremely knowledgeable. Great view!', rating: 5, avatar: 'https://i.pravatar.cc/80?u=5' },
  { name: 'Sarah J.', text: 'Family had a wonderful time. Resorts are beautiful.', rating: 4, avatar: 'https://i.pravatar.cc/80?u=6' },
  { name: 'Amit B.', text: 'Saw a herd of elephants bathing, magical experience.', rating: 5, avatar: 'https://i.pravatar.cc/80?u=7' },
];

function AutoScrollContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered.current) {
        scrollRef.current.scrollLeft += 0.5; // Very slow smooth scrolling
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0; // Seamless loop if array is duplicated
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      onTouchStart={() => (isHovered.current = true)}
      onTouchEnd={() => (isHovered.current = false)}
      className={cn("flex overflow-x-auto no-scrollbar scroll-smooth", className)}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [hero, setHero] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setHero(p => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-6 font-poppins">

      {/* ── HERO ── */}
      <section className="relative h-[58vh] shrink-0 overflow-hidden flex flex-col">
        {/* bg image */}
        <AnimatePresence>
          <motion.img
            key={hero}
            src={heroImages[hero]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/75" />

        {/* brand bar — top */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-6 shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="https://vedmatawebdesigning.pythonanywhere.com/static/Neem_Karoli_Travellers.png"
              alt="Neem Karoli Travellers"
              className="h-9 w-9 rounded-xl object-contain bg-white/10 p-0.5"
            />
            <div>
              <p className="text-sm font-black text-white tracking-tight leading-none">Neem Karoli Travellers</p>
              <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em] leading-none mt-0.5">Jim Corbett · Est. 1936</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <i className="bi bi-person text-sm" />
          </button>
        </div>

        {/* hero heading — bottom */}
        <div className="relative z-10 mt-auto px-5 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-white/60 uppercase tracking-[0.25em]">Live Permits Available</span>
            </div>
            <h1 className="text-[2rem] font-black text-white leading-[1.05] tracking-tighter">
              Book Your<br /><span className="text-gold italic">Wild Safari.</span>
            </h1>
            <p className="text-[10px] text-white/50 font-medium uppercase tracking-widest">
              Jim Corbett National Park · Est. 1936
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK BOOK CARD ── */}
      <div className="px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Book</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Zone</p>
              <div className="relative">
                <select className="w-full px-3 py-3 bg-gray-50 rounded-xl text-[11px] font-bold text-dark outline-none appearance-none border border-gray-100">
                  <option>Dhikala Core</option>
                  <option>Bijrani Gate</option>
                  <option>Jhirna Zone</option>
                  <option>Dhela Range</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Date</p>
              <input type="date" className="w-full px-3 py-3 bg-gray-50 rounded-xl text-[11px] font-bold text-dark outline-none border border-gray-100" />
            </div>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="w-full py-3.5 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* ── EXPERIENCES ── */}
      <section className="mt-7 px-5 space-y-3">
        <p className="text-xs font-black text-dark uppercase tracking-tight">Experiences</p>
        <div className="grid grid-cols-4 gap-2">
          {experiences.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
                <i className={cn("bi text-base", e.icon)} />
              </div>
              <p className="text-[9px] font-black text-dark text-center leading-tight">{e.title}</p>
              <p className="text-[8px] font-bold text-primary text-center leading-none">{e.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="px-5 mt-7 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black text-dark uppercase tracking-tight">Trending Now</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Live</span>
          </div>
        </div>
        <div className="space-y-2">
          {trending.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className={cn("w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0", item.color)}>
                <i className={cn("bi text-sm", item.icon)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-dark truncate">{item.label}</p>
                <p className="text-[9px] text-gray-400 font-medium">{item.sub}</p>
              </div>
              <i className="bi bi-arrow-up-right text-gray-300 text-xs" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SAFARI ZONES ── */}
      <section className="mt-7 space-y-3">
        <div className="flex items-center justify-between px-5">
          <p className="text-xs font-black text-dark uppercase tracking-tight">Safari Zones</p>
          <Link href="/safari" className="text-[10px] font-bold text-primary">View All</Link>
        </div>
        <AutoScrollContainer className="gap-3 px-5 pb-1">
          {[...zones, ...zones, ...zones].map((z, i) => (
            <motion.div
              key={i + z.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % zones.length) * 0.06 }}
              className="shrink-0 w-36 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <div className="h-24 relative overflow-hidden">
                <img src={z.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2.5 text-[8px] font-black text-white/80 uppercase tracking-widest">{z.tag}</p>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <p className="text-[11px] font-black text-dark">{z.name}</p>
                <p className="text-[10px] font-bold text-primary">{z.price}</p>
              </div>
            </motion.div>
          ))}
        </AutoScrollContainer>
      </section>

      {/* ── TOP STAYS ── */}
      <section className="mt-7 space-y-3 px-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black text-dark uppercase tracking-tight">Top Stays</p>
          <Link href="/stays" className="text-[10px] font-bold text-primary">View All</Link>
        </div>
        <div className="space-y-2.5">
          {stays.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/0 via-gold/5 animate-pulse to-white/0" />
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative z-10">
                <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-red-500/90 backdrop-blur-md px-1 py-0.5 rounded z-20 shadow-sm border border-red-500/20">
                   <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                   <span className="text-[5px] font-black text-white uppercase tracking-widest pt-[1px]">Live</span>
                </div>
                <img src={s.img} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-[12px] font-bold text-dark leading-tight">{s.name}</p>
                <p className="text-[9px] text-gray-400 font-medium flex items-center gap-1">
                  <i className="bi bi-geo-alt-fill text-primary/50 text-[8px]" />{s.loc}
                </p>
                <p className="text-[9px] text-gray-400">{s.type}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <i key={j} className="bi bi-star-fill text-gold text-[7px]" />
                  ))}
                  <span className="text-[9px] font-bold text-dark ml-0.5">{s.rating}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[13px] font-black text-primary">{s.price}</p>
                <p className="text-[9px] text-gray-400">/night</p>
                <div className="mt-1.5 w-7 h-7 rounded-xl bg-primary/5 flex items-center justify-center text-primary ml-auto">
                  <i className="bi bi-arrow-right text-[10px]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="mt-7 space-y-3">
        <div className="flex items-center justify-between px-5">
          <p className="text-xs font-black text-dark uppercase tracking-tight">Traveler Reviews</p>
          <div className="flex items-center gap-1">
            <i className="bi bi-star-fill text-gold text-[10px]" />
            <span className="text-[10px] font-black text-dark">4.9</span>
          </div>
        </div>
        <AutoScrollContainer className="gap-3 px-5 pb-1">
          {[...reviews, ...reviews, ...reviews].map((r, i) => (
            <motion.div
              key={i + r.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % reviews.length) * 0.08 }}
              className="shrink-0 w-56 bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3"
            >
              <div className="flex items-center gap-2.5">
                <img src={r.avatar} className="w-8 h-8 rounded-xl object-cover" />
                <div>
                  <p className="text-[11px] font-bold text-dark leading-none">{r.name}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(r.rating)].map((_, j) => (
                      <i key={j} className="bi bi-star-fill text-gold text-[7px]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">"{r.text}"</p>
            </motion.div>
          ))}
        </AutoScrollContainer>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="mt-7 mx-5 bg-primary rounded-3xl p-5">
        <div className="grid grid-cols-3 divide-x divide-white/10">
          {[
            { val: '6', label: 'Safari Zones' },
            { val: '50+', label: 'Stays' },
            { val: '10k+', label: 'Bookings' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 px-2">
              <p className="text-xl font-black text-white">{s.val}</p>
              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest text-center">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SANCTUARY OF WILDERNESS ── */}
      <section className="mt-7 px-5 space-y-4">
        <div className="bg-green-50/50 rounded-3xl p-5 border border-green-100">
          <h2 className="text-sm font-black text-dark mb-2">A Sanctuary of Wilderness and Conservation</h2>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
            Corbett Tiger Reserve is more than just a tourist destination; it is a living testament to the power of dedicated wildlife conservation. Home to the world's highest density of tigers, this reserve exemplifies the success that can be achieved through timely and effective intervention.
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
            Beyond its stunning landscapes and rich biodiversity, Corbett stands as a beacon of hope, showcasing how committed efforts can preserve the delicate balance of nature. Every visit to this sanctuary is a reminder of the vital importance of protecting our natural world for future generations.
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-green-200/50">
            <i className="bi bi-tree-fill text-green-500" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Wildlife Conservation</span>
          </div>
        </div>
      </section>

      {/* ── WILDLIFE RESCUE ── */}
      <section className="mt-7 px-5">
        <div className="bg-orange-50/50 rounded-3xl p-5 border border-orange-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-orange-200/30 text-[100px] pointer-events-none">
            <i className="bi bi-heart-pulse-fill" />
          </div>
          <h2 className="text-sm font-black text-dark mb-2 relative z-10">Wildlife Rescue and Rehabilitation</h2>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3 relative z-10">
            At Corbett Tiger Reserve, our Veterinary Unit and Quick Response Team work tirelessly to protect both wild and captive animals.
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed relative z-10">
            Our state-of-the-art facilities and trained professionals provide comprehensive healthcare, conduct rescue operations, and manage human-wildlife conflicts. Committed to conservation and coexistence, we strive to ensure the well-being of wildlife and the safety of surrounding communities.
          </p>
        </div>
      </section>

      {/* ── GATEWAYS LIST ── */}
      <section className="mt-7 px-5">
        <h2 className="text-xs font-black text-dark uppercase tracking-tight mb-3">Navigating Your Way to Corbett's Gates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { z: 'Jhirna', g: 'Dhela', t: 'All Year', c: 'Ramnagar', icon: 'bi-signpost-split' },
            { z: 'Dhela', g: 'Dhela', t: 'All Year', c: 'Ramnagar', icon: 'bi-tree' },
            { z: 'Bijrani', g: 'Amdanda', t: 'Oct - Jun', c: 'Ramnagar', icon: 'bi-compass' },
            { z: 'Dhikala', g: 'Dhangari', t: 'Nov - Jun', c: 'Ramnagar', icon: 'bi-binoculars' },
            { z: 'Durgadevi', g: 'Durgadevi', t: 'Nov - Jun', c: 'Ramnagar', icon: 'bi-geo' },
            { z: 'Sonanadi', g: 'Vatanvasa', t: 'Nov - Jun', c: 'Kothdwar', icon: 'bi-water' },
            { z: 'Pakhro', g: 'Pakhro', t: 'Nov - Jun', c: 'Kothdwar', icon: 'bi-map' },
            { z: 'Garjia', g: 'Garjiya', t: 'All Year', c: 'Ramnagar', icon: 'bi-pin-map' },
          ].map((row, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <i className={cn("bi text-lg", row.icon)} />
                    </div>
                    <div>
                       <p className="text-[13px] font-black text-dark leading-none">{row.z}</p>
                       <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Zone</p>
                    </div>
                  </div>
                  <Link href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
                    <i className="bi bi-arrow-up-right text-[10px]" />
                  </Link>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                    <i className="bi bi-door-open-fill text-gray-400 text-[10px]" />
                    <p className="text-[9px] font-bold text-dark whitespace-nowrap">{row.g}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                    <i className="bi bi-clock-fill text-gray-400 text-[10px]" />
                    <p className="text-[9px] font-bold text-dark whitespace-nowrap">{row.t}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                    <i className="bi bi-building-fill text-gray-400 text-[10px]" />
                    <p className="text-[9px] font-bold text-dark whitespace-nowrap">{row.c}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ANIMALS YOU CAN SPOT ── */}
      <section className="mt-7 space-y-4">
        <div className="px-5">
          <h2 className="text-sm font-black text-dark mb-1">Immerse Yourself in the Breathtaking Beauty of Corbett Tiger Reserve</h2>
          <p className="text-xs font-black text-gray-400 uppercase tracking-tight">Animals you can spot @ Corbett</p>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
          {[
            { n: 'Tiger', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=400' },
            { n: 'Deer', tag: 'Chital & Sambhar', img: 'https://loremflickr.com/400/400/deer,wildlife,india/all?lock=1' },
            { n: 'Elephant', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
            { n: 'Crocodile', tag: 'Gharial', img: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=400' },
            { n: 'Leopard', img: 'https://loremflickr.com/400/400/leopard,wildlife/all?lock=2' },
            { n: 'Jackal', img: 'https://loremflickr.com/400/400/jackal,wildlife/all?lock=3' },
            { n: 'Kingfisher', tag: 'Asian Paradise Flycatcher', img: 'https://loremflickr.com/400/400/kingfisher,bird/all?lock=4' },
          ].map((ani, idx) => (
            <motion.div
              key={idx}
              className="shrink-0 w-32 h-40 bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm"
            >
              <img src={ani.img} alt={ani.n} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] font-black text-white leading-tight">{ani.n}</p>
                {ani.tag && <p className="text-[8px] font-bold text-white/70 uppercase tracking-widest mt-0.5">{ani.tag}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FIND PERMITS ── */}
      <section className="mt-7 px-5">
        <div className="bg-[#1a1c23] rounded-3xl p-6 relative overflow-hidden text-center shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="bi bi-ticket-detailed-fill text-8xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-lg font-black text-white mb-2">Find your permits</h2>
            <p className="text-[11px] text-white/70 leading-relaxed mb-5 max-w-[280px]">
              Quickly access your permit details with ease. Whether it's for a safari, night stay, or any specific permits, our system will help you find the information you need. Click the buttons below to start the search and ensure you have everything ready for your visit.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-3 bg-white text-dark rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                Search Permits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLIMPSE & BOOK ── */}
      <section className="mt-7 px-5 pb-8 space-y-6">
        <div>
          <h2 className="text-xs font-black text-dark uppercase tracking-tight mb-3">Glimpse @Corbett</h2>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400" className="w-full h-32 object-cover rounded-2xl shadow-sm border border-gray-100" />
            <img src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400" className="w-full h-32 object-cover rounded-2xl shadow-sm border border-gray-100" />
          </div>
          <div className="flex items-center gap-1 mt-2 justify-end">
            <i className="bi bi-instagram text-primary" />
            <span className="text-[10px] font-black text-gray-500">#CorbettTigerReserve</span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-3xl p-5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <i className="bi bi-journal-bookmark-fill text-primary text-xl" />
            <h2 className="text-sm font-black text-dark">Book It Like a Pro</h2>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
            For detailed information on how to book permits, please visit our dedicated booking page. There, you'll find step-by-step instructions to ensure a smooth and hassle-free experience.
          </p>
          <button className="w-full py-3 bg-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            View Booking Guide <i className="bi bi-arrow-right" />
          </button>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-5 mt-4">
        <div className="bg-gray-50 rounded-3xl p-5 flex items-center gap-4 border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
            <i className="bi bi-shield-check text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-dark leading-tight">Verified Permits Only</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Instant confirmation · No hidden fees</p>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-wide shrink-0 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Login
          </button>
        </div>
      </section>

      {/* ── LOGIN MODAL ── */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-end justify-center px-4 pb-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="w-full max-w-[420px] bg-white rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto cursor-pointer" onClick={() => setShowLogin(false)} />
              <div className="text-center space-y-1">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto text-primary mb-3">
                  <i className="bi bi-shield-lock-fill text-2xl" />
                </div>
                <h2 className="text-lg font-black text-dark tracking-tight">Sign In</h2>
                <p className="text-[11px] text-gray-400 font-medium">Access your safari dashboard</p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setShowLogin(false)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                >
                  Enter Console <i className="bi bi-arrow-right" />
                </Link>
                <button
                  onClick={() => setShowLogin(false)}
                  className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold text-[11px] border border-gray-100"
                >
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
