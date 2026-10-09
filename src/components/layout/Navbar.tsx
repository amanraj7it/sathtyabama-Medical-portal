import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  UserCheck,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Thermometer,
  ScanLine,
  Siren,
  LogIn
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { ColdChainModal } from '../common/ColdChainModal';
import { BarcodeScannerModal } from '../common/BarcodeScannerModal';
import { EmergencyKitModal } from '../common/EmergencyKitModal';

import { SathyabamaEmblem } from '../common/SathyabamaEmblem';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const {
    isDarkMode,
    toggleDarkMode,
    currentUser,
    users,
    switchUser,
    alerts,
    setIsSearchOpen,
    resetToMockData,
  } = useApp();

  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Modals
  const [isColdChainOpen, setIsColdChainOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEmergencyKitOpen, setIsEmergencyKitOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = alerts.filter((a) => !a.reviewed);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-5">
        {/* Left Corner: Mobile Menu + Emblem + Exact Written Institutional Details */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Left Corner Brand Lockup: Clean UI with exact logo and text */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <SathyabamaEmblem size="md" />
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                  SATHYABAMA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/60 leading-none">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
                  </span>
                  <span>Hospital Medicine System</span>
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 truncate">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate leading-tight">
                  INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
                <span className="hidden md:inline text-[9.5px] font-medium text-slate-400 dark:text-slate-500 shrink-0">
                  (DEEMED TO BE UNIVERSITY)
                </span>
                <span className="hidden xl:inline text-slate-300 dark:text-slate-600 shrink-0">·</span>
                <span className="hidden xl:inline px-1.5 py-0.5 rounded bg-[#70092B] text-white text-[8.5px] font-black uppercase tracking-wider shadow-2xs border border-[#8B1038] shrink-0">
                  CATEGORY - 1 UNIVERSITY BY UGC
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0 mx-1" />

          {/* Global Search Clickable Field */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex group items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:border-teal-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all text-xs w-32 sm:w-40 lg:w-56 text-left shadow-2xs shrink-0"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0" />
            <span className="truncate">Search medicines...</span>
            <kbd className="hidden lg:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Cold-Chain IoT Sensor Trigger */}
          <button
            onClick={() => setIsColdChainOpen(true)}
            title="Cold-Chain & Refrigerator IoT Sensor Hub"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 hover:bg-teal-100/80 transition-colors shadow-2xs"
          >
            <Thermometer className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span className="tabular-nums font-bold">3.8°C</span>
            <span className="hidden md:inline text-[11px] text-teal-600 dark:text-teal-400 font-normal">IoT Cold</span>
          </button>

          {/* Barcode Scanner Quick Launch */}
          <button
            onClick={() => setIsScannerOpen(true)}
            title="Scan Medicine Barcode / DataMatrix"
            className="p-2 rounded-xl text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Scan barcode"
          >
            <ScanLine className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Emergency Code Blue Quick Trigger */}
          <button
            onClick={() => setIsEmergencyKitOpen(true)}
            title="STAT Emergency Trauma & Code Blue Indent"
            className="p-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors relative"
            aria-label="Emergency trauma kits"
          >
            <Siren className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </button>

          {/* Reset Mock Data Quick Button */}
          <button
            onClick={resetToMockData}
            title="Reset to default mock dataset"
            className="hidden xl:flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Data</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="View inventory alerts"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Live Clinical Alerts
                    </span>
                    <Badge variant="danger" size="sm">
                      {unreadAlerts.length} unreviewed
                    </Badge>
                  </div>
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/alerts');
                    }}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    View All
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {unreadAlerts.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      All pharmacy alerts reviewed and resolved.
                    </div>
                  ) : (
                    unreadAlerts.slice(0, 4).map((alt) => (
                      <div
                        key={alt.id}
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          navigate('/alerts');
                        }}
                        className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              alt.severity === 'critical'
                                ? 'text-rose-500'
                                : 'text-amber-500'
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {alt.medicineName}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {alt.type === 'expiry'
                                ? `Expires on ${alt.expiryDate}`
                                : `Current stock: ${alt.currentStock} (Min: ${alt.threshold})`}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {alt.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/alerts');
                    }}
                    className="w-full py-1.5 text-xs font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800"
                  >
                    Manage All Assurance Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* High-Contrast Prominent Sign In & Role Portal Button */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/25 border-2 border-blue-400 shrink-0 cursor-pointer"
            title="Sign In or Register with your Role"
          >
            <LogIn className="w-4 h-4 text-white" />
            <span className="font-black tracking-wide">Sign In / Role</span>
          </button>

          {/* User Profile Avatar & Switch Role Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="relative">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>

              <div className="hidden md:block">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentUser.role}
                </p>
              </div>
              <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentUser.email}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="primary" size="sm">
                      {currentUser.role}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {currentUser.department}
                    </span>
                  </div>
                </div>

                {/* Fast Role Context Switcher for Demonstration */}
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Switch Role Persona:
                  </p>
                  <div className="space-y-0.5">
                    {users.slice(0, 5).map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                          currentUser.id === u.id
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="truncate">{u.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                          {u.role}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/users');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Roles & Access Matrix</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Modals opened from Navbar */}
      <ColdChainModal
        isOpen={isColdChainOpen}
        onClose={() => setIsColdChainOpen(false)}
      />
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
      <EmergencyKitModal
        isOpen={isEmergencyKitOpen}
        onClose={() => setIsEmergencyKitOpen(false)}
      />
    </>
  );
};
