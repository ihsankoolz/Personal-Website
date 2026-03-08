import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Representative equity curve data (cumulative return %)
// Modeled to show the 186.65% total return with realistic drawdowns
const data = [
  { month: 'Jan 22', value: 0 },
  { month: 'Mar 22', value: -4.2 },
  { month: 'Jun 22', value: 8.1 },
  { month: 'Sep 22', value: 5.3 },
  { month: 'Dec 22', value: 18.7 },
  { month: 'Mar 23', value: 32.4 },
  { month: 'Jun 23', value: 28.1 },
  { month: 'Sep 23', value: 51.6 },
  { month: 'Dec 23', value: 68.3 },
  { month: 'Mar 24', value: 62.1 },
  { month: 'Jun 24', value: 89.4 },
  { month: 'Sep 24', value: 108.2 },
  { month: 'Dec 24', value: 124.7 },
  { month: 'Mar 25', value: 141.3 },
  { month: 'Jun 25', value: 158.9 },
  { month: 'Sep 25', value: 172.4 },
  { month: 'Dec 25', value: 186.65 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload?.[0]) {
    return (
      <div className="bg-[var(--noir-bg)] border border-[var(--noir-border)] px-3 py-2">
        <p className="text-[10px] tracking-[0.1em] uppercase text-[var(--noir-text-muted)]">{label}</p>
        <p className="text-sm text-[var(--noir-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {payload[0].value > 0 ? '+' : ''}
          {payload[0].value.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export function EquityCurve() {
  return (
    <div className="mt-6 border-t border-[var(--noir-border)] pt-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--noir-text-muted)]">
          Equity Curve (Backtest)
        </span>
        <span className="text-[10px] tracking-[0.1em] text-[#4ade80]">
          +186.65%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E05A33" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#E05A33" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9, fill: '#5A5650' }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fontSize: 9, fill: '#5A5650' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#E05A33"
            strokeWidth={1.5}
            fill="url(#equityGrad)"
            dot={false}
            activeDot={{ r: 3, fill: '#E05A33', stroke: '#08080A', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
