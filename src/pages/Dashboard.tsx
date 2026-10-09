import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/common/StatCard';
import { AlertCard } from '../components/common/AlertCard';
import { Badge } from '../components/common/Badge';
import { SathyabamaEmblem } from '../components/common/SathyabamaEmblem';
import { ColdChainModal } from '../components/common/ColdChainModal';
import { BarcodeScannerModal } from '../components/common/BarcodeScannerModal';
import { EmergencyKitModal } from '../components/common/EmergencyKitModal';
import {
  Boxes,
  Send,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar,
  Building,
  PlusCircle,
  ExternalLink,
  Thermometer,
  ScanLine,
  Siren,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  consumptionTrend30Days,
  departmentDispensingData,
  categoryDistributionData,
  InventoryAlert
} from '../data/mockData';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const {
    medicines,
    alerts,
    dispensingRecords,
    currentUser,
    reviewAlert
  } = useApp();
  const navigate = useNavigate();

  // Modals
  const [isColdChainOpen, setIsColdChainOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEmergencyKitOpen, setIsEmergencyKitOpen] = useState(false);

  // Metrics computation
  const totalStockUnits = medicines.reduce((sum, m) => sum + m.quantity, 0);
  const lowStockCount = alerts.filter((a) => a.type === 'low_stock' && !a.reviewed).length;
  const expiringSoonCount = alerts.filter((a) => a.type === 'expiry' && !a.reviewed).length;
  const dispensedTodayUnits = dispensingRecords.slice(0, 8).reduce((sum, r) => sum + r.quantity, 0) + 340;

  // Chart time range filter
  const [chartRange, setChartRange] = useState<'30d' | '14d' | '7d'>('30d');

  const filteredConsumptionData =
    chartRange === '7d'
      ? consumptionTrend30Days.slice(-7)
      : chartRange === '14d'
      ? consumptionTrend30Days.slice(-14)
      : consumptionTrend30Days;

  const handleCreatePOFromAlert = (alert: InventoryAlert) => {
    navigate('/suppliers');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
        {/* Soft background light */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white shadow-xl ring-4 ring-teal-400/30 shrink-0 self-start sm:self-auto flex items-center justify-center">
            <SathyabamaEmblem size="xl" className="hidden sm:flex" />
            <SathyabamaEmblem size="lg" className="flex sm:hidden" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Sathyabama Hospital & Research Institute
              </span>
              <span className="text-teal-400/60">·</span>
              <span className="text-xs text-teal-200">Central Clinical Pharmacy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Sathyabama Hospital Medicine System
            </h1>
            <p className="text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Welcome back, {currentUser.name} ({currentUser.role}). Real-time inpatient formulary verification, biological cold-chain surveillance, and dispensing operations are active.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 relative z-10">
          <button
            onClick={() => navigate('/dispensing')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs shadow-md transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>Fulfill Prescription</span>
          </button>
          <button
            onClick={() => navigate('/inventory')}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Stock Inward</span>
          </button>
        </div>
      </div>

      {/* 4 Animated KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Medicines in Stock"
          value={totalStockUnits}
          suffix=" units"
          icon={Boxes}
          change={{ value: '+4.2%', isPositive: true, period: 'vs last week' }}
          colorTheme="teal"
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Dispensed Today"
          value={dispensedTodayUnits}
          suffix=" units"
          icon={Send}
          change={{ value: '+18.5%', isPositive: true, period: 'shift surge' }}
          colorTheme="emerald"
          onClick={() => navigate('/dispensing')}
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockCount}
          icon={AlertTriangle}
          change={{ value: '-2 alerts', isPositive: true, period: 'PO in transit' }}
          colorTheme="amber"
          onClick={() => navigate('/alerts')}
        />
        <StatCard
          title="Expiring Soon (<30d)"
          value={expiringSoonCount}
          icon={Clock}
          change={{ value: '+1 critical', isPositive: false, period: 'quarantine needed' }}
          colorTheme="rose"
          onClick={() => navigate('/alerts')}
        />
      </div>

      {/* Hospital Quick Command Deck: Cold Chain Telemetry, Barcode Scan, Code Blue Kit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Cold-Chain Quick Widget */}
        <div
          onClick={() => setIsColdChainOpen(true)}
          className="group p-4 rounded-2xl border border-teal-200/80 dark:border-teal-800/60 bg-white/80 dark:bg-slate-900/80 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                <Thermometer className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Cold-Chain Telemetry
                </span>
                <span className="block text-[10px] text-emerald-600 font-semibold">
                  4 Sensors Online (100% Compliant)
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Current Main Vaccine Chiller: <strong className="text-teal-700 dark:text-teal-300 tabular-nums">+3.8°C</strong> (Safe 2-8°C). Click to open 24h IoT trend log.
          </p>
        </div>

        {/* Optical Barcode Scanner Quick Widget */}
        <div
          onClick={() => setIsScannerOpen(true)}
          className="group p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                <ScanLine className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  GS1 Barcode Scanner
                </span>
                <span className="block text-[10px] text-teal-600 font-semibold">
                  Laser Matrix Ready
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scan 2D DataMatrix or linear barcodes to instantly verify lot, expiry, and launch stock fulfillment.
          </p>
        </div>

        {/* STAT Code Blue Emergency Box Quick Widget */}
        <div
          onClick={() => setIsEmergencyKitOpen(true)}
          className="group p-4 rounded-2xl border border-rose-200/80 dark:border-rose-900/60 bg-white/80 dark:bg-slate-900/80 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <Siren className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  STAT Emergency Indents
                </span>
                <span className="block text-[10px] text-rose-600 font-semibold">
                  1-Click Code Blue Dispatch
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pre-assembled resuscitation packs for cardiac arrest, anaphylaxis, and acute trauma bays.
          </p>
        </div>
      </div>

      {/* Main Charts Row: Consumption Trend (Area) & Category Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart: Consumption Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Medicine Consumption Trend
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily unit dispensation across emergency vs routine hospital wards
              </p>
            </div>

            {/* Segmented Time Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
              {(['7d', '14d', '30d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    chartRange === r
                      ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredConsumptionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRoutine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} opacity={0.6} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="routine"
                  name="Routine Inpatient"
                  stroke="#0F766E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRoutine)"
                />
                <Area
                  type="monotone"
                  dataKey="emergency"
                  name="Emergency Trauma"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorEmergency)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Stock by Category */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Stock by Category
              </h2>
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                {medicines.length} SKUs
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Inventory volume proportion across core pharmaceutical categories
            </p>
          </div>

          <div className="h-60 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="units"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} units`, name]}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '10px',
                    color: '#F8FAFC',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800">
            {categoryDistributionData.slice(0, 6).map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: c.fill }}
                />
                <span className="text-slate-600 dark:text-slate-300 truncate">
                  {c.name}:
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums ml-auto">
                  {c.units}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Dispensing per Department */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Ward & Department Dispensation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hospital inpatient units with highest current medicine draw
              </p>
            </div>
            <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentDispensingData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} units dispensed`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '10px',
                    color: '#F8FAFC',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {departmentDispensingData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Dispensing Activity Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Recent Dispensing Activity
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Audited fulfillment log from Central Pharmacy
              </p>
            </div>
            <button
              onClick={() => navigate('/dispensing')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              All Records
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2 px-2.5 font-semibold">Patient</th>
                  <th className="py-2 px-2.5 font-semibold">Medicine</th>
                  <th className="py-2 px-2.5 font-semibold text-right">Qty</th>
                  <th className="py-2 px-2.5 font-semibold">Pharmacist</th>
                  <th className="py-2 px-2.5 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {dispensingRecords.slice(0, 5).map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-2.5 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {rec.patientName}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-600 dark:text-slate-300 max-w-[140px] truncate" title={rec.medicineName}>
                      {rec.medicineName}
                    </td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 dark:text-slate-100 text-right tabular-nums">
                      {rec.quantity}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {rec.pharmacist.split(',')[0]}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-400 text-right whitespace-nowrap">
                      {rec.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Alert Feed Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Priority Assurance Feed
                </h2>
                <Badge variant="danger" size="sm">
                  {alerts.filter((a) => !a.reviewed).length} active
                </Badge>
              </div>
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                Alerts Center
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time threshold crossings and imminent expiration warnings
            </p>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((alt) => (
                <AlertCard
                  key={alt.id}
                  alert={alt}
                  compact
                  onReview={(a) => reviewAlert(a.id)}
                  onCreatePO={handleCreatePOFromAlert}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => navigate('/alerts')}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            >
              Review all active stockout & quarantine notices →
            </button>
          </div>
        </div>
      </div>

      {/* Global Interactive Feature Modals */}
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
    </motion.div>
  );
};
