export type MotionSetting =
  | 'default'
  | 'gentle'
  | 'wobbly'
  | 'stiff'
  | 'slow'
  | 'fast'
  | { mass?: number; tension?: number; friction?: number };

export type LineSeries = {
  id: string;
  color?: string;
  data: { x: string; y: number }[];
};

export const dashboardTheme = {
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
      },
    },
    ticks: {
      line: {
        stroke: 'transparent',
      },
      text: {
        fontSize: 10,
        fill: '#94A3AF',
        fontFamily: 'Inter, var(--font-sans), sans-serif',
      },
    },
  },
  grid: {
    line: {
      stroke: '#E5E7EB',
      strokeWidth: 1,
      strokeDasharray: '4 4',
    },
  },
  crosshair: {
    line: {
      stroke: '#CBD5F5',
      strokeWidth: 1,
      strokeDasharray: '4 4',
    },
  },
  tooltip: {
    container: {
      fontSize: 11,
      fontFamily: 'Inter, var(--font-sans), sans-serif',
    },
  },
};
