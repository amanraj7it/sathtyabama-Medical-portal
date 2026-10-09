import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { AuditLogItem, sixMonthsTrend } from '../data/mockData';
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertOctagon,
  Activity,
  Printer,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'motion/react';

export const Reports: React.FC = () => {
  const { auditLogs, addToast, dispensingRecords } = useApp();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [logFilter, setLogFilter] = useState('All');

  const handleExport = (type: 'PDF' | 'CSV') => {
    addToast(
      `${type} Report Generated`,
      `Sathyabama Clinical Pharmacy Compliance Dossier (${dateRange}) downloaded`,
      'success'
    );
  };

  const filteredLogs = auditLogs.filter(
    (log) => logFilter === 'All' || log.module === logFilter
  );

  const auditColumns: Column<AuditLogItem>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (log) => (
        <span className="font-mono text-xs text-slate-500 tabular-nums">
          {log.timestamp}
        </span>
      )
    },
    {
      key: 'user',
      header: 'Authorized User',
      render: (log) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
            {log.user}
          </span>
          <span className="text-[11px] text-slate-400 block">{log.role}</span>
        </div>
      )
    },
    {
      key: 'module',
      header: 'Module',
      render: (log) => (
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {log.module}
        </span>
      )
    },
    {
      key: 'action',
      header: 'Clinical Action & Audit Record',
      render: (log) => (
        <div>
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
            {log.action}
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {log.details}
          </p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Audit State',
      align: 'right',
      render: (log) => {
        let variant: BadgeVariant = 'neutral';
        if (log.status === 'success') variant = 'success';
        if (log.status === 'warning') variant = 'warning';
        if (log.status === 'info') variant = 'info';

        return <Badge variant={variant}>{log.status.toUpperCase()}</Badge>;
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Reports & Compliance Audit
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Institutional medicine consumption metrics, pharmacy revenue, and discrepancy trails
          </p>
        </div>

        {/* Date range picker & Export buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Fiscal Year 2026">Fiscal Year 2026</option>
            </select>
          </div>

          <button
            onClick={() => handleExport('CSV')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Audit PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Cards: Daily dispensing total, Monthly consumption, Expired disposal count, Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Dispensing Total"
          value={364}
          suffix=" units"
          icon={Activity}
          change={{ value: '+8.4%', isPositive: true }}
          colorTheme="teal"
        />
        <StatCard
          title="Monthly Consumption"
          value={16820}
          suffix=" units"
          icon={TrendingUp}
          change={{ value: '+9.6%', isPositive: true }}
          colorTheme="emerald"
        />
        <StatCard
          title="Expired Disposal Count"
          value={15}
          suffix=" SKUs"
          icon={AlertOctagon}
          change={{ value: '-16.7%', isPositive: true, period: 'vs last month' }}
          colorTheme="amber"
        />
        <StatCard
          title="Pharmacy Revenue"
          value={3410000}
          prefix="₹"
          icon={DollarSign}
          change={{ value: '+12.1%', isPositive: true }}
          colorTheme="teal"
        />
      </div>

      {/* 6 Months Consumption Trends Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Hospital Medicine Consumption & Inpatient Formulary Trend
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              6-month historical overview of units dispensed vs. pharmaceutical revenue (₹)
            </p>
          </div>
          <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
            Audit Certified ISO-9001
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sixMonthsTrend} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} opacity={0.6} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '12px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="totalDispensed"
                name="Units Dispensed"
                stroke="#0F766E"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="Revenue (₹)"
                stroke="#10B981"
                strokeWidth={3}
                strokeDasharray="4 4"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Discrepancy & Audit Log Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Clinical Discrepancy & Security Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              Immutable log of dispensing events, stock reconciliations, and role modifications
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Module:</span>
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Modules</option>
              <option value="Dispensing">Dispensing</option>
              <option value="Inventory">Inventory</option>
              <option value="Procurement">Procurement</option>
              <option value="Users">Users</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={auditColumns}
          data={filteredLogs}
          keyExtractor={(item) => item.id}
          emptyMessage="No audit logs recorded for this criteria."
        />
      </div>
    </motion.div>
  );
};
