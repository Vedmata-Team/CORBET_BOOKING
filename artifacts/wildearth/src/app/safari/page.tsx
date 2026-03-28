'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { MapPin, Users, Calendar, Clock, ChevronRight, Check, Leaf, Info, AlertCircle } from 'lucide-react'

const zones = [
  {
    id: 'bijrani',
    name: 'Bijrani Zone',
    description: 'Dense sal forests, best for tiger sightings. Most popular zone with diverse wildlife.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80',
    price: 3100,
    rating: 4.8,
    tags: ['Tigers', 'Elephants', 'Leopards'],
    available: true,
    color: '#1B4332',
  },
  {
    id: 'dhikala',
    name: 'Dhikala Zone',
    description: 'Vast grasslands on Ramganga riverbank. Ideal for birding and deer sightings.',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80',
    price: 2800,
    rating: 4.6,
    tags: ['Birds', 'Deer', 'Crocodiles'],
    available: true,
    color: '#2D6A4F',
  },
  {
    id: 'jhirna',
    name: 'Jhirna Zone',
    description: 'Year-round open zone with mixed forest. Excellent for sloth bears and leopards.',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&q=80',
    price: 2500,
    rating: 4.5,
    tags: ['Sloth Bears', 'Leopards', 'Wild Boar'],
    available: true,
    color: '#6B4F2A',
  },
  {
    id: 'gairal',
    name: 'Gairal Zone',
    description: 'Scenic riverside zone with excellent photography opportunities.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80',
    price: 2200,
    rating: 4.3,
    tags: ['Photography', 'Birds', 'Fish'],
    available: false,
    color: '#D4AF37',
  },
]

const slots = ['Morning (6:00 AM – 9:30 AM)', 'Evening (3:00 PM – 6:30 PM)']

export default function SafariPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [guests, setGuests] = useState(2)
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<null | boolean>(null)
  const [booked, setBooked] = useState(false)

  const handleCheck = async () => {
    if (!selectedZone || !date || !slot) return
    setChecking(true)
    setAvailable(null)
    await new Promise(r => setTimeout(r, 1200))
    setAvailable(Math.random() > 0.3)
    setChecking(false)
  }

  const handleBook = async () => {
    setChecking(true)
    await new Promise(r => setTimeout(r, 800))
    setBooked(true)
    setChecking(false)
  }

  const selectedZoneData = zones.find(z => z.id === selectedZone)

  if (booked) {
    return (
      <AppLayout title="Safari Booking" subtitle="Book your jungle experience">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-3xl p-10 shadow-lg text-center max-w-md w-full border border-green-100">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <Check size={36} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#081C15] font-poppins mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-1">Your safari adventure is booked.</p>
            <div className="bg-gray-50 rounded-xl p-4 my-5 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Booking ID</span><span className="font-bold font-mono text-[#1B4332]">WE-{Date.now().toString().slice(-4)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Zone</span><span className="font-semibold">{selectedZoneData?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Slot</span><span className="font-semibold">{slot.split(' ')[0]}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Guests</span><span className="font-semibold">{guests}</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-gray-500 font-semibold">Total</span><span className="font-bold text-[#D4AF37] text-lg">₹{(((selectedZoneData?.price || 0)) * guests).toLocaleString()}</span></div>
            </div>
            <button onClick={() => { setBooked(false); setSelectedZone(null); setDate(''); setSlot(''); setAvailable(null) }} className="btn-primary w-full py-3 rounded-xl text-sm font-bold">
              Book Another Safari
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Safari Booking" subtitle="Select your zone and book a jungle experience">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-[#081C15] mb-3 flex items-center gap-2">
            <MapPin size={15} className="text-[#1B4332]" />
            Select Safari Zone
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {zones.map(zone => (
              <div
                key={zone.id}
                onClick={() => zone.available && setSelectedZone(zone.id)}
                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  zone.available ? 'cursor-pointer card-hover' : 'opacity-50 cursor-not-allowed'
                } ${selectedZone === zone.id ? 'border-[#1B4332] shadow-lg' : 'border-gray-100'}`}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={zone.image} alt={zone.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {!zone.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Closed Today</span>
                    </div>
                  )}
                  {selectedZone === zone.id && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <Check size={14} className="text-[#081C15]" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-2 py-0.5">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-white text-xs font-semibold">{zone.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[#081C15] text-sm font-poppins">{zone.name}</h3>
                    <span className="text-[#1B4332] font-bold text-sm">₹{zone.price}<span className="text-gray-400 font-normal text-xs">/seat</span></span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{zone.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {zone.tags.map(t => (
                      <span key={t} className="text-[10px] bg-[#1B4332]/10 text-[#1B4332] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Leaf size={8} />{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-[#081C15] mb-4 flex items-center gap-2">
              <Calendar size={15} className="text-[#1B4332]" />
              Booking Details
            </h2>

            <div className="space-y-3">
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Safari Date</label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 transition-all"
                />
              </div>

              {/* Slot */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Safari Slot</label>
                <div className="space-y-2">
                  {slots.map(s => (
                    <label key={s} className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${slot === s ? 'border-[#1B4332] bg-[#1B4332]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="slot" value={s} checked={slot === s} onChange={() => setSlot(s)} className="accent-[#1B4332]" />
                      <div className="flex items-center gap-2 text-xs">
                        <Clock size={12} className="text-[#1B4332]" />
                        <span className="font-medium text-gray-700">{s}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Number of Guests</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors text-lg">−</button>
                  <div className="flex-1 text-center py-2 bg-gray-50 rounded-xl text-sm font-bold text-[#081C15]">{guests} <span className="text-xs font-normal text-gray-500">guests</span></div>
                  <button onClick={() => setGuests(Math.min(6, guests + 1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors text-lg">+</button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Info size={9} /> Max 6 guests per vehicle</p>
              </div>

              <button
                onClick={handleCheck}
                disabled={!selectedZone || !date || !slot || checking}
                className="w-full btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Checking...</>
                ) : (
                  <><MapPin size={15} />Check Availability</>
                )}
              </button>
            </div>
          </div>

          {/* Availability Result */}
          {available !== null && (
            <div className={`rounded-2xl p-4 border ${available ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-fadeIn`}>
              <div className={`flex items-center gap-2 text-sm font-bold mb-1 ${available ? 'text-green-700' : 'text-red-600'}`}>
                {available ? <Check size={16} /> : <AlertCircle size={16} />}
                {available ? 'Slots Available!' : 'No Slots Available'}
              </div>
              <p className="text-xs text-gray-500">
                {available
                  ? `${Math.floor(Math.random() * 3) + 1} seats remaining for your selected slot.`
                  : 'All slots are booked. Try a different date or zone.'}
              </p>
              {available && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-gray-600">Subtotal ({guests} guests)</span>
                    <span className="font-bold text-[#081C15]">₹{((selectedZoneData?.price || 0) * guests).toLocaleString()}</span>
                  </div>
                  <button onClick={handleBook} disabled={checking} className="w-full btn-gold py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                    {checking ? <div className="w-4 h-4 border-2 border-[#081C15]/30 border-t-[#081C15] rounded-full animate-spin" /> : <><Check size={14} />Confirm Booking</>}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
