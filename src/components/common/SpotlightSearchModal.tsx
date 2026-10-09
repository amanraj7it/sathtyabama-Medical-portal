import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, Pill, User as UserIcon, FileText, ArrowRight, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './Badge';

export const SpotlightSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, medicines, dispensingRecords } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.brandName.toLowerCase().includes(query.toLowerCase()) ||
      m.batchNumber.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredPrescriptions = dispensingRecords.filter(
    (r) =>
      r.patientName.toLowerCase().includes(query.toLowerCase()) ||
      r.prescriptionId.toLowerCase().includes(query.toLowerCase()) ||
      r.medicineName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelectMedicine = (medId: string) => {
    setIsSearchOpen(false);
    navigate(`/inventory?search=${encodeURIComponent(medId)}`);
  };

  const handleSelectPrescription = () => {
    setIsSearchOpen(false);
    navigate('/dispensing');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
          >
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
              <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, batch lot, patients, or prescription IDs..."
                className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                ESC
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {/* Quick Navigation Pages */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                  Navigation
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Inventory', path: '/inventory' },
                    { label: 'Dispensing', path: '/dispensing' },
                    { label: 'Alerts', path: '/alerts' },
                  ].map((p) => (
                    <button
                      key={p.path}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(p.path);
                      }}
                      className="px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 transition-colors text-left flex items-center justify-between"
                    >
                      <span>{p.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Medicines matching */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                  Medicines ({filteredMedicines.length})
                </p>
                {filteredMedicines.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2">
                    No medicines match "{query}"
                  </p>
                ) : (
                  <div className="space-y-1">
                    {filteredMedicines.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleSelectMedicine(m.name)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors truncate">
                              {m.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {m.brandName} · Batch {m.batchNumber} · {m.quantity} {m.unit} in stock
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            m.status === 'In Stock'
                              ? 'success'
                              : m.status === 'Low Stock'
                              ? 'warning'
                              : 'danger'
                          }
                          size="sm"
                        >
                          {m.status}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Prescriptions matching */}
              {filteredPrescriptions.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                    Recent Dispensing & Prescriptions
                  </p>
                  <div className="space-y-1">
                    {filteredPrescriptions.map((rx) => (
                      <button
                        key={rx.id}
                        onClick={handleSelectPrescription}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {rx.prescriptionId} - {rx.patientName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {rx.medicineName} ({rx.quantity} units) · {rx.ward}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">{rx.timestamp}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>ProTip: Press <kbd className="font-mono bg-white dark:bg-slate-700 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-600">Ctrl + K</kbd> anywhere to open</span>
              <span>Sathyabama Hospital Medicine System</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
