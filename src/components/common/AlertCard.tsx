import React from 'react';
import { InventoryAlert } from '../../data/mockData';
import { Badge } from './Badge';
import { AlertCircle, AlertTriangle, Clock, ShoppingCart, Check, Calendar, Package, Flame } from 'lucide-react';

interface AlertCardProps {
  alert: InventoryAlert;
  onCreatePO?: (alert: InventoryAlert) => void;
  onReview?: (alert: InventoryAlert) => void;
  onQuarantine?: (alert: InventoryAlert) => void;
  compact?: boolean;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onCreatePO,
  onReview,
  onQuarantine,
  compact = false,
}) => {
  const isExpiry = alert.type === 'expiry';
  const isCritical = alert.severity === 'critical';
  const isExpired = alert.daysRemaining <= 0;

  const severityVariant = isCritical
    ? 'danger'
    : alert.severity === 'high'
    ? 'warning'
    : 'neutral';

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        alert.reviewed
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
          : isCritical
          ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-xs'
          : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-xs'
      } ${compact ? 'p-3.5' : 'p-5'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg shrink-0 mt-0.5 ${
              isCritical
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
            }`}
          >
            {isCritical ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {alert.medicineName}
              </h4>
              <Badge variant={severityVariant} size="sm">
                {alert.severity.toUpperCase()}
              </Badge>
              {alert.reviewed && (
                <span className="text-[11px] text-slate-500 font-medium">
                  · Reviewed
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
              <span className="font-mono text-slate-600 dark:text-slate-300">
                Batch: {alert.batchNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>{alert.timestamp}</span>
            </div>

            <div className="mt-2.5 flex items-center gap-4 text-xs">
              {isExpiry ? (
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Expiry: {alert.expiryDate}
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${
                      isExpired
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    ({isExpired ? `Expired ${Math.abs(alert.daysRemaining)}d ago` : `In ${alert.daysRemaining} days`})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-medium">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-300">Stock:</span>
                  <span
                    className={`font-semibold tabular-nums ${
                      alert.currentStock === 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {alert.currentStock} units
                  </span>
                  <span className="text-slate-400">
                    / Threshold: {alert.threshold}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {!alert.reviewed && onReview && (
            <button
              onClick={() => onReview(alert)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
              title="Mark Reviewed"
            >
              <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="hidden sm:inline">Mark Reviewed</span>
            </button>
          )}

          {onQuarantine && isExpiry && (
            <button
              onClick={() => onQuarantine(alert)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors shadow-2xs whitespace-nowrap"
              title="Quarantine & Certify Disposal"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Quarantine</span>
            </button>
          )}

          {onCreatePO && !isExpired && (
            <button
              onClick={() => onCreatePO(alert)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 transition-colors shadow-2xs whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Create PO</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
