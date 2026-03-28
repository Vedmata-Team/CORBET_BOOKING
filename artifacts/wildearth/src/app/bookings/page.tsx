'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { Search, Filter, Download, Eye, X, Check, Clock, Calendar } from 'lucide-react'

const allBookings = [
  { id: 'WE-2024', name: 'Aryan Mehta', zone: 'Bijrani', type: 'Safari', date: '28 Mar 2026', guests: 4, status: 'confirmed', amount: '₹12,400', phone: '+91 98765 43210' },
  { id: 'WE-2023', name: 'Priya Sharma', zone: 'Dhikala', type: 'Safari', date: '27 Mar 2026', guests: 2, status: 'confirmed', amount: '₹8,200', phone: '+91 87654 32109' },
  { id: 'WE-2022', name: 'Vikram Rao', zone: 'Jhirna', type: 'Safari', date: '26 Mar 2026', guests: 6, status: 'pending', amount: '₹18,600', phone: '+91 76543 21098' },
  { id: 'WE-2021', name: 'Kavita Singh', zone: 'Bijrani', type: 'Hotel', date: '25 Mar 2026', guests: 3, status: 'confirmed', amount: '₹9,300', phone: '+91 65432 10987' },
  { id: 'WE-2020', name: 'Sanjay Patel', zone: 'Gairal', type: 'Safari', date: '24 Mar 2026', guests: 2, status: 'cancelled', amount: '₹6,800', phone: '+91 54321 09876' },
  { id: 'WE-2019', name: 'Meena Gupta', zone: 'Bijrani', type: 'Hotel', date: '22 Mar 2026', guests: 5, status: 'confirmed', amount: '₹21,000', phone: '+91 43210 98765' },
  { id: 'WE-2018', name: 'Rajesh Kumar', zone: 'Dhikala', type: 'Safari', date: '20 Mar 2026', guests: 4, status: 'pending', amount: '₹11,200', phone: '+91 32109 87654' },
  { id: 'WE-2017', name: 'Anita Bose', zone: 'Jhirna', type: 'Hotel', date: '18 Mar 2026', guests: 2, status: 'confirmed', amount: '₹6,400', phone: '+91 21098 76543' },
  { id: 'WE-2016', name: 'Deepak Nair', zone: 'Gairal', type: 'Safari', date: '15 Mar 2026', guests: 3, status: 'cancelled', amount: '₹9,300', phone: '+91 10987 65432' },
  { id: 'WE-2015', name: 'Pooja Verma', zone: 'Bijrani', type: 'Safari', date: '12 Mar 2026', guests: 4, status: 'confirmed', amount: '₹12,400', phone: '+91 09876 54321' },
]

type Status = 'all' | 'confirmed' | 'pending' | 'cancelled'

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  confirmed: { label: 'Confirmed', color: 'text-green-700', bg: 'bg-green-100', icon: Check },
  pending: { label: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: Clock },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-100', icon: X },
}

export default function BookingsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status>('all')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedBooking, setSelectedBooking] = useState<typeof allBookings[0] | null>(null)

  const filtered = allBookings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.zone.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    const matchType = typeFilter === 'All' || b.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const counts = {
    all: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    pending: allBookings.filter(b => b.status === 'pending').length,
    cancelled: allBookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <AppLayout title="Booking Management" subtitle="Manage and track all safari & hotel bookings">
      {/* Summary Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['all', 'confirmed', 'pending', 'cancelled'] as Status[]).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === s ? 'bg-[#1B4332] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'
            }`}
          >
            <span className="capitalize">{s === 'all' ? 'All Bookings' : s}</span>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              statusFilter === s ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or zone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none text-gray-600 w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Filter size={13} className="text-gray-400" />
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-transparent text-xs outline-none text-gray-600 cursor-pointer">
                <option value="All">All Types</option>
                <option value="Safari">Safari</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-semibold hover:bg-[#2D6A4F] transition-colors">
              <Download size={13} />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Booking ID', 'Guest Name', 'Zone', 'Type', 'Date', 'Guests', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, i) => {
                const sc = statusConfig[booking.status]
                const StatusIcon = sc.icon
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-[#1B4332]/5 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-gray-500 whitespace-nowrap">{booking.id}</td>
                    <td className="py-3 px-4 font-semibold text-[#081C15] whitespace-nowrap">{booking.name}</td>
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{booking.zone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${booking.type === 'Safari' ? 'bg-[#1B4332]/10 text-[#1B4332]' : 'bg-[#6B4F2A]/10 text-[#6B4F2A]'}`}>
                        {booking.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">{booking.date}</td>
                    <td className="py-3 px-4 text-gray-600 text-center">{booking.guests}</td>
                    <td className="py-3 px-4 font-semibold text-[#081C15] whitespace-nowrap">{booking.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.color}`}>
                        <StatusIcon size={9} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => setSelectedBooking(booking)} className="p-1.5 rounded-lg hover:bg-[#1B4332]/10 text-[#1B4332] transition-colors">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center text-gray-400 text-sm">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination hint */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {allBookings.length} bookings</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${p === 1 ? 'bg-[#1B4332] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[#081C15] font-poppins">Booking Details</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedBooking.id}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ['Guest Name', selectedBooking.name],
                ['Phone', selectedBooking.phone],
                ['Zone', selectedBooking.zone],
                ['Booking Type', selectedBooking.type],
                ['Date', selectedBooking.date],
                ['Guests', `${selectedBooking.guests} persons`],
                ['Total Amount', selectedBooking.amount],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-[#081C15]">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${statusConfig[selectedBooking.status].bg} ${statusConfig[selectedBooking.status].color}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <Download size={13} />Download Ticket
              </button>
              <button onClick={() => setSelectedBooking(null)} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
