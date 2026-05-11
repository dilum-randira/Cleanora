import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '../../lib/utils.js';

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  const colorStyles = Object.entries(config || {}).reduce((styles, [key, item]) => {
    if (item?.color) {
      styles[`--color-${key}`] = item.color;
    }

    return styles;
  }, {});

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          'flex aspect-video justify-center text-xs text-slate-600 [&_.recharts-cartesian-axis-tick_text]:fill-slate-500 [&_.recharts-cartesian-grid_line]:stroke-slate-200 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-slate-300 [&_.recharts-dot]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none',
          className
        )}
        style={colorStyles}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

function ChartTooltipContent({ active, payload, label, className, labelFormatter }) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={cn('min-w-40 rounded-lg border border-slate-200 bg-white p-3 text-cleanora-ink shadow-soft', className)}>
      <p className="mb-2 text-xs font-bold text-slate-500">
        {labelFormatter ? labelFormatter(label) : label}
      </p>
      <div className="grid gap-2">
        {payload.map((item) => {
          const key = item.dataKey || item.name;
          const itemConfig = config?.[key] || {};

          return (
            <div key={key} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: item.color || itemConfig.color }}
                />
                <span className="text-xs font-semibold text-slate-600">{itemConfig.label || item.name}</span>
              </div>
              <span className="text-xs font-black text-cleanora-ink">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartLegendContent({ payload, className }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center gap-4 pt-3', className)}>
      {payload.map((item) => {
        const key = item.dataKey || item.value;
        const itemConfig = config?.[key] || {};

        return (
          <div key={key} className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color || itemConfig.color }}
            />
            {itemConfig.label || item.value}
          </div>
        );
      })}
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };
