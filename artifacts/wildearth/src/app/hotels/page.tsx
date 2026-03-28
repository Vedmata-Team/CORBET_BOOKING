'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { Star, Wifi, Utensils, Car, Trees, Check, X, ChevronRight } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: 'Corbett Wilderness Lodge',
    location: 'Near Bijrani Gate, Jim Corbett',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&q=80',
    rating: 4.9,
    reviews: 328,
    pricePerNight: 8500,
    category: 'Luxury',
    amenities: ['Wifi', 'Restaurant', 'Parking', 'Forest View'],
    rooms: ['Jungle Suite', 'Deluxe Room', 'Family Cottage'],
    available: true,
    tag: 'Most Popular',
    tagColor: '#D4AF37',
  },
  {
    id: 2,
    name: 'Dhikala Forest Rest House',
    location: 'Dhikala Zone, Core Area',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80',
    rating: 4.7,
    reviews: 215,
    pricePerNight: 4200,
    category: 'Government',
    amenities: ['Restaurant', 'Forest View'],
    rooms: ['Standard Room', 'Dormitory'],
    available: true,
    tag: 'Budget Pick',
    tagColor: '#2D6A4F',
  },
  {
    id: 3,
    name: 'Tiger Haven Resort',
    location: 'Ramnagar, Buffer Zone',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80',
    rating: 4.5,
    reviews: 412,
    pricePerNight: 12000,
    category: 'Premium',
    amenities: ['Wifi', 'Restaurant', 'Parking', 'Pool', 'Spa'],
    rooms: ['Pool Villa', 'Premium Suite', 'Garden Room'],
    available: true,
    tag: 'Best Rated',
    tagColor: '#FF8C42',
  },
  {
    id: 4,
    name: 'Jungle Eco Camp',
    location: 'Buffer Zone, Nature Trail',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80',
    rating: 4.3,
    reviews: 178,
    pricePerNight: 3200,
    category: 'Eco',
    amenities: ['Restaurant', 'Parking', 'Forest View'],
    rooms: ['Tent Cabin', 'Eco Room'],
    available: false,
    tag: 'Eco Stay',
    tagColor: '#1B4332',
  },
]

const amenityIcons: Record<string, React.ElementType> = {
  'Wifi': Wifi,
  'Restaurant': Utensils,
  'Parking': Car,
  'Forest View': Trees,
  'Pool': Star,
  'Spa': Star,
}

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [nights, setNights] = useState(2)
  const [booked, setBooked] = useState(false)
  const [booking, setBooking] = useState(false)
  const [filter, setFilter] = useState('All')

  const hotel = hotels.find(h => h.id === selectedHotel)

  const handleBook = async () => {
    setBooking(true)
    await new Promise(r => setTimeout(r, 900))
    setBooked(true)
    setBooking(false)
  }

  const categories = ['All', 'Luxury', 'Premium', 'Government', 'Eco']
  const filtered = filter === 'All' ? hotels : hotels.filter(h => h.category === filter)

  if (booked && hotel) {
    return (
      <AppLayout title="Hotel Booking" subtitle="Nature stay reservations">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-3xl p-10 shadow-lg text-center max-w-md w-full">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <Check size={36} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#081C15] font-poppins mb-2">Room Reserved!</h2>
            <div className="bg-gray-50 rounded-xl p-4 my-5 text-left text-sm space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Hotel</span><span className="font-semibold">{hotel.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Room</span><span className="font-semibold">{selectedRoom}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Check-in</span><span className="font-semibold">{checkIn}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Check-out</span><span className="font-semibold">{checkOut}</span></div>
              <div className="flex justify-between pt-2 border-t"><span className="font-semibold">Total</span><span className="font-bold text-[#D4AF37] text-lg">₹{(hotel.pricePerNight * nights).toLocaleString()}</span></div>
            </div>
            <button onClick={() => { setBooked(false); setSelectedHotel(null); setSelectedRoom('') }} className="btn-primary w-full py-3 rounded-xl text-sm font-bold">
              Book Another Hotel
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Hotel Booking" subtitle="Luxury and budget stays near wildlife reserves">
      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === c ? 'bg-[#1B4332] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hotel Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(h => (
            <div
              key={h.id}
              onClick={() => h.available && setSelectedHotel(h.id)}
              className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                h.available ? 'cursor-pointer card-hover' : 'opacity-60 cursor-not-allowed'
              } ${selectedHotel === h.id ? 'border-[#1B4332] shadow-lg' : 'border-gray-100'}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{background: h.tagColor}}>{h.tag}</span>
                </div>
                {!h.available && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-red-500 text-white">Fully Booked</span>
                  </div>
                )}
                {selectedHotel === h.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <Check size={12} className="text-[#081C15]" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur rounded-full px-2 py-0.5">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{h.rating}</span>
                  <span className="text-white/70 text-[10px]">({h.reviews})</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-[#081C15] text-sm font-poppins leading-tight">{h.name}</h3>
                </div>
                <p className="text-[10px] text-gray-500 mb-2">{h.location}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {h.amenities.slice(0, 3).map(a => {
                    const Icon = amenityIcons[a] || Star
                    return (
                      <span key={a} className="flex items-center gap-1 text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        <Icon size={8} /> {a}
                      </span>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#1B4332]">₹{h.pricePerNight.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">/night</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{background: `${h.tagColor}20`, color: h.tagColor}}>{h.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Sidebar */}
        <div>
          {selectedHotel && hotel ? (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-[#081C15] text-sm">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span>{hotel.rating} · {hotel.reviews} reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Room Type</label>
                  <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 bg-gray-50">
                    <option value="">Choose a room...</option>
                    {hotel.rooms.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Check-in</label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#1B4332] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Check-out</label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#1B4332] focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nights</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition-colors">−</button>
                    <div className="flex-1 text-center py-2 bg-gray-50 rounded-xl text-sm font-bold text-[#081C15]">{nights} nights</div>
                    <button onClick={() => setNights(Math.min(30, nights + 1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition-colors">+</button>
                  </div>
                </div>

                <div className="bg-[#1B4332]/5 rounded-xl p-3 text-sm">
                  <div className="flex justify-between mb-1"><span className="text-gray-600 text-xs">₹{hotel.pricePerNight.toLocaleString()} × {nights} nights</span><span className="font-semibold">₹{(hotel.pricePerNight * nights).toLocaleString()}</span></div>
                  <div className="flex justify-between mb-1 text-xs"><span className="text-gray-500">Taxes & fees</span><span className="text-gray-500">₹{Math.round(hotel.pricePerNight * nights * 0.12).toLocaleString()}</span></div>
                  <div className="flex justify-between pt-2 border-t border-[#1B4332]/10 font-bold"><span>Total</span><span className="text-[#D4AF37] text-base">₹{Math.round(hotel.pricePerNight * nights * 1.12).toLocaleString()}</span></div>
                </div>

                <button
                  onClick={handleBook}
                  disabled={!selectedRoom || !checkIn || !checkOut || booking}
                  className="w-full btn-gold py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {booking ? <div className="w-4 h-4 border-2 border-[#081C15]/30 border-t-[#081C15] rounded-full animate-spin" /> : <><Check size={15} />Book Now</>}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-3">🏨</div>
              <h3 className="font-bold text-[#081C15] mb-1">Select a Hotel</h3>
              <p className="text-xs text-gray-500">Click on a hotel card to see availability and booking options.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
