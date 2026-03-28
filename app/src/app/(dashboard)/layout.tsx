'use client';

import React from 'react';
import TopNav from '@/components/TopNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Admin Specific Header */}
      <TopNav toggleSidebar={() => {}} />

      {/* App Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-10 relative flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Global Bottom Nav is handled at RootLayout level */}
    </div>
  );
}
