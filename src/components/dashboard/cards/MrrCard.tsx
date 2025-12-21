'use client';

import { useMemo } from 'react';
import { MetricCard } from './MetricCard';
import { LineAreaChart } from '../charts';
import { useChartAnimation } from '../hooks/useChartAnimation';
import { mrrTrend } from '@/data';

const zeroMrrTrend = mrrTrend.map((point) => ({ ...point, y: 0 }));

export const MrrCard = () => {
  const { ref, animated } = useChartAnimation(100);

  const chartData = useMemo(
    () => (animated ? mrrTrend : zeroMrrTrend),
    [animated]
  );

  return (
    <MetricCard title="MRR" value="$113.7K" badge="+18.2%">
      <div ref={ref} className="mt-3 h-[150px]">
        <LineAreaChart
          data={chartData}
          gradientId="mrrGradient"
          color="#2563EB"
          showYAxis={false}
          yFormatter={(value) => `$${value}K`}
          areaOpacity={0.2}
          margin={{ top: 8, right: 6, bottom: 22, left: 6 }}
          axisBottomProps={{ tickValues: ['1 Aug', '1 Oct', '1 Dec', '1 Feb'] }}
          motionConfig={{ mass: 1, tension: 70, friction: 22 }}
          animate
          minValue={0}
        />
      </div>
    </MetricCard>
  );
};
