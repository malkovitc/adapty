'use client';

import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrStackedChart } from '../charts';
import { CountryFilter } from './CountryFilter';
import { arrData } from '@/data';

export const ArrCard = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const chartData = useMemo(() => (inView ? arrData : []), [inView]);

  const cardClass = 'rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_4px_rgba(15,23,42,0.04)] overflow-hidden';

  return (
    <div className={`${cardClass} lg:flex lg:gap-4`}>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">ARR</p>
            <h4 className="text-xl font-semibold text-slate-900 tracking-tight">$1,364,646</h4>
            <p className="text-[11px] text-slate-400">$981,706 last year</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-semibold text-emerald-600">
            +39%
          </span>
        </div>
        <div ref={ref} className="mt-4 h-[220px]">
          <ArrStackedChart data={chartData} />
        </div>
      </div>
      <CountryFilter />
    </div>
  );
};
