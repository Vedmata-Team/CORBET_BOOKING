'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-dark overflow-hidden font-poppins">
      {/* Background with Blur/Overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.3]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600')`,
          filter: 'blur(4px)'
        }}
      />
      
      {/* Dynamic Silhouettes Overlay */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none">
        <i className="bi bi-tree-fill absolute bottom-[-20px] left-[-20px] text-[15rem] text-gold" />
        <i className="bi bi-tree-fill absolute top-[-10px] right-[-30px] text-[10rem] text-gold" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[420px] px-6"
      >
        <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] p-12 shadow-premium border border-white/20 relative group overflow-hidden">
          {/* Subtle Glow Header */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-gold to-primary glow-primary opacity-50" />
          
          <div className="flex flex-col items-center mb-12">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mb-6 shadow-premium shadow-primary/30 cursor-pointer border-4 border-white/10"
            >
               <i className="bi bi-pentagon-half text-gold text-3xl" />
            </motion.div>
            <h1 className="text-[1.8rem] font-black text-dark text-center tracking-tighter uppercase italic">
              WildEarth <span className="text-gold NOT-italic">PRO</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Secure Gateway Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2 italic">Operator Identity</label>
              <div className="relative group">
                <i className="bi bi-person-badge-fill absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-lg" />
                <input
                  type="email"
                  required
                  defaultValue="admin@wildearth.pro"
                  placeholder="admin@wildearth.pro"
                  className="w-full pl-14 pr-6 py-5 bg-offwhite border border-transparent rounded-3xl outline-none focus:border-primary/20 focus:bg-white transition-all text-[13px] font-black text-dark shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2 italic">System Access Key</label>
              <div className="relative group">
                <i className="bi bi-shield-lock-fill absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-lg" />
                <input
                  type="password"
                  required
                  defaultValue="wildearth2026"
                  placeholder="Enter access pin"
                  className="w-full pl-14 pr-6 py-5 bg-offwhite border border-transparent rounded-3xl outline-none focus:border-primary/20 focus:bg-white transition-all text-[13px] font-black text-dark shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-5 h-5 flex items-center justify-center">
                   <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer z-10" />
                   <div className="w-5 h-5 bg-offwhite border border-gray-100 rounded-lg group-hover:border-primary/20 transition-all peer-checked:bg-primary peer-checked:border-primary" />
                   <i className="bi bi-check-lg absolute text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest group-hover:text-dark transition-colors">Trust Hub Terminal</span>
              </label>
            </div>

            <motion.button
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group overflow-hidden py-5 bg-primary rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-premium shadow-primary/30 text-gold flex items-center justify-center gap-3 active:scale-95 disabled:grayscale"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-gold rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Console</span>
                  <i className="bi bi-power text-xl" />
                </>
              )}
              <div className="absolute inset-0 bg-nature-green shimmer-anim opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.button>
          </form>
          
          <div className="mt-12 flex items-center justify-center gap-3 text-gold/30">
             <i className="bi bi-patch-check-fill text-lg" />
             <span className="text-[10px] uppercase tracking-[0.5em] font-black italic">Gov. Encrypted Terminal</span>
          </div>
        </div>
        
        <p className="text-center text-white/30 text-[10px] mt-12 font-black uppercase tracking-[0.4em]">
           WILDEARTH PRO AGENT &bull; SECURE NODES ACTIVATED
        </p>
      </motion.div>
    </div>
  );
}
