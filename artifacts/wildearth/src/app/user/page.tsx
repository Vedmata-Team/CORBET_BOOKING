'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { User, MapPin, Calendar, Download, Star, Edit2, Camera, Phone, Mail, Shield, TreePine, Award } from 'lucide-react'

const userBookings = [
  { id: 'WE-2024', type: 'Safari', zone: 'Bijrani Zone', date: '28 Mar 2026', status: 'upcoming', amount: '₹12,400', guests: 4 },
  { id: 'WE-2019', type: 'Hotel', zone: 'Corbett Lodge', date: '15 Mar 2026', status: 'completed', amount: '₹21,000', guests: 2 },
  { id: 'WE-2018', type: 'Safari', zone: 'Dhikala Zone', date: '01 Mar 2026', status: 'completed', amount: '₹11,200', guests: 4 },
  { id: 'WE-2015', type: 'Safari', zone: 'Jhirna Zone', date: '14 Feb 2026', status: 'completed', amount: '₹8,000', guests: 2 },
  { id: 'WE-2010', type: 'Hotel', zone: 'Tiger Haven', date: '26 Jan 2026', status: 'cancelled', amount: '₹36,000', guests: 3 },
]

const badges = [
  { icon: '🐅', label: 'Tiger Tracker', desc: '5+ Tiger Zone Visits', earned: true },
  { icon: '🌿', label: 'Eco Warrior', desc: 'Eco-friendly choices', earned: true },
  { icon: '🏆', label: 'Safari Pro', desc: '10+ Safari Bookings', earned: false },
  { icon: '⭐', label: 'Top Reviewer', desc: '5 Reviews Posted', earned: false },
]

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'badges'>('profile')
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('Rahul Kumar')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [email, setEmail] = useState('rahul.kumar@email.com')

  const totalSpent = userBookings.filter(b => b.status !== 'cancelled').reduce((acc, b) => {
    return acc + parseInt(b.amount.replace(/[^0-9]/g, ''))
  }, 0)

  return (
    <AppLayout title="User Panel" subtitle="Manage your profile and booking history">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cover */}
            <div className="h-24 relative" style={{background: 'linear-gradient(135deg, #081C15 0%, #1B4332 60%, #2D6A4F 100%)'}}>
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
            </div>

            {/* Avatar */}
            <div className="px-5 pb-5 -mt-10">
              <div className="flex items-end justify-between mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                    RK
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-md hover:brightness-110 transition-all">
                    <Camera size={12} className="text-[#081C15]" />
                  </button>
                </div>
                <button onClick={() => setEditMode(!editMode)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${editMode ? 'bg-[#D4AF37] text-[#081C15]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Edit2 size={11} />
                  {editMode ? 'Save' : 'Edit'}
                </button>
              </div>

              {editMode ? (
                <div className="space-y-2 mb-4">
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-bold text-[#081C15] focus:border-[#1B4332] focus:outline-none" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#1B4332] focus:outline-none" />
                  <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#1B4332] focus:outline-none" />
                </div>
              ) : (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#081C15] font-poppins">{name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                    <Phone size={11} />{phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-0.5">
                    <Mail size={11} />{email}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 mb-4">
                {[
                  { label: 'Safaris', value: userBookings.filter(b => b.type === 'Safari').length },
                  { label: 'Hotels', value: userBookings.filter(b => b.type === 'Hotel').length },
                  { label: 'Reviews', value: '3' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-[#1B4332]">{s.value}</div>
                    <div className="text-[10px] text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Member Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={12} className="text-[#1B4332]" />
                    <span>Membership</span>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full">Gold Member</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} className="text-[#1B4332]" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-xs font-semibold text-[#081C15]">Jan 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <TreePine size={12} className="text-[#1B4332]" />
                    <span>Total Spent</span>
                  </div>
                  <span className="text-xs font-bold text-[#1B4332]">₹{totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(['profile', 'history', 'badges'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${activeTab === tab ? 'bg-[#1B4332] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'}`}
              >
                {tab === 'history' ? 'Booking History' : tab}
              </button>
            ))}
          </div>

          {/* Profile Details */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-[#081C15] font-poppins text-sm">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: name, icon: User },
                  { label: 'Phone Number', value: phone, icon: Phone },
                  { label: 'Email Address', value: email, icon: Mail },
                  { label: 'Location', value: 'New Delhi, India', icon: MapPin },
                  { label: 'Account Type', value: 'Individual Traveler', icon: Shield },
                  { label: 'Preferred Zone', value: 'Bijrani Zone', icon: TreePine },
                ].map((field, i) => (
                  <div key={i} className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                      <field.icon size={11} />{field.label}
                    </label>
                    <div className="px-3 py-2.5 bg-gray-50 rounded-xl text-sm font-medium text-[#081C15] border border-gray-100">{field.value}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold">Update Profile</button>
            </div>
          )}

          {/* Booking History */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-[#081C15] font-poppins text-sm">Booking History</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {userBookings.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${b.type === 'Safari' ? 'bg-[#1B4332]/10' : 'bg-[#6B4F2A]/10'}`}>
                      {b.type === 'Safari' ? '🐅' : '🏨'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-[#081C15]">{b.zone}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${b.type === 'Safari' ? 'bg-[#1B4332]/10 text-[#1B4332]' : 'bg-[#6B4F2A]/10 text-[#6B4F2A]'}`}>{b.type}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <span className="font-mono">{b.id}</span>
                        <span className="flex items-center gap-1"><Calendar size={9} />{b.date}</span>
                        <span>{b.guests} guests</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-[#081C15]">{b.amount}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        b.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-500'
                      }`}>{b.status}</span>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-[#1B4332]/10 text-[#1B4332] transition-colors flex-shrink-0">
                      <Download size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${b.earned ? 'border-[#D4AF37]/40 bg-gradient-to-br from-white to-[#D4AF37]/5' : 'border-gray-100 opacity-60'}`}>
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h4 className={`font-bold text-sm mb-1 ${b.earned ? 'text-[#081C15]' : 'text-gray-400'}`}>{b.label}</h4>
                  <p className="text-xs text-gray-500 mb-3">{b.desc}</p>
                  {b.earned ? (
                    <div className="flex items-center gap-1.5 text-[#D4AF37]">
                      <Award size={13} />
                      <span className="text-xs font-bold">Earned!</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">Not yet earned</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
