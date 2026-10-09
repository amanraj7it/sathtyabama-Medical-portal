import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCard } from '../components/common/AlertCard';
import { Badge } from '../components/common/Badge';
import { QuarantineDisposalModal } from '../components/common/QuarantineDisposalModal';
import { InventoryAlert } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle,
  Truck,
  Filter,
  Check,
  RefreshCw,
  Sparkles,
  Flame
} from 'lucide-react';
import { motion } from 'motion/react';

export const Alerts: React.FC = () => {
  const { alerts, reviewAlert, addToast } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'low_stock' | 'expiry'>('low_stock');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [quarantineAlert, setQuarantineAlert] = useState<InventoryAlert | null>(null);

  const lowStockAlerts = useMemo(
    () => alerts.filter((a) => a.type === 'low_stock'),
    [alerts]
  );
  const expiryAlerts = useMemo(
    () => alerts.filter((a) => a.type === 'expiry'),
    [alerts]
  );

  const displayedAlerts = useMemo(() => {
    const list = activeTab === 'low_stock' ? lowStockAlerts : expiryAlerts;
    if (severityFilter === 'all') return list;
    return list.filter((a) => a.severity === severityFilter);
  }, [activeTab, lowStockAlerts, expiryAlerts, severityFilter]);

  const unreviewedCount = alerts.filter((a) => !a.reviewed).length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.reviewed).length;

  const handleCreatePO = (alert: InventoryAlert) => {
    navigate('/suppliers');
    addToast('Procurement Initiated', `Opening purchase order request for ${alert.medicineName}`, 'info');
  };

  const handleReviewAll = () => {
    displayedAlerts.forEach((a) => {
      if (!a.reviewed) reviewAlert(a.id);
    });
    addToast('Batch Acknowledged', `Marked ${displayedAlerts.length} alerts as reviewed`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Summary Banner: Zero Stockout & Expiry Assurance */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>Zero Stockout & Expiry Assurance</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Automated Clinical Safety & Stockout Safeguard
          </h1>

          <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
            Continuously monitors minimum buffer thresholds, cold-chain shelf integrity, and hospital formulary quarantine windows. Proactively alerts ward heads before emergency stockouts occur.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-teal-700/50 text-xs">
            <div>
              <p className="text-teal-300/80 font-medium">Active Alerts</p>
              <p className="text-xl font-bold tabular-nums text-white mt-0.5">
                {unreviewedCount}
              </p>
            </div>
            <div>
              <p className="text-teal-300/80 font-medium">Critical Priority</p>
              <p className="text-xl font-bold tabular-nums text-rose-300 mt-0.5">
                {criticalCount}
              </p>
            </div>
            <div>
              <p className="text-teal-300/80 font-medium">Formulary Assured</p>
              <p className="text-xl font-bold tabular-nums text-emerald-300 mt-0.5">
                99.8%
              </p>
            </div>
            <div>
              <p className="text-teal-300/80 font-medium">Safety Response</p>
              <p className="text-xl font-bold tabular-nums text-white mt-0.5">
                &lt; 2 hours
              </p>
            </div>
          </div>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tabs and Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Two Tabs: Low Stock vs Expiry */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('low_stock')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'low_stock'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Low Stock Alerts</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200">
              {lowStockAlerts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('expiry')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'expiry'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-rose-500" />
            <span>Expiry & Quarantine Alerts</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200">
              {expiryAlerts.length}
            </span>
          </button>
        </div>

        {/* Severity Filter and Batch Action */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 hidden md:inline">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          <button
            onClick={handleReviewAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Acknowledge Tab</span>
          </button>
        </div>
      </div>

      {/* Alert Cards Grid */}
      <div className="space-y-3.5">
        {displayedAlerts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              No Pending Alerts
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              All {activeTab === 'low_stock' ? 'low stock' : 'expiry'} indicators are nominal or have been reviewed by pharmacy supervisors.
            </p>
          </div>
        ) : (
          displayedAlerts.map((alt) => (
            <AlertCard
              key={alt.id}
              alert={alt}
              onReview={(a) => reviewAlert(a.id)}
              onCreatePO={handleCreatePO}
              onQuarantine={(a) => setQuarantineAlert(a)}
            />
          ))
        )}
      </div>

      {/* Hazardous Pharmaceutical Waste & Quarantine Modal */}
      <QuarantineDisposalModal
        isOpen={!!quarantineAlert}
        onClose={() => setQuarantineAlert(null)}
        alert={quarantineAlert}
      />
    </motion.div>
  );
};
