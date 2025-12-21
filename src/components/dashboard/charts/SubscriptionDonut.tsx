'use client';

import { ResponsivePie } from '@nivo/pie';
import { dashboardTheme, type MotionSetting } from './types';
import { cn } from '@/lib/utils';

export type SubscriptionDonutProps = {
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
  animate?: boolean;
  motionConfig?: MotionSetting;
  className?: string;
  centerLabel?: string;
  innerRadius?: number;
};

export const SubscriptionDonut = ({
  data,
  animate = true,
  motionConfig = 'wobbly',
  className,
  centerLabel,
  innerRadius = 0.68,
}: SubscriptionDonutProps) => (
  <div className={cn('relative h-40 w-full', className)}>
    {centerLabel && (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-600">
        {centerLabel}
      </div>
    )}
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      innerRadius={innerRadius}
      padAngle={0.4}
      cornerRadius={3}
      colors={{ datum: 'data.color' }}
      activeOuterRadiusOffset={4}
      enableArcLinkLabels={false}
      arcLabelsSkipAngle={10}
      arcLabel={() => ''}
      theme={dashboardTheme}
      animate={animate}
      motionConfig={motionConfig}
      transitionMode="pushIn"
    />
  </div>
);
