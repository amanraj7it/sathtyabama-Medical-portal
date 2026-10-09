import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  AlertTriangle,
  Truck,
  BarChart3,
  Users2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  X,
  LogIn
} from 'lucide-react';

import { SathyabamaEmblem } from '../common/SathyabamaEmblem';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { alerts, currentUser } = useApp();
  const location = useLocation();

  const unreviewedCount = alerts.filter((a) => !a.reviewed).length;

  const navItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      roles: ['Doctor', 'Pharmacist', 'Ward Staff', 'Admin', 'Procurement Manager', 'Audit Officer'],
    },
    {
      label: 'Inventory',
      path: '/inventory',
      icon: Boxes,
      roles: ['Pharmacist', 'Admin', 'Procurement Manager', 'Audit Officer'],
    },
    {
      label: 'Dispensing',
      path: '/dispensing',
      icon: ClipboardList,
      roles: ['Doctor', 'Pharmacist', 'Admin'],
    },
    {
      label: 'Alerts',
      path: '/alerts',
      icon: AlertTriangle,
      badge: unreviewedCount > 0 ? unreviewedCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
      roles: ['Pharmacist', 'Admin', 'Procurement Manager', 'Doctor', 'Audit Officer'],
    },
    {
      label: 'Suppliers & Orders',
      path: '/suppliers',
      icon: Truck,
      roles: ['Procurement Manager', 'Admin', 'Pharmacist'],
    },
    {
      label: 'Reports & Audit',
      path: '/reports',
      icon: BarChart3,
      roles: ['Admin', 'Audit Officer', 'Procurement Manager', 'Doctor', 'Pharmacist'],
    },
    {
      label: 'Users & Roles',
      path: '/users',
      icon: Users2,
      roles: ['Admin', 'Audit Officer'],
    },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between overflow-y-auto">
      {/* Brand Header: Logo at top, exact institutional details directly below the logo */}
      <div>
        <div className={`border-b-2 border-slate-300 dark:border-slate-700 transition-all ${isCollapsed ? 'py-3 px-2' : 'pt-3 pb-3 px-3.5'}`}>
          <div className="flex items-start justify-between">
            <NavLink
              to="/"
              onClick={onCloseMobile}
              className={`flex ${isCollapsed ? 'items-center justify-center w-full' : 'flex-col items-start gap-1.5'} group select-none`}
            >
              <SathyabamaEmblem size={isCollapsed ? 'sm' : 'md'} />
              {!isCollapsed && (
                <div className="flex flex-col text-left">
                  {/* SATHYABAMA (bold primary heading) */}
                  <span className="text-sm font-black tracking-wider text-slate-950 dark:text-white uppercase leading-none mt-1">
                    SATHYABAMA
                  </span>

                  {/* Teal divider accent */}
                  <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 my-1 rounded-full" />

                  {/* INSTITUTE OF SCIENCE AND TECHNOLOGY */}
                  <span className="text-[10.5px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide leading-tight">
                    INSTITUTE OF SCIENCE AND TECHNOLOGY
                  </span>

                  {/* (DEEMED TO BE UNIVERSITY) */}
                  <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider leading-tight mt-0.5">
                    (DEEMED TO BE UNIVERSITY)
                  </span>

                  {/* CATEGORY - 1 UNIVERSITY BY UGC (in signature burgundy badge font) */}
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#70092B] text-white font-black text-[8.5px] tracking-wider uppercase shadow-xs border border-[#8B1038]">
                      CATEGORY - 1 UNIVERSITY BY UGC
                    </span>
                  </div>

                  {/* Hospital Medicine System (active pulse status pill) */}
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border-2 border-teal-500 text-[9.5px] font-black text-teal-900 dark:text-teal-200 w-fit shadow-xs">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                    </span>
                    <span>Hospital Medicine System</span>
                  </div>
                </div>
              )}
            </NavLink>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items (Shifted upside directly under the brand header) */}
        <nav className="space-y-1 px-2.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const hasRoleAccess = item.roles.includes(currentUser.role);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={isCollapsed ? item.label : undefined}
                className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                    : hasRoleAccess
                    ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100'
                    : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : hasRoleAccess
                      ? 'text-slate-500 dark:text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400'
                      : 'text-slate-400'
                  }`}
                />

                {!isCollapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}

                {/* Badge if alerts */}
                {item.badge !== undefined && (
                  <span
                    className={`ml-auto flex items-center justify-center font-bold text-[10px] tabular-nums rounded-full px-1.5 py-0.2 ${
                      isCollapsed
                        ? 'absolute top-1.5 right-1.5 w-2 h-2 p-0'
                        : item.badgeColor
                    }`}
                  >
                    {!isCollapsed && item.badge}
                  </span>
                )}

                {/* Subtle role indicator if access restricted */}
                {!isCollapsed && !hasRoleAccess && (
                  <span className="text-[10px] text-slate-400 italic">
                    audit view
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer & Collapse toggle */}
      <div className="border-t border-slate-200/80 dark:border-slate-800 p-3">
        {/* Sign In / Sign Up Link */}
        <NavLink
          to="/login"
          onClick={onCloseMobile}
          className={`flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'} rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all mb-2 text-xs font-black shadow-md border-2 border-blue-400`}
          title="Sign In or Register with your Role"
        >
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4 text-white shrink-0" />
            {!isCollapsed && <span>Sign In / Select Role</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-blue-700 font-extrabold">
              Portal
            </span>
          )}
        </NavLink>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors mb-2"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Menu</span>
            </>
          )}
        </button>

        {!isCollapsed && (
          <div className="px-1 text-center">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              © 2026 Sathyabama Hospital Medicine System
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 border-r-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 dark:bg-slate-800 shadow-2xl border-r-2 border-slate-300 dark:border-slate-600 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
};
