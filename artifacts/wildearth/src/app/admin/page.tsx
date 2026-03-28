'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MapPin, IndianRupee, Users, TrendingUp, ToggleLeft, ToggleRight, Plus, Edit2, Trash2, Eye, Shield } from 'lucide-react'

const zoneData = [
  { id: 1, name: 'Bijrani Zone', capacity: 24, booked: 18, price: 3100, status: true, totalRevenue: '₹8.4L' },
  { id: 2, name: 'Dhikala Zone', capacity: 20, booked: 14, price: 2800, status: true, totalRevenue: '₹6.2L' },
  { id: 3, name: 'Jhirna Zone', capacity: 16, booked: 16, price: 2500, status: false, totalRevenue: '₹4.9L' },
  { id: 4, name: 'Gairal Zone', capacity: 12, booked: 0, price: 2200, status: false, totalRevenue: '₹2.1L' },
  { id: 5, name: 'Sonanadi Zone', capacity: 18, booked: 8, price: 2600, status: true, totalRevenue: '₹3.7L' },
]

const analyticsData = [
  { day: 'Mon', bookings: 28, revenue: 84000 },
  { day: 'Tue', bookings: 35, revenue: 105000 },
  { day: 'Wed', bookings: 31, revenue: 93000 },
  { day: 'Thu', bookings: 42, revenue: 126000 },
  { day: 'Fri', bookings: 38, revenue: 114000 },
  { day: 'Sat', bookings: 55, revenue: 165000 },
  { day: 'Sun', bookings: 48, revenue: 144000 },
]

const adminStats = [
  { label: 'Total Revenue', value: '₹38.2L', icon: IndianRupee, color: '#D4AF37', bg: 'bg-[#D4AF37]/15' },
  { label: 'Active Zones', value: '3 / 5', icon: MapPin, color: '#1B4332', bg: 'bg-[#1B4332]/10' },
  { label: 'Total Users', value: '1,842', icon: Users, color: '#2D6A4F', bg: 'bg-[#2D6A4F]/10' },
  { label: 'This Month', value: '+18.3%', icon: TrendingUp, color: '#FF8C42', bg: 'bg-[#FF8C42]/10' },
]

export default function AdminPage() {
  const [zones, setZones] = useState(zoneData)
  const [activeTab, setActiveTab] = useState<'zones' | 'pricing' | 'analytics'>('zones')

  const toggleZone = (id: number) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, status: !z.status } : z))
  }

  return (
    <AppLayout title="Admin Panel" subtitle="Manage zones, pricing, and platform analytics">
      {/* Admin Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 bg-[#1B4332]/10 border border-[#1B4332]/20 rounded-xl px-3 py-1.5">
          <Shield size={13} className="text-[#1B4332]" />
          <span className="text-xs font-bold text-[#1B4332]">Administrator Access</span>
        </div>
        <div className="flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/20 rounded-xl px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-bold text-[#6B4F2A]">System Online</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminStats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div className="text-xl font-bold text-[#081C15] font-poppins">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(['zones', 'pricing', 'analytics'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${activeTab === tab ? 'bg-[#1B4332] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'}`}
          >
            {tab === 'zones' ? 'Zone Management' : tab === 'pricing' ? 'Pricing Config' : 'Analytics'}
          </button>
        ))}
      </div>

      {/* Zone Management */}
      {activeTab === 'zones' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-bold text-[#081C15] font-poppins text-sm">Safari Zones</h3>
            <button className="flex items-center gap-2 btn-primary px-4 py-2 rounded-xl text-xs font-bold">
              <Plus size={13} />Add Zone
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Zone Name', 'Capacity', 'Booked', 'Price/Seat', 'Revenue', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zones.map(zone => (
                <tr key={zone.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#081C15]">{zone.name}</td>
                  <td className="py-3 px-4 text-gray-600">{zone.capacity} seats</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1B4332] rounded-full" style={{ width: `${(zone.booked / zone.capacity) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{zone.booked}/{zone.capacity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#081C15]">₹{zone.price}</td>
                  <td className="py-3 px-4 font-semibold text-[#D4AF37]">{zone.totalRevenue}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleZone(zone.id)} className="flex items-center gap-1.5 text-xs font-semibold transition-colors">
                      {zone.status
                        ? <><ToggleRight size={20} className="text-green-500" /><span className="text-green-600">Open</span></>
                        : <><ToggleLeft size={20} className="text-gray-400" /><span className="text-gray-400">Closed</span></>
                      }
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors"><Edit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pricing Config */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map(zone => (
            <div key={zone.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-[#081C15] text-sm">{zone.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${zone.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                  {zone.status ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Price per Seat (₹)</label>
                  <input
                    type="number"
                    defaultValue={zone.price}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#081C15] focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Max Capacity</label>
                  <input
                    type="number"
                    defaultValue={zone.capacity}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl btn-primary text-xs font-bold">Save Changes</button>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Reset</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#081C15] font-poppins mb-1 text-sm">Weekly Bookings</h3>
            <p className="text-xs text-gray-500 mb-4">Daily booking count this week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 11 }} />
                <Bar dataKey="bookings" fill="#1B4332" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#081C15] font-poppins mb-1 text-sm">Weekly Revenue</h3>
            <p className="text-xs text-gray-500 mb-4">Daily revenue in ₹ this week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 11 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#081C15] font-poppins mb-4 text-sm">Zone Performance Summary</h3>
            <table className="w-full text-xs">
              <thead className="border-b border-gray-100">
                <tr>
                  {['Zone', 'Bookings', 'Occupancy', 'Revenue', 'Trend'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-gray-500 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zones.map(z => (
                  <tr key={z.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#081C15]">{z.name}</td>
                    <td className="py-2.5 px-3 text-gray-600">{z.booked}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                          <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${Math.round((z.booked / z.capacity) * 100)}%` }} />
                        </div>
                        <span className="text-gray-600">{Math.round((z.booked / z.capacity) * 100)}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#D4AF37]">{z.totalRevenue}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${z.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {z.status ? '↑ Active' : '— Paused'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
