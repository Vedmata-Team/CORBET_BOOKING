'use client'

import AppLayout from '@/components/AppLayout'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { Users, TrendingUp, MapPin, IndianRupee, ArrowUpRight, ArrowDownRight, Calendar, Star, Activity } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 182000, bookings: 32 },
  { month: 'Feb', revenue: 210000, bookings: 41 },
  { month: 'Mar', revenue: 198000, bookings: 38 },
  { month: 'Apr', revenue: 265000, bookings: 52 },
  { month: 'May', revenue: 310000, bookings: 61 },
  { month: 'Jun', revenue: 289000, bookings: 55 },
  { month: 'Jul', revenue: 342000, bookings: 68 },
  { month: 'Aug', revenue: 380000, bookings: 74 },
]

const zoneData = [
  { name: 'Bijrani', value: 35, color: '#1B4332' },
  { name: 'Dhikala', value: 28, color: '#D4AF37' },
  { name: 'Jhirna', value: 20, color: '#6B4F2A' },
  { name: 'Gairal', value: 17, color: '#2D6A4F' },
]

const recentBookings = [
  { id: 'WE-2024', name: 'Aryan Mehta', zone: 'Bijrani', date: '28 Mar 2026', guests: 4, status: 'confirmed', amount: '₹12,400' },
  { id: 'WE-2023', name: 'Priya Sharma', zone: 'Dhikala', date: '27 Mar 2026', guests: 2, status: 'confirmed', amount: '₹8,200' },
  { id: 'WE-2022', name: 'Vikram Rao', zone: 'Jhirna', date: '26 Mar 2026', guests: 6, status: 'pending', amount: '₹18,600' },
  { id: 'WE-2021', name: 'Kavita Singh', zone: 'Bijrani', date: '25 Mar 2026', guests: 3, status: 'confirmed', amount: '₹9,300' },
  { id: 'WE-2020', name: 'Sanjay Patel', zone: 'Gairal', date: '24 Mar 2026', guests: 2, status: 'cancelled', amount: '₹6,800' },
]

const stats = [
  { label: 'Total Bookings', value: '1,284', change: '+12.5%', up: true, icon: Calendar, color: '#1B4332', bg: 'bg-[#1B4332]/10' },
  { label: 'Total Revenue', value: '₹38.2L', change: '+18.3%', up: true, icon: IndianRupee, color: '#D4AF37', bg: 'bg-[#D4AF37]/15' },
  { label: 'Active Visitors', value: '342', change: '+8.7%', up: true, icon: Users, color: '#2D6A4F', bg: 'bg-[#2D6A4F]/10' },
  { label: 'Active Zones', value: '8 / 12', change: '-1 zone', up: false, icon: MapPin, color: '#FF8C42', bg: 'bg-[#FF8C42]/10' },
]

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard" subtitle="Overview of safari operations — March 2026">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.up ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-bold text-[#081C15] font-poppins">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#081C15] font-poppins">Revenue Overview</h3>
              <p className="text-xs text-gray-500">Monthly revenue & booking trends</p>
            </div>
            <div className="flex items-center gap-2 bg-[#1B4332]/10 rounded-xl px-3 py-1.5">
              <Activity size={13} className="text-[#1B4332]" />
              <span className="text-xs font-semibold text-[#1B4332]">2026</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4332" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B4332" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#1B4332" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Zone Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#081C15] font-poppins mb-1">Zone Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Bookings by safari zone</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={zoneData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {zoneData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 11 }} formatter={(v: number) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {zoneData.map((z, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: z.color }} />
                  <span className="text-gray-600">{z.name}</span>
                </div>
                <span className="font-semibold text-[#081C15]">{z.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Bookings Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#081C15] font-poppins mb-1">Monthly Bookings</h3>
          <p className="text-xs text-gray-500 mb-4">Total bookings count per month</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 11 }} />
              <Bar dataKey="bookings" fill="#D4AF37" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#081C15] font-poppins">Recent Bookings</h3>
            <a href="/bookings" className="text-xs text-[#1B4332] hover:text-[#D4AF37] font-semibold flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold">ID</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold">Guest</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold hidden sm:table-cell">Zone</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold hidden md:table-cell">Date</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold">Amount</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-2 font-mono text-gray-500">{b.id}</td>
                    <td className="py-2.5 px-2 font-medium text-[#081C15]">{b.name}</td>
                    <td className="py-2.5 px-2 text-gray-600 hidden sm:table-cell">{b.zone}</td>
                    <td className="py-2.5 px-2 text-gray-500 hidden md:table-cell">{b.date}</td>
                    <td className="py-2.5 px-2 font-semibold text-[#081C15]">{b.amount}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'New Safari Booking', href: '/safari', color: '#1B4332', emoji: '🐅' },
          { label: 'Book a Hotel', href: '/hotels', color: '#6B4F2A', emoji: '🏨' },
          { label: 'Manage Bookings', href: '/bookings', color: '#D4AF37', emoji: '📋' },
          { label: 'Contact Support', href: '/chat', color: '#2D6A4F', emoji: '💬' },
        ].map((a, i) => (
          <a
            key={i}
            href={a.href}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-hover flex flex-col items-center text-center gap-2 group"
          >
            <span className="text-2xl">{a.emoji}</span>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#1B4332] transition-colors">{a.label}</span>
          </a>
        ))}
      </div>
    </AppLayout>
  )
}
