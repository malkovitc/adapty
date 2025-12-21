'use client';

import { useMemo } from 'react';
import { MetricCard } from './MetricCard';
import { LineAreaChart, type LineSeries } from '../charts';
import { useChartAnimation } from '../hooks/useChartAnimation';
import { revenueSeries } from '@/data';

const zeroRevenueSeries: LineSeries[] = revenueSeries.map((serie) => ({
  ...serie,
  data: serie.data.map((point) => ({ ...point, y: 0 })),
}));

export const RevenueCard = () => {
  const { ref, animated } = useChartAnimation(100);

  const chartData = useMemo(
    () => (animated ? revenueSeries : zeroRevenueSeries),
    [animated]
  );

  return (
    <MetricCard title="Revenue" value="$351.4K" badge="+23.5%">
      <div ref={ref} className="mt-3 h-[150px]">
        <LineAreaChart
          series={chartData}
          gradientId="revenueGradient"
          color="#7C3AED"
          showYAxis={false}
          yFormatter={(value) => `$${value}K`}
          margin={{ top: 8, right: 6, bottom: 22, left: 6 }}
          axisBottomProps={{ tickValues: ['1 Aug', '1 Oct', '1 Dec', '1 Feb'] }}
          motionConfig={{ mass: 1, tension: 70, friction: 22 }}
          animate
          areaOpacity={0.15}
          minValue={0}
          allowSeriesArea
        />
      </div>
    </MetricCard>
  );
};
