'use client';

import { ResponsiveBar } from '@nivo/bar';
import { dashboardTheme, type MotionSetting } from './types';
import { countryColors, arrKeys } from '@/data';

export type ArrStackedChartProps = {
  data: Array<{
    month: string;
    'United States': number;
    Mexico: number;
    Ukraine: number;
    Turkey: number;
    Chile: number;
  }>;
  animate?: boolean;
  motionConfig?: MotionSetting;
};

export const ArrStackedChart = ({
  data,
  animate = true,
  motionConfig = { mass: 1, tension: 70, friction: 22 },
}: ArrStackedChartProps) => (
  <div className="h-[220px]">
    <ResponsiveBar
      data={data}
      keys={arrKeys}
      indexBy="month"
      theme={dashboardTheme}
      margin={{ top: 10, right: 8, bottom: 30, left: 50 }}
      padding={0.4}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={countryColors}
      borderRadius={0}
      borderWidth={0}
      animate={animate}
      motionConfig={motionConfig}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 12,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickValues: 4,
        format: (value) => `$${value}K`,
      }}
      enableGridX={false}
      enableGridY
      enableLabel={false}
      tooltip={({ id, value, color }) => (
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          {id}: ${value}K
        </div>
      )}
    />
  </div>
);
