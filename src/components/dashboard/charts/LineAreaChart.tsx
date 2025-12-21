'use client';

import { ResponsiveLine } from '@nivo/line';
import { dashboardTheme, type LineSeries, type MotionSetting } from './types';

export type LineAreaChartProps = {
  data?: { x: string; y: number }[];
  series?: LineSeries[];
  gradientId: string;
  color: string;
  height?: number;
  showYAxis?: boolean;
  showXAxis?: boolean;
  yFormatter?: (value: number) => string;
  areaOpacity?: number;
  minimal?: boolean;
  solidArea?: boolean;
  curve?: 'linear' | 'monotoneX';
  enableArea?: boolean;
  margin?: Partial<{ top: number; right: number; bottom: number; left: number }>;
  axisLeftProps?: Record<string, unknown>;
  axisBottomProps?: Record<string, unknown>;
  enableGridY?: boolean;
  animate?: boolean;
  motionConfig?: MotionSetting;
  minValue?: number | 'auto';
  allowSeriesArea?: boolean;
  yScaleConfig?: { type: 'linear'; min: number | 'auto'; max: number | 'auto'; stacked?: boolean };
  lineWidth?: number;
};

export const LineAreaChart = ({
  data,
  series,
  gradientId,
  color,
  height = 140,
  showYAxis = true,
  showXAxis = true,
  yFormatter,
  areaOpacity = 0.2,
  minimal = false,
  solidArea = false,
  curve = 'monotoneX',
  enableArea = true,
  margin,
  axisLeftProps,
  axisBottomProps,
  enableGridY,
  animate = true,
  motionConfig = 'gentle',
  minValue = 'auto',
  allowSeriesArea = false,
  yScaleConfig,
  lineWidth = 2,
}: LineAreaChartProps) => {
  const dataset = series ?? [{ id: 'trend', data: data ?? [] }];
  const colors = series ? series.map((serie) => serie.color ?? color) : [color];
  const resolvedMargin = {
    top: 10,
    right: minimal ? 4 : 12,
    bottom: showXAxis ? 28 : 4,
    left: showYAxis ? 28 : 4,
    ...margin,
  };

  return (
    <div className="h-full" style={{ minHeight: `${height}px` }}>
      <ResponsiveLine
        data={dataset}
        theme={dashboardTheme}
        margin={resolvedMargin}
        yScale={yScaleConfig ?? { type: 'linear', min: minValue, max: 'auto', stacked: false }}
        animate={animate}
        motionConfig={motionConfig}
        xScale={{ type: 'point' }}
        enableGridX={false}
        enableGridY={enableGridY ?? showYAxis}
        gridYValues={showYAxis ? 4 : 0}
        enableArea={enableArea && (allowSeriesArea || !series)}
        curve={curve}
        areaOpacity={areaOpacity}
        colors={colors}
        lineWidth={lineWidth}
        enablePoints={false}
        axisTop={null}
        axisRight={null}
        axisBottom={
          showXAxis
            ? {
                tickSize: 0,
                tickPadding: 10,
                ...axisBottomProps,
              }
            : null
        }
        axisLeft={
          showYAxis
            ? {
                tickSize: 0,
                tickPadding: 10,
                tickValues: 4,
                format: yFormatter,
                ...axisLeftProps,
              }
            : null
        }
        defs={[
          {
            id: gradientId,
            type: 'linearGradient',
            colors: [
              { offset: 0, color, opacity: areaOpacity },
              { offset: 100, color, opacity: solidArea ? areaOpacity : 0 },
            ],
          },
        ]}
        fill={[{ match: '*', id: gradientId }]}
        enableCrosshair={showXAxis || showYAxis}
        useMesh
        tooltip={({ point }) => (
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg">
            <div className="text-slate-500">{point.data.xFormatted}</div>
            <div>{point.data.yFormatted}</div>
          </div>
        )}
        yFormat={yFormatter}
      />
    </div>
  );
};
