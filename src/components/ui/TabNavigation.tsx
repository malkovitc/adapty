'use client';

import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';

export interface TabNavigationItem {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface TabNavigationProps {
  items: TabNavigationItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export default function TabNavigation({
  items,
  activeId: controlledActiveId,
  onSelect,
  className = '',
}: TabNavigationProps) {
  const [internalId, setInternalId] = useState(() => items[0]?.id);
  const resolvedActiveId = controlledActiveId ?? internalId;

  const handleSelect = (id: string) => {
    if (controlledActiveId === undefined) {
      setInternalId(id);
    }
    onSelect?.(id);
  };

  const tabs = useMemo(() => items.filter(Boolean), [items]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-4 ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = resolvedActiveId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
