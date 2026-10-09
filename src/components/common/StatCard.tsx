import React, { useEffect, useState } from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  colorTheme?: 'teal' | 'emerald' | 'amber' | 'rose';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix = '',
  prefix = '',
  icon: Icon,
  change,
  colorTheme = 'teal',
  onClick,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated Count-Up effect
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 800; // ms
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(startValue + (value - startValue) * easeOut));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  const colorStyles = {
    teal: {
      iconBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40',
      borderHover: 'hover:border-teal-500/40 dark:hover:border-teal-500/40',
      accentBar: 'bg-teal-600',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40',
      borderHover: 'hover:border-emerald-500/40 dark:hover:border-emerald-500/40',
      accentBar: 'bg-emerald-500',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40',
      borderHover: 'hover:border-amber-500/40 dark:hover:border-amber-500/40',
      accentBar: 'bg-amber-500',
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40',
      borderHover: 'hover:border-rose-500/40 dark:hover:border-rose-500/40',
      accentBar: 'bg-rose-500',
    },
  }[colorTheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`relative group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all duration-200 hover:shadow-md ${colorStyles.borderHover} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 tabular-nums">
              {prefix}
              {displayValue.toLocaleString()}
              {suffix}
            </span>
          </div>
        </div>

        <div
          className={`p-3 rounded-xl border shrink-0 transition-transform duration-200 group-hover:scale-105 ${colorStyles.iconBg}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {change && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-medium tabular-nums ${
              change.isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {change.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {change.value}
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            {change.period || 'vs yesterday'}
          </span>
        </div>
      )}
    </motion.div>
  );
};
