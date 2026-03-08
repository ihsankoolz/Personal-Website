import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

const metrics: Metric[] = [
  { value: 186.65, suffix: '%', label: 'Backtest Return', decimals: 2 },
  { value: 0.96, suffix: '', label: 'Sharpe Ratio', decimals: 2 },
  { value: 213, suffix: 'K+', label: 'News Articles Scored', decimals: 0 },
  { value: 79, suffix: '', label: 'Stocks Tracked', decimals: 0 },
  { value: 110, suffix: 'K+', label: 'Feature Rows', decimals: 0 },
  { value: 50, suffix: '+', label: 'Hackathon Teams Beaten', decimals: 0 },
];

function useCountUp(target: number, duration: number, start: boolean, decimals: number) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start, decimals]);

  return current;
}

function MetricItem({ metric, animate: shouldAnimate }: { metric: Metric; animate: boolean }) {
  const value = useCountUp(metric.value, 2000, shouldAnimate, metric.decimals ?? 0);
  const display = (metric.decimals ?? 0) > 0 ? value.toFixed(metric.decimals) : Math.round(value);

  return (
    <div className="text-center px-4">
      <div
        className="text-3xl md:text-5xl lg:text-6xl text-[var(--noir-text)] mb-2 tabular-nums"
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
      >
        {metric.prefix}
        {display}
        <span className="text-[var(--noir-accent)]">{metric.suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--noir-text-muted)]">
        {metric.label}
      </div>
    </div>
  );
}

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 lg:px-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Label */}
        <div className="flex items-center gap-6 mb-16">
          <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
            By the Numbers
          </span>
          <span className="flex-1 h-px bg-[var(--noir-border)]" />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
          {metrics.map((m, i) => (
            <MetricItem key={i} metric={m} animate={visible} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
