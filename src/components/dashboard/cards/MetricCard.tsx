'use client';

import type { ReactNode } from 'react';

export type MetricCardProps = {
  title: string;
  value: string;
  badge?: string;
  badgeColor?: 'emerald' | 'default';
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  height?: string;
};

export const MetricCard = ({
  title,
  value,
  badge,
  badgeColor = 'emerald',
  subtitle,
  children,
  className = '',
  height,
}: MetricCardProps) => {
  const cardClass = 'relative rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_4px_rgba(15,23,42,0.04)] overflow-hidden';
  const badgeClass =
    badgeColor === 'emerald'
      ? 'rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-semibold text-emerald-600'
      : 'text-[11px] font-semibold text-emerald-600';

  return (
    <div className={`${cardClass} ${className}`} style={height ? { height } : undefined}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
          <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h4>
          {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
        </div>
        {badge && <span className={badgeClass}>{badge}</span>}
      </div>
      {children}
    </div>
  );
};
