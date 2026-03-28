'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Map, 
  DollarSign, 
  BarChart3, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Plus,
  ToggleRight,
  ToggleLeft,
  Search,
  Zap,
  Leaf,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const zones = [
  { id: 1, name: 'Dhikala', status: 'Active', price: '₹4,500', cap: 50 },
  { id: 2, name: 'Bijrani', status: 'Active', price: '₹3,200', cap: 35 },
  { id: 3, name: 'Jhirna', status: 'Maintenance', price: '₹2,800', cap: 20 },
  { id: 4, name: 'Dhela', status: 'Active', price: '₹4,100', cap: 30 },
];

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState('Zones');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-dark p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-8 -translate-y-8">
            <Settings className="w-48 h-48 text-gold" />
        </div>
        
        <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-xl shadow-gold/20">
                <ShieldCheck className="w-8 h-8 text-dark" />
            </div>
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">System Controls <span className="text-gold italic">Engine</span></h1>
                <p className="text-white/50 mt-1 font-medium text-sm flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-gold" />
                    Authorized Access Only • Corbet HQ Proxy Active
                </p>
            </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
            <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold text-sm hover:bg-white/20 transition-all">Audit Logs</button>
            <button className="px-6 py-3 bg-gold text-dark border border-gold rounded-2xl font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-gold/20">
                <Plus className="w-4 h-4" />
                <span>Deploy New Config</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-4">
            {['Zones', 'Pricing', 'Analytics', 'Security'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "w-full px-6 py-5 rounded-2xl text-left transition-all border font-bold flex items-center justify-between group",
                    activeTab === tab 
                      ? "bg-white text-primary border-primary/20 shadow-xl shadow-primary/5" 
                      : "text-gray-400 border-transparent hover:bg-white/50"
                  )}
                >
                    <div className="flex items-center gap-4">
                        {tab === 'Zones' && <Map className="w-5 h-5" />}
                        {tab === 'Pricing' && <DollarSign className="w-5 h-5" />}
                        {tab === 'Analytics' && <BarChart3 className="w-5 h-5" />}
                        {tab === 'Security' && <ShieldCheck className="w-5 h-5" />}
                        <span>{tab} Management</span>
                    </div>
                    {activeTab === tab && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                </button>
            ))}
            
            <div className="mt-8 p-6 bg-primary/5 rounded-[2rem] border border-dashed border-primary/20 flex flex-col items-center justify-center text-center space-y-3">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                 </div>
                 <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Global Nature Quota</p>
                 <h4 className="text-2xl font-black text-primary">84% <span className="text-[10px] text-gray-400 font-medium">Safe</span></h4>
                 <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[84%]" />
                 </div>
            </div>
        </div>

        {/* Dynamic Content */}
        <div className="lg:col-span-9 space-y-6">
            <div className="p-10 bg-white border border-primary/5 rounded-[3rem] shadow-xl shadow-primary/5">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-dark tracking-tight">{activeTab} Controls</h2>
                        <p className="text-sm text-gray-400 font-medium tracking-tight">Real-time status of all ecosystem parameters</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary/20 text-xs font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parameter</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Current Value</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Protocol Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {zones.map((zone, i) => (
                                <motion.tr 
                                  key={zone.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="group hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-6 py-6 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gold transition-all">
                                            <Map className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-dark">{zone.name} Precinct</span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-dark">{zone.price}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                                <Users className="w-2.5 h-2.5" />
                                                Max {zone.cap} Cap
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            {zone.status === 'Active' ? (
                                                <>
                                                  <ToggleRight className="w-8 h-8 text-green-500 cursor-pointer" />
                                                  <span className="text-[10px] font-black uppercase text-green-600">Active</span>
                                                </>
                                            ) : (
                                                <>
                                                  <ToggleLeft className="w-8 h-8 text-gray-300 cursor-pointer" />
                                                  <span className="text-[10px] font-black uppercase text-gray-400">Down</span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white hover:text-primary transition-all rounded-lg text-gray-400 hover:shadow-sm border border-transparent hover:border-gray-100">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white hover:text-red-500 transition-all rounded-lg text-gray-400 hover:shadow-sm border border-transparent hover:border-gray-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 p-8 bg-gold/5 rounded-[2.5rem] border border-gold/10 relative group overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gold/20 blur-[60px] group-hover:blur-[80px] transition-all" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-xl font-black text-dark">Global Maintenance Mode</h3>
                            <p className="text-sm font-medium text-gray-500 max-w-sm">Warning: Enabling this will temporarily suspend all external booking gateways and API connections.</p>
                        </div>
                        <button className="px-10 py-5 bg-dark text-gold rounded-2xl font-black text-sm hover:scale-[1.02] shadow-2xl shadow-black/20 transition-all">ENTER SYSTEM LOCKDOWN</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
