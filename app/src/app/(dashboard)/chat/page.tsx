'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Clock, 
  CheckCheck,
  Zap,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';

const contacts = [
  { id: 1, name: 'Rahul Sharma', lastMsg: 'Is Dhikala open?', time: '10:45 AM', status: 'online', unread: 2 },
  { id: 2, name: 'Anjali Gupta', lastMsg: 'Thanks!', time: 'Yesterday', status: 'offline', unread: 0 },
  { id: 3, name: 'WildEarth Support', lastMsg: 'Update at midnight.', time: 'Mar 25', status: 'online', unread: 0 },
];

const initialMessages = [
  { id: 1, text: 'Hello, I want to book a safari for 4 people.', sender: 'user', time: '10:30 AM' },
  { id: 2, text: 'Sure! Which zone?', sender: 'admin', time: '10:32 AM' },
  { id: 3, text: 'Is the Dhikala zone open?', sender: 'user', time: '10:45 AM' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [showChat, setShowChat] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      text: inputText,
      sender: 'admin',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-[2.5rem] border border-primary/10 overflow-hidden shadow-2xl shadow-primary/5 min-h-[600px]">
      {/* Contact List */}
      {!showChat ? (
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-dark tracking-tight">Comms <span className="text-primary italic">Hub</span></h2>
              <div className="p-2 bg-primary/10 rounded-xl text-primary font-bold text-xs">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-11 pr-4 py-3 bg-offwhite border-none rounded-2xl outline-none text-xs font-bold shadow-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => { setActiveContact(contact); setShowChat(true); }}
                className="w-full p-4 rounded-3xl text-left flex items-center gap-4 bg-offwhite active:bg-primary/5 transition-all"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white border border-primary/5 flex items-center justify-center font-black text-primary">
                    {contact.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  {contact.status === 'online' && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black truncate">{contact.name}</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">{contact.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5 truncate">{contact.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="h-20 px-4 border-b border-gray-100 flex items-center justify-between shrink-0 sticky top-0 bg-white/80 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowChat(false)} className="p-2 bg-offwhite rounded-xl"><ChevronLeft className="w-5 h-5" /></button>
              <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center font-black text-xs">
                {activeContact.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-black text-dark truncate max-w-[100px]">{activeContact.name}</h3>
                <span className="text-[8px] font-black text-green-500 uppercase flex items-center gap-1">
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-gray-400"><Phone className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400"><Video className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/10">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn("flex flex-col max-w-[85%]", msg.sender === 'admin' ? "ml-auto items-end" : "items-start")}
              >
                <div className={cn(
                  "p-4 rounded-2xl text-xs font-bold leading-relaxed shadow-sm",
                  msg.sender === 'admin' ? "bg-primary text-white rounded-tr-none shadow-primary/10" : "bg-white text-dark border border-gray-100 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[8px] font-black text-gray-300 mt-1 uppercase tracking-tighter px-1">{msg.time}</span>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-gray-100 shrink-0 bg-white">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button type="button" className="p-3 bg-offwhite rounded-xl text-gray-400"><Paperclip className="w-5 h-5" /></button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-offwhite rounded-xl py-3 px-4 outline-none text-xs font-bold border border-transparent focus:border-primary/10"
              />
              <button type="submit" className="w-12 h-12 bg-primary text-gold rounded-xl flex items-center justify-center shadow-lg active:scale-95"><Send className="w-5 h-5 rotate-[-15deg]" /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;
}
