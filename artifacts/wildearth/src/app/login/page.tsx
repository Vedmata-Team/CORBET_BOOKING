'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TreePine, Eye, EyeOff, Leaf, Paw, Mountain } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@wildearth.com')
  const [password, setPassword] = useState('wildearth123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1000))
    if (email && password) {
      router.push('/dashboard')
    } else {
      setError('Please enter your credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #081C15 0%, #1B4332 50%, #2D6A4F 100%)'}}>
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 overflow-hidden bg-[#D4AF37] text-[#081C15] py-1.5 z-50">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-semibold px-8">
              🌿 WildEarth Pro — Application Interface (Phase 1 UI Ready)
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Leaf blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-10" style={{background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'}} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'}} />
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <Leaf size={300} className="text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-5">
          <Paw size={200} className="text-[#D4AF37]" />
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeIn">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#FF8C42] to-[#D4AF37] flex items-center justify-center mb-4 shadow-lg">
              <TreePine size={32} className="text-[#081C15]" />
            </div>
            <h1 className="text-2xl font-bold text-[#081C15] font-poppins">WildEarth Pro</h1>
            <p className="text-gray-500 text-sm mt-1">Safari Booking Management System</p>
            <div className="flex items-center gap-2 mt-3 bg-[#1B4332]/10 rounded-full px-4 py-1.5">
              <Mountain size={13} className="text-[#1B4332]" />
              <span className="text-xs font-semibold text-[#1B4332] tracking-wide uppercase">Secure Government Portal</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@wildearth.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 text-sm transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 text-sm transition-all bg-gray-50 focus:bg-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#1B4332]" defaultChecked />
                <span className="text-gray-600">Keep me signed in</span>
              </label>
              <a href="#" className="text-[#1B4332] hover:text-[#D4AF37] font-medium transition-colors">Forgot password?</a>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 rounded-xl font-bold text-[#081C15] text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#081C15]/30 border-t-[#081C15] rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <TreePine size={16} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-1">Demo Credentials</p>
            <p className="text-xs font-mono bg-gray-50 rounded-lg px-3 py-2 text-gray-600">
              admin@wildearth.com / wildearth123
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 WildEarth Pro. All rights reserved. · Phase 1 UI
        </p>
      </div>
    </div>
  )
}
