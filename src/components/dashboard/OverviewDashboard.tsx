'use client';

import { useMemo } from 'react';
import { RevenueCard, MrrCard, ArrCard, MetricCard } from './cards';
import { LineAreaChart, SubscriptionDonut, type LineSeries } from './charts';
import { useChartAnimation } from './hooks/useChartAnimation';
import { donutData, arppuStackedData, arpasTrend, activeTrialsTrend } from '@/data';

const zeroArppuStacked: LineSeries[] = arppuStackedData.map((serie) => ({
  ...serie,
  data: serie.data.map((point) => ({ ...point, y: 0 })),
}));

const zeroArpasTrend = arpasTrend.map((point) => ({ ...point, y: 0 }));
const zeroActiveTrialsTrend = activeTrialsTrend.map((point) => ({ ...point, y: 0 }));

const formatCurrency = (value: number, digits = 1) =>
  `$${(value).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;

export default function OverviewDashboard() {
  const { ref: donutRef, inView: donutInView } = useChartAnimation();
  const { ref: arppuRef, inView: arppuInView } = useChartAnimation();
  const { ref: arpasRef, inView: arpasInView } = useChartAnimation();
  const { ref: trialsRef, inView: trialsInView } = useChartAnimation();

  const donutChartData = useMemo(() => (donutInView ? donutData : []), [donutInView]);
  const arppuChartData = useMemo(
    () => (arppuInView ? arppuStackedData : zeroArppuStacked),
    [arppuInView]
  );
  const arpasChartData = useMemo(
    () => (arpasInView ? arpasTrend : zeroArpasTrend),
    [arpasInView]
  );
  const trialsChartData = useMemo(
    () => (trialsInView ? activeTrialsTrend : zeroActiveTrialsTrend),
    [trialsInView]
  );

  return (
    <div className="rounded-2xl border border-white/15 bg-[#F9FAFB] p-6 text-slate-900 shadow-[0_18px_40px_rgba(3,6,20,0.35)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
          <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">ARR $1,364,646</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-600">
          +39%
        </span>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueCard />
          <MrrCard />
        </div>

        <ArrCard />

        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard title="New subscriptions" value="7K" height="180px">
            <div className="absolute inset-x-4 -bottom-4 top-0 flex items-center gap-4">
              <div className="flex w-1/2 flex-col justify-center">
                <div className="space-y-2 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                      iOS
                    </span>
                    <span className="font-semibold text-slate-800">4.8K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#C4B5FD]" />
                      Android
                    </span>
                    <span className="font-semibold text-slate-800">2.2K</span>
                  </div>
                </div>
              </div>
              <div ref={donutRef} className="flex w-1/2 items-center justify-center">
                <SubscriptionDonut data={donutChartData} className="h-36 w-36" centerLabel="31%" innerRadius={0.55} />
              </div>
            </div>
          </MetricCard>

          <MetricCard title="ARPPU" value="$24.74" badge="+6%" badgeColor="default" height="180px">
            <div className="mt-3 flex gap-6 text-[11px] text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                iOS 69%
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-[#C4B5FD]" />
                Android 31%
              </div>
            </div>
            <div ref={arppuRef} className="mt-2 h-[120px]">
              <LineAreaChart
                series={arppuChartData}
                gradientId="arppuStacked"
                color="#8B5CF6"
                showXAxis={false}
                showYAxis={false}
                areaOpacity={1}
                minimal
                allowSeriesArea
                yScaleConfig={{ type: 'linear', min: 0, max: 'auto', stacked: true }}
                lineWidth={0}
                margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                enableGridY={false}
                motionConfig={{ mass: 1, tension: 70, friction: 22 }}
              />
            </div>
          </MetricCard>

          <MetricCard title="ARPAS" value={formatCurrency(16.4, 1)} badge="+4%" badgeColor="default" height="180px">
            <div ref={arpasRef} className="mt-4 h-[110px]">
              <LineAreaChart
                data={arpasChartData}
                gradientId="arpasGradient"
                color="#7C3AED"
                showXAxis={false}
                showYAxis={false}
                areaOpacity={0}
                minimal
                enableArea={false}
                minValue={0}
                lineWidth={2}
                margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                enableGridY={false}
                motionConfig={{ mass: 1, tension: 70, friction: 22 }}
              />
            </div>
          </MetricCard>

          <MetricCard title="Active trials" value="789" height="180px">
            <div ref={trialsRef} className="mt-6 h-[120px]">
              <LineAreaChart
                data={trialsChartData}
                gradientId="trialsGradient"
                color="#E0E7FF"
                showXAxis={false}
                showYAxis={false}
                areaOpacity={1}
                minimal
                solidArea
                curve="linear"
                minValue={0}
                lineWidth={0}
                margin={{ top: 4, right: 0, bottom: 4, left: 0 }}
                enableGridY={false}
                motionConfig={{ mass: 1, tension: 70, friction: 22 }}
              />
            </div>
          </MetricCard>
        </div>
      </div>
    </div>
  );
}
