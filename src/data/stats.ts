import type { LucideIcon } from 'lucide-react';
import { Star } from 'lucide-react';

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  icon?: LucideIcon;
}

// Homepage stats (displayed in Testimonials section)
export const homeStats: Stat[] = [
  {
    id: 'apps',
    value: 15000,
    suffix: '+',
    label: 'Apps powered',
    decimals: 0,
  },
  {
    id: 'revenue',
    value: 1.9,
    prefix: '$',
    suffix: 'B+',
    label: 'Revenue tracked',
    decimals: 1,
  },
  {
    id: 'uptime',
    value: 99.99,
    suffix: '%',
    label: 'Uptime SLA',
    decimals: 2,
  },
  {
    id: 'rating',
    value: 4.8,
    label: 'G2 Rating',
    decimals: 1,
    icon: Star,
  },
];

// Enterprise/infrastructure stats (displayed in StatsSection)
export const enterpriseStats: Stat[] = [
  {
    id: 'tracked-revenue',
    value: 2,
    prefix: '$',
    suffix: 'B',
    label: 'tracked revenue',
    decimals: 0,
  },
  {
    id: 'uptime',
    value: 99.99,
    suffix: '%',
    label: 'historical uptime',
    decimals: 2,
  },
  {
    id: 'users',
    value: 2.5,
    suffix: 'B',
    label: 'users served',
    decimals: 1,
  },
  {
    id: 'api-calls',
    value: 60,
    suffix: 'B',
    label: 'API calls / month',
    decimals: 0,
  },
];

// Helper function to format stat value for display
export const formatStatValue = (stat: Stat): string => {
  const { value, prefix = '', suffix = '', decimals = 0 } = stat;
  const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
  return `${prefix}${formattedValue}${suffix}`;
};

// Stats organized by section
export const statsBySection = {
  home: homeStats,
  enterprise: enterpriseStats,
} as const;
