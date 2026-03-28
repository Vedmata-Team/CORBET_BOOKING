'use client'

import { useState, useRef, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import { Send, Phone, Video, MoreVertical, TreePine, Smile, Paperclip, Check, CheckCheck } from 'lucide-react'

const conversations = [
  { id: 1, name: 'Aryan Mehta', avatar: 'AM', lastMsg: 'Can I change my safari date?', time: '2m', unread: 2, online: true },
  { id: 2, name: 'Priya Sharma', avatar: 'PS', lastMsg: 'Thank you for the booking!', time: '15m', unread: 0, online: true },
  { id: 3, name: 'Vikram Rao', avatar: 'VR', lastMsg: 'Is the morning slot available?', time: '1h', unread: 1, online: false },
  { id: 4, name: 'Kavita Singh', avatar: 'KS', lastMsg: 'What is the cancellation policy?', time: '2h', unread: 0, online: false },
  { id: 5, name: 'Sanjay Patel', avatar: 'SP', lastMsg: 'Refund status please', time: '1d', unread: 0, online: false },
]

type Msg = { id: number; text: string; sender: 'user' | 'admin'; time: string; read: boolean }

const initMessages: Msg[] = [
  { id: 1, text: 'Hello! I have a question about my safari booking.', sender: 'user', time: '10:30 AM', read: true },
  { id: 2, text: 'Hi Aryan! I\'m here to help. What\'s your query?', sender: 'admin', time: '10:31 AM', read: true },
  { id: 3, text: 'I booked Bijrani zone for 28th March. Can I change the date to 30th?', sender: 'user', time: '10:32 AM', read: true },
  { id: 4, text: 'Let me check the availability for March 30th in Bijrani zone for you.', sender: 'admin', time: '10:33 AM', read: true },
  { id: 5, text: 'Good news! The 30th March morning slot in Bijrani is available. I can reschedule your booking at no extra cost.', sender: 'admin', time: '10:34 AM', read: true },
  { id: 6, text: 'That\'s great! Please go ahead and change it.', sender: 'user', time: '10:35 AM', read: true },
  { id: 7, text: 'Your booking WE-2024 has been rescheduled to 30 March 2026 (Morning). You\'ll receive a confirmation SMS shortly.', sender: 'admin', time: '10:36 AM', read: true },
  { id: 8, text: 'Can I change my safari date?', sender: 'user', time: '11:42 AM', read: false },
]

const quickReplies = [
  'Checking availability...',
  'Your booking is confirmed!',
  'Please share your Booking ID.',
  'Refund will be processed in 5-7 days.',
]

export default function ChatPage() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0])
  const [messages, setMessages] = useState<Msg[]>(initMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return
    const newMsg: Msg = { id: Date.now(), text: msg, sender: 'admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: true }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const autoReplies = [
        'Got it, thank you!',
        'I understand. Let me check on this.',
        'Thank you for your quick response!',
        'That\'s very helpful, much appreciated.',
      ]
      const autoMsg: Msg = {
        id: Date.now() + 1,
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      }
      setMessages(prev => [...prev, autoMsg])
    }, 1500)
  }

  return (
    <AppLayout title="Support Chat" subtitle="Customer support and booking inquiries">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 200px)', minHeight: 500 }}>
        <div className="flex h-full">
          {/* Conversation List */}
          <div className="w-72 border-r border-gray-100 flex flex-col hidden md:flex">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search conversations..." className="bg-transparent text-xs outline-none text-gray-600 flex-1 placeholder:text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedConvo(c)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-gray-50 ${selectedConvo.id === c.id ? 'bg-[#1B4332]/5 border-l-2 border-l-[#1B4332]' : 'hover:bg-gray-50'}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white text-xs font-bold">{c.avatar}</div>
                    {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-[#081C15] truncate">{c.name}</span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{c.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-xs text-gray-500 truncate">{c.lastMsg}</span>
                      {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#081C15] text-[10px] font-bold flex items-center justify-center flex-shrink-0 ml-1">{c.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white text-xs font-bold">{selectedConvo.avatar}</div>
                  {selectedConvo.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#081C15]">{selectedConvo.name}</div>
                  <div className={`text-[10px] ${selectedConvo.online ? 'text-green-500' : 'text-gray-400'}`}>{selectedConvo.online ? '● Online' : '○ Offline'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"><Phone size={15} /></button>
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"><Video size={15} /></button>
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"><MoreVertical size={15} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{background: 'linear-gradient(180deg, #f0f4f0 0%, #f8faf8 100%)'}}>
              <div className="text-center text-[10px] text-gray-400 my-2">Today</div>
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#D8C3A5] flex items-center justify-center text-[10px] font-bold text-[#6B4F2A] mr-2 flex-shrink-0 self-end mb-1">{selectedConvo.avatar[0]}</div>
                  )}
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'admin'
                      ? 'bg-[#1B4332] text-white rounded-br-sm'
                      : 'bg-white text-[#212529] rounded-bl-sm border border-gray-100'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'admin' ? 'text-white/50' : 'text-gray-400'}`}>
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.sender === 'admin' && (msg.read ? <CheckCheck size={11} className="text-[#D4AF37]" /> : <Check size={11} />)}
                    </div>
                  </div>
                  {msg.sender === 'admin' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF8C42] flex items-center justify-center ml-2 flex-shrink-0 self-end mb-1">
                      <TreePine size={13} className="text-[#081C15]" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#D8C3A5] flex items-center justify-center text-[10px] font-bold text-[#6B4F2A] mr-2 self-end">{selectedConvo.avatar[0]}</div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
              {quickReplies.map(qr => (
                <button key={qr} onClick={() => sendMessage(qr)} className="flex-shrink-0 text-xs bg-[#1B4332]/10 text-[#1B4332] px-3 py-1.5 rounded-full hover:bg-[#1B4332]/20 transition-colors font-medium">
                  {qr}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"><Paperclip size={16} /></button>
                <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/20 transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
                  />
                  <button className="text-gray-400 hover:text-gray-600 transition-colors"><Smile size={16} /></button>
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center disabled:opacity-50 flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
