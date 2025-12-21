'use client';

import { SearchIcon, CheckIcon } from '@/components/icons';
import { countryFilters } from '@/data';

export const CountryFilter = () => {
  return (
    <div className="mt-4 w-full rounded-xl border border-slate-200 bg-white p-4 lg:mt-0 lg:w-64">
      <div className="relative mb-2">
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-[11px] placeholder:text-slate-400 focus:border-purple-300 focus:outline-none"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <SearchIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="mb-3 text-[10px] font-medium text-slate-400">207/207</div>
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-3">
          <div className="relative">
            <input type="checkbox" className="peer sr-only" defaultChecked />
            <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-slate-200 transition-colors peer-checked:bg-slate-900">
              <CheckIcon className="h-3 w-3 text-white" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-900">Select all</span>
        </label>
        {countryFilters.map((item) => (
          <label key={item.label} className="flex cursor-pointer items-center gap-3">
            <div className="relative">
              <input type="checkbox" className="peer sr-only" checked={item.checked} readOnly />
              <div className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-slate-200 bg-slate-100 transition-colors peer-checked:border-[#C4B5FD] peer-checked:bg-[#C4B5FD]">
                <CheckIcon className="h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
              </div>
            </div>
            <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
