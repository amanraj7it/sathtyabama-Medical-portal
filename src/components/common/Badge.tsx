import React from 'react';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'primary'
  | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  withDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  withDot = true,
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs font-medium'
      : 'px-2.5 py-1 text-xs font-medium';

  const dotSizes = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  let dotColor = 'bg-slate-500';

  switch (variant) {
    case 'success':
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60';
      dotColor = 'bg-emerald-500';
      break;
    case 'warning':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60';
      dotColor = 'bg-amber-500';
      break;
    case 'danger':
      colorClasses = 'bg-rose-50 text-rose-800 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60';
      dotColor = 'bg-rose-500';
      break;
    case 'primary':
      colorClasses = 'bg-teal-50 text-teal-800 border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/60';
      dotColor = 'bg-teal-600';
      break;
    case 'info':
      colorClasses = 'bg-cyan-50 text-cyan-800 border-cyan-200/80 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60';
      dotColor = 'bg-cyan-500';
      break;
    case 'neutral':
    default:
      colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700';
      dotColor = 'bg-slate-400';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border tracking-tight tabular-nums select-none ${sizeClasses} ${colorClasses} ${className}`}
    >
      {withDot && (
        <span
          className={`shrink-0 rounded-full ${dotSizes} ${dotColor}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
