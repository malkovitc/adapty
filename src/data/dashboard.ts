export interface DataPoint {
  x: string;
  y: number;
}

export interface LineSeries {
  id: string;
  color?: string;
  data: DataPoint[];
}

export interface ArrDataPoint {
  month: string;
  'United States': number;
  Mexico: number;
  Ukraine: number;
  Turkey: number;
  Chile: number;
}

export interface DonutDataPoint {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface CountryFilter {
  label: string;
  checked: boolean;
}

export const revenueSeries: LineSeries[] = [
  {
    id: 'My Yoga app',
    color: '#7C3AED',
    data: [
      { x: '1 Aug', y: 95 },
      { x: '1 Sep', y: 180 },
      { x: '1 Oct', y: 150 },
      { x: '1 Nov', y: 320 },
      { x: '1 Dec', y: 280 },
      { x: '1 Jan', y: 450 },
      { x: '1 Feb', y: 520 },
    ],
  },
  {
    id: 'My Habits app',
    color: '#EA580C',
    data: [
      { x: '1 Aug', y: 60 },
      { x: '1 Sep', y: 140 },
      { x: '1 Oct', y: 110 },
      { x: '1 Nov', y: 220 },
      { x: '1 Dec', y: 180 },
      { x: '1 Jan', y: 310 },
      { x: '1 Feb', y: 360 },
    ],
  },
];

export const mrrTrend: DataPoint[] = [
  { x: '1 Aug', y: 35 },
  { x: '1 Sep', y: 68 },
  { x: '1 Oct', y: 52 },
  { x: '1 Nov', y: 95 },
  { x: '1 Dec', y: 78 },
  { x: '1 Jan', y: 120 },
  { x: '1 Feb', y: 133 },
];

export const arrData: ArrDataPoint[] = [
  { month: '1 Aug', 'United States': 55, Mexico: 40, Ukraine: 32, Turkey: 28, Chile: 22 },
  { month: '1 Sep', 'United States': 60, Mexico: 42, Ukraine: 34, Turkey: 30, Chile: 23 },
  { month: '1 Oct', 'United States': 64, Mexico: 48, Ukraine: 37, Turkey: 33, Chile: 25 },
  { month: '1 Nov', 'United States': 66, Mexico: 51, Ukraine: 40, Turkey: 34, Chile: 26 },
  { month: '1 Dec', 'United States': 70, Mexico: 54, Ukraine: 42, Turkey: 36, Chile: 27 },
  { month: '1 Jan', 'United States': 74, Mexico: 56, Ukraine: 44, Turkey: 39, Chile: 28 },
  { month: '1 Feb', 'United States': 78, Mexico: 59, Ukraine: 46, Turkey: 40, Chile: 29 },
];

export const donutData: DonutDataPoint[] = [
  { id: 'iOS', label: 'iOS', value: 4800, color: '#7C3AED' },
  { id: 'Android', label: 'Android', value: 2200, color: '#A78BFA' },
];

export const arppuStackedData: LineSeries[] = [
  {
    id: 'iOS',
    color: '#8B5CF6',
    data: [
      { x: '1 Aug', y: 40 },
      { x: '1 Sep', y: 42 },
      { x: '1 Oct', y: 41 },
      { x: '1 Nov', y: 43 },
      { x: '1 Dec', y: 44 },
      { x: '1 Jan', y: 42 },
      { x: '1 Feb', y: 45 },
    ],
  },
  {
    id: 'Android',
    color: '#C4B5FD',
    data: [
      { x: '1 Aug', y: 30 },
      { x: '1 Sep', y: 32 },
      { x: '1 Oct', y: 31 },
      { x: '1 Nov', y: 33 },
      { x: '1 Dec', y: 34 },
      { x: '1 Jan', y: 32 },
      { x: '1 Feb', y: 35 },
    ],
  },
];

export const arpasTrend: DataPoint[] = [
  { x: '1 Aug', y: 0 },
  { x: '1 Sep', y: 12 },
  { x: '1 Oct', y: 14.5 },
  { x: '1 Nov', y: 15.8 },
  { x: '1 Dec', y: 16.4 },
  { x: '1 Jan', y: 16.4 },
  { x: '1 Feb', y: 16.4 },
];

export const activeTrialsTrend: DataPoint[] = [
  { x: '1 Aug', y: 20 },
  { x: '15 Aug', y: 50 },
  { x: '1 Sep', y: 30 },
  { x: '15 Sep', y: 70 },
  { x: '1 Oct', y: 40 },
  { x: '1 Nov', y: 60 },
  { x: '1 Dec', y: 45 },
  { x: '1 Jan', y: 80 },
  { x: '1 Feb', y: 75 },
];

export const countryColors: string[] = ['#4C1D95', '#6D28D9', '#8B5CF6', '#C4B5FD', '#EDE9FE'];

export const arrKeys: string[] = ['United States', 'Mexico', 'Ukraine', 'Turkey', 'Chile'];

export const countryFilters: CountryFilter[] = [
  { label: 'Select all', checked: true },
  { label: 'United States', checked: true },
  { label: 'Mexico', checked: true },
  { label: 'Ukraine', checked: true },
  { label: 'Turkey', checked: true },
  { label: 'Chile', checked: true },
];
