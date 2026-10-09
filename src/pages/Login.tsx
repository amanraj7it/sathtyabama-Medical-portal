import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole, User } from '../data/mockData';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sun,
  Moon,
  Building2,
  Stethoscope,
  Pill,
  Truck,
  FileCheck,
  Activity,
  User as UserIcon,
  BadgeCheck,
  LogIn,
  UserPlus,
  Check,
  Sparkles
} from 'lucide-react';

import { SathyabamaEmblem } from '../components/common/SathyabamaEmblem';

interface RoleOption {
  role: UserRole;
  title: string;
  badge: string;
  defaultDepartment: string;
  icon: React.ElementType;
}

const ROLES_LIST: RoleOption[] = [
  {
    role: 'Pharmacist',
    title: 'Pharmacist',
    badge: 'Central Dispensary',
    defaultDepartment: 'Central Pharmacy Dispensary',
    icon: Pill,
  },
  {
    role: 'Doctor',
    title: 'Doctor',
    badge: 'Clinical Prescriber',
    defaultDepartment: 'Clinical Medicine Wards',
    icon: Stethoscope,
  },
  {
    role: 'Admin',
    title: 'Admin',
    badge: 'Full Root Privileges',
    defaultDepartment: 'Hospital Administration & IT',
    icon: ShieldCheck,
  },
  {
    role: 'Procurement Manager',
    title: 'Procurement',
    badge: 'Supplies & POs',
    defaultDepartment: 'Medical Supplies & Materials',
    icon: Truck,
  },
  {
    role: 'Audit Officer',
    title: 'Audit Officer',
    badge: 'Compliance & Logs',
    defaultDepartment: 'Hospital Quality Assurance',
    icon: FileCheck,
  },
  {
    role: 'Ward Staff',
    title: 'Ward Staff',
    badge: 'Inpatient Care',
    defaultDepartment: 'General Surgery & ICU Wards',
    icon: Activity,
  },
];

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { users, switchUser, isDarkMode, toggleDarkMode, addToast } = useApp();

  // Tab: 'signin' | 'signup'
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  // Sign In Form States
  const [signInRole, setSignInRole] = useState<UserRole>('Pharmacist');
  const [signInEmail, setSignInEmail] = useState('lakshmi.priya@sathyabama.ac.in');
  const [signInPassword, setSignInPassword] = useState('••••••••••••');

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('Pharmacist');
  const [signUpDepartment, setSignUpDepartment] = useState('Central Pharmacy Dispensary');
  const [signUpEmployeeId, setSignUpEmployeeId] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Handle Role Selection for Sign In
  const handleSelectSignInRole = (role: UserRole) => {
    setSignInRole(role);
    const existing = users.find((u) => u.role === role);
    if (existing) {
      setSignInEmail(existing.email);
    } else {
      setSignInEmail(`${role.toLowerCase().replace(/\s+/g, '.')}@sathyabama.ac.in`);
    }
  };

  // 1-Click Fast Instant Role Launch
  const handleQuickLaunch = (role: UserRole) => {
    setIsLoading(true);
    const existing = users.find((u) => u.role === role);
    const roleMeta = ROLES_LIST.find((r) => r.role === role) || ROLES_LIST[0];

    setTimeout(() => {
      const userToLogin: User = existing || {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: `Authorized ${roleMeta.title}`,
        email: `${role.toLowerCase().replace(/\s+/g, '.')}@sathyabama.ac.in`,
        role,
        department: roleMeta.defaultDepartment,
        status: 'Active',
        phone: '+91 94440 12345',
        joinedDate: new Date().toISOString().substring(0, 10),
      };

      switchUser(userToLogin);
      setIsLoading(false);
      navigate('/');
    }, 300);
  };

  // Sign In Submission
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const matched =
        users.find((u) => u.email.toLowerCase() === signInEmail.trim().toLowerCase()) ||
        users.find((u) => u.role === signInRole);

      const roleMeta = ROLES_LIST.find((r) => r.role === signInRole) || ROLES_LIST[0];

      const authenticatedUser: User = matched || {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: signInEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: signInEmail.trim().toLowerCase(),
        role: signInRole,
        department: roleMeta.defaultDepartment,
        status: 'Active',
        phone: '+91 94440 88888',
        joinedDate: new Date().toISOString().substring(0, 10),
      };

      switchUser(authenticatedUser);
      setIsLoading(false);
      navigate('/');
    }, 350);
  };

  // Sign Up Submission
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpName.trim() || !signUpEmail.trim()) {
      addToast('Validation Error', 'Please enter your Full Name and Institutional Email', 'error');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: signUpEmployeeId.trim() || `SIST-${Date.now().toString().slice(-4)}`,
        name: signUpName.trim(),
        email: signUpEmail.trim().toLowerCase(),
        role: signUpRole,
        department: signUpDepartment.trim() || 'Clinical Services',
        status: 'Active',
        phone: '+91 94440 99999',
        joinedDate: new Date().toISOString().substring(0, 10),
      };

      switchUser(newUser);
      setIsLoading(false);
      addToast('Account Created Successfully', `Welcome to Sathyabama Hospital, ${newUser.name}!`, 'success');
      navigate('/');
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#E2E8F0] dark:bg-slate-700 text-slate-900 antialiased overflow-hidden">
      {/* Subtle Grey Clinical Grid Pattern (No pitch black) */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left Showcase Panel: Refined Professional Grey Theme (No Black) */}
      <div className="relative hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-10 xl:p-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-r-2 border-slate-300 dark:border-slate-600 z-10 shadow-sm">
        {/* Soft Grey Aura */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-slate-300/30 dark:bg-slate-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Wordmark & Exact Institutional Credentials */}
        <div className="relative z-10 flex flex-col items-start gap-2.5">
          <SathyabamaEmblem size="lg" />
          <div className="flex flex-col text-left">
            {/* SATHYABAMA (bold primary heading) */}
            <span className="text-base font-black tracking-wider text-slate-950 dark:text-white uppercase leading-none">
              SATHYABAMA
            </span>

            {/* Teal divider accent */}
            <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 my-1.5 rounded-full" />

            {/* INSTITUTE OF SCIENCE AND TECHNOLOGY */}
            <span className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide leading-tight">
              INSTITUTE OF SCIENCE AND TECHNOLOGY
            </span>

            {/* (DEEMED TO BE UNIVERSITY) */}
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider leading-tight mt-0.5">
              (DEEMED TO BE UNIVERSITY)
            </span>

            {/* CATEGORY - 1 UNIVERSITY BY UGC (in signature burgundy badge font) */}
            <div className="mt-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#70092B] text-white font-black text-[9px] tracking-wider uppercase shadow-xs border border-[#8B1038]">
                CATEGORY - 1 UNIVERSITY BY UGC
              </span>
            </div>

            {/* Hospital Medicine System (active pulse status pill) */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-teal-500/50 text-[10px] font-bold text-teal-800 dark:text-teal-300 w-fit shadow-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
              </span>
              <span>Hospital Medicine System</span>
            </div>
          </div>
        </div>

        {/* Center Showcase Artwork */}
        <div className="relative z-10 my-auto py-6 max-w-lg space-y-4">
          <div className="overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-lg bg-white dark:bg-slate-900 max-h-60">
            <img
              src="/src/assets/images/hospital_pharmacy_illustration_1790660176158.jpg"
              alt="Hospital Pharmacy Management"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Multi-Role Access Control (RBAC) System</span>
            </div>

            <h1 className="text-xl xl:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
              Secure Clinical Pharmacy & Automated Medicine Inventory Portal
            </h1>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Sign in with your designated hospital staff account or create a new profile with role-based permissions for doctors, pharmacists, admins, procurement, and nursing units.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Sathyabama Institute of Science and Technology</span>
          <span>© 2026 Health IT Charter</span>
        </div>
      </div>

      {/* Right Form Panel: Pure Clean Grey Canvas with Elevated Card */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 lg:p-10 xl:p-12 overflow-y-auto bg-slate-200 dark:bg-slate-700">
        {/* Top Header & Dark Mode Switch */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-300 dark:border-slate-600">
          <div className="lg:hidden flex items-center gap-2">
            <SathyabamaEmblem size="sm" />
            <div>
              <p className="text-xs font-black text-slate-950 dark:text-white uppercase leading-none">
                SATHYABAMA HOSPITAL
              </p>
              <p className="text-[10px] text-teal-700 dark:text-teal-400 font-bold">
                Medicine Management System
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors border-2 border-slate-300 dark:border-slate-600 shadow-xs cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Elevated Form Card Container (Sitting cleanly on the Grey Background) */}
        <div className="w-full max-w-lg mx-auto my-auto py-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-300 dark:border-slate-600 shadow-xl p-6 sm:p-8">
            {/* Segmented Toggle: High-Contrast Sign In vs Sign Up */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-700 mb-6 border-2 border-slate-300 dark:border-slate-600 shadow-inner">
              <button
                type="button"
                onClick={() => setAuthTab('signin')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  authTab === 'signin'
                    ? 'bg-blue-600 text-white shadow-md border-2 border-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 font-bold'
                }`}
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthTab('signup')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  authTab === 'signup'
                    ? 'bg-emerald-600 text-white shadow-md border-2 border-emerald-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 font-bold'
                }`}
              >
                <UserPlus className="w-4 h-4 text-white" />
                <span>Sign Up (Register)</span>
              </button>
            </div>

            {/* ==================== 1. SIGN IN TAB ==================== */}
            {authTab === 'signin' ? (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    Hospital Portal Sign In
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                    Choose your functional role below or enter your credentials
                  </p>
                </div>

                {/* HIGH-CONTRAST ROLE SELECTION BUTTONS */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Select Your Role:</span>
                    </label>
                    <span className="text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                      Active: {signInRole}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ROLES_LIST.map((r) => {
                      const Icon = r.icon;
                      const isSelected = signInRole === r.role;
                      return (
                        <button
                          key={r.role}
                          type="button"
                          onClick={() => handleSelectSignInRole(r.role)}
                          className={`flex flex-col p-3 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-500/30 shadow-lg shadow-blue-600/30 scale-[1.02]'
                              : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-600 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1.5">
                            <div
                              className={`p-2 rounded-xl ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected ? (
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-blue-600 shadow-2xs">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="w-4 h-4 rounded-full border-2 border-slate-400" />
                            )}
                          </div>
                          <span className="text-xs font-black leading-tight">
                            {r.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold mt-0.5 truncate ${
                              isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {r.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignInSubmit} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                      Institutional Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="name@sathyabama.ac.in"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-black text-slate-800 dark:text-slate-200">
                        Security Password
                      </label>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        Forgot Password?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Confirm Role Selector Dropdown */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                      Selected Role Confirmation
                    </label>
                    <select
                      value={signInRole}
                      onChange={(e) => handleSelectSignInRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    >
                      {ROLES_LIST.map((r) => (
                        <option key={r.role} value={r.role}>
                          {r.title} — {r.badge} ({r.defaultDepartment})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* BRIGHT, HIGH-VISIBILITY, UNMISSABLE SIGN IN BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/35 border-2 border-blue-400 cursor-pointer tracking-wider uppercase"
                  >
                    {isLoading ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 text-white" />
                        <span>SIGN IN AS {signInRole.toUpperCase()}</span>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </>
                    )}
                  </button>
                </form>

                {/* 1-Click Instant Demo Launch Bar */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                    Fast 1-Click Immediate Access:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {(['Pharmacist', 'Doctor', 'Admin', 'Procurement Manager'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleQuickLaunch(r)}
                        className="px-3 py-1.5 rounded-xl text-xs font-black bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all border-2 border-slate-300 dark:border-slate-600 shadow-xs cursor-pointer"
                      >
                        Instant {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Switcher */}
                <div className="text-center pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>New hospital employee or clinician? </span>
                  <button
                    type="button"
                    onClick={() => setAuthTab('signup')}
                    className="font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Create an account (Sign Up)
                  </button>
                </div>
              </div>
            ) : (
              /* ==================== 2. SIGN UP TAB ==================== */
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    Staff Registration
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                    Create your authorized hospital user account & select your role
                  </p>
                </div>

                {/* SIGN UP ROLE SELECTION */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white block mb-2">
                    Choose Your Role for Registration:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ROLES_LIST.map((r) => {
                      const Icon = r.icon;
                      const isSelected = signUpRole === r.role;
                      return (
                        <button
                          key={r.role}
                          type="button"
                          onClick={() => {
                            setSignUpRole(r.role);
                            setSignUpDepartment(r.defaultDepartment);
                          }}
                          className={`flex flex-col p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/30 shadow-md scale-[1.02]'
                              : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 hover:border-emerald-500 hover:bg-emerald-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <Icon className="w-4 h-4" />
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-black">{r.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                      Full Name & Title <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Kumar or Aman Gupta"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                      Institutional Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="username@sathyabama.ac.in"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Department */}
                    <div>
                      <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                        Department / Ward
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={signUpDepartment}
                          onChange={(e) => setSignUpDepartment(e.target.value)}
                          placeholder="e.g. Central Pharmacy, Surgery"
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Employee ID */}
                    <div>
                      <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                        Employee ID <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={signUpEmployeeId}
                          onChange={(e) => setSignUpEmployeeId(e.target.value)}
                          placeholder="e.g. SIST-MED-2026-089"
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
                      Create Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* BRIGHT, HIGH-VISIBILITY, UNMISSABLE SIGN UP BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-3 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-xl shadow-emerald-600/35 border-2 border-emerald-400 cursor-pointer tracking-wider uppercase"
                  >
                    {isLoading ? (
                      <span>Registering Account...</span>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 text-white" />
                        <span>CREATE ACCOUNT & SIGN IN AS {signUpRole.toUpperCase()}</span>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </>
                    )}
                  </button>
                </form>

                {/* Bottom Switcher back to Sign In */}
                <div className="text-center pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Already registered with hospital credentials? </span>
                  <button
                    type="button"
                    onClick={() => setAuthTab('signin')}
                    className="font-black text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 pt-3">
          <span>Protected by Sathyabama Health IT Security Charter</span>
          <span className="mx-2">·</span>
          <span>Version 2026.4.1</span>
        </div>
      </div>
    </div>
  );
};
