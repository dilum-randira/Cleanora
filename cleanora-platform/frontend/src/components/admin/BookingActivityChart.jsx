import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select.jsx';

const chartConfig = {
  pending: {
    label: 'Pending',
    color: '#f59e0b'
  },
  completed: {
    label: 'Completed',
    color: '#2ec4b6'
  }
};

const rangeOptions = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' }
];

function toDateKey(value) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatChartDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(`${value}T00:00:00`));
}

function getRangeStart(days) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  return start;
}

function BookingActivityChart({ bookings }) {
  const [timeRange, setTimeRange] = useState('30');

  const chartData = useMemo(() => {
    const days = Number(timeRange);
    const start = getRangeStart(days);
    const countsByDate = new Map();

    for (let index = 0; index < days; index += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      countsByDate.set(toDateKey(date), {
        date: toDateKey(date),
        pending: 0,
        completed: 0
      });
    }

    (Array.isArray(bookings) ? bookings : []).forEach((booking) => {
      const dateKey = toDateKey(booking.createdAt);

      if (!dateKey || !countsByDate.has(dateKey)) {
        return;
      }

      const dayCounts = countsByDate.get(dateKey);

      if (booking.status === 'Completed') {
        dayCounts.completed += 1;
      } else {
        dayCounts.pending += 1;
      }
    });

    return Array.from(countsByDate.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [bookings, timeRange]);

  const hasBookings = Array.isArray(bookings) && bookings.length > 0;

  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200/70 bg-white/80 shadow-xl shadow-cleanora-ink/5 backdrop-blur-xl">
      <CardHeader className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-br from-white via-white to-cleanora-mist/50 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-xl">Booking Activity</CardTitle>
          <CardDescription>Track pending and completed bookings over time.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full rounded-full border-slate-200 bg-white/90 sm:w-44" aria-label="Select booking activity time range">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent>
            {rangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        {!hasBookings ? (
          <div className="grid h-[280px] place-items-center rounded-2xl bg-cleanora-porcelain text-center">
            <p className="text-sm font-bold text-slate-600">No booking activity yet.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={chartData} margin={{ left: 0, right: 12, top: 12 }}>
              <defs>
                <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-pending)" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="var(--color-pending)" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.36} />
                  <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tickFormatter={formatChartDate}
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelFormatter={formatChartDate} />}
              />
              <Area
                dataKey="pending"
                type="natural"
                fill="url(#fillPending)"
                stroke="var(--color-pending)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="completed"
                type="natural"
                fill="url(#fillCompleted)"
                stroke="var(--color-completed)"
                strokeWidth={2}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default BookingActivityChart;
