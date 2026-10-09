import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../common/ToastContainer';
import { SpotlightSearchModal } from '../common/SpotlightSearchModal';
import { AmbientBackground } from '../common/AmbientBackground';
import { motion, AnimatePresence } from 'motion/react';

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 antialiased">
      {/* Framer Motion Ambient Background with Floating Orbs & Grid */}
      <AmbientBackground />

      {/* Sidebar (Desktop and Mobile) */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Scrollable Page Viewport with Page Transitions */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Interactive Modals and Toasts */}
      <SpotlightSearchModal />
      <ToastContainer />
    </div>
  );
};

