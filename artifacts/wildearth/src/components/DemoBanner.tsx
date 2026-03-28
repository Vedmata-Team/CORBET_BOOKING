'use client'

export default function DemoBanner() {
  const items = [
    '🌿 WildEarth Pro — Application Interface (Phase 1 UI Ready)',
    '🐅 Safari Booking System — Live Interface Preview',
    '🏨 Hotel & Resort Management Module Active',
    '📊 Analytics Dashboard — Demo Data Loaded',
    '🎟️ Booking Management — Full UI Ready',
    '💬 Customer Chat Module — Interface Preview',
    '⚙️ Admin Panel — Management Interface Ready',
    '🌿 WildEarth Pro — Application Interface (Phase 1 UI Ready)',
    '🐅 Safari Booking System — Live Interface Preview',
    '🏨 Hotel & Resort Management Module Active',
    '📊 Analytics Dashboard — Demo Data Loaded',
    '🎟️ Booking Management — Full UI Ready',
    '💬 Customer Chat Module — Interface Preview',
    '⚙️ Admin Panel — Management Interface Ready',
  ]

  return (
    <div className="relative overflow-hidden bg-[#D4AF37] text-[#081C15] py-1.5 z-50">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-semibold px-8">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}
