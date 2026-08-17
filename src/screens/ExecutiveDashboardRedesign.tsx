import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Activity, Shield, Zap } from 'lucide-react';

// Sample data for sparkline charts
const generateTrendData = (baseValue: number, variance: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: baseValue + (Math.random() - 0.5) * variance,
  }));
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend: number;
  trendLabel: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  sparkData: Array<{ value: number }>;
  position: 'large' | 'medium' | 'small';
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  unit,
  trend,
  trendLabel,
  status,
  sparkData,
  position,
  delay,
}) => {
  const statusColors = {
    excellent: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', accent: '#10b981' },
    good: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: '#3b82f6' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: '#f59e0b' },
    critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', accent: '#ef4444' },
  };

  const colors = statusColors[status];
  const trendIsPositive = trend >= 0;

  const positionClasses = {
    large: 'col-span-2 row-span-2 md:col-span-2',
    medium: 'col-span-1 row-span-1 md:col-span-1',
    small: 'col-span-1 row-span-1 md:col-span-1',
  };

  const sizeClasses = {
    large: 'p-8',
    medium: 'p-6',
    small: 'p-5',
  };

  const titleClasses = {
    large: 'text-3xl md:text-4xl',
    medium: 'text-2xl md:text-3xl',
    small: 'text-xl md:text-2xl',
  };

  return (
    <div
      className={`${positionClasses[position]} ${colors.bg} border-2 ${colors.border} rounded-2xl ${sizeClasses[position]} relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fadeIn`}
      style={{
        animationDelay: `${delay * 100}ms`,
      }}
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -mr-16 -mt-16 transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: colors.accent }} />

      {/* Icon */}
      <div className={`mb-4 inline-flex p-3 rounded-xl transition-all duration-300 ${colors.text} opacity-70 group-hover:opacity-100`} style={{ backgroundColor: `${colors.accent}15` }}>
        {icon}
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-slate-600 uppercase tracking-widest mb-2">{label}</p>

      {/* Main value */}
      <div className="mb-4">
        <div className={`font-serif ${titleClasses[position]} font-bold text-slate-900 leading-tight`}>
          {value}
          {unit && <span className="text-lg opacity-60 ml-1">{unit}</span>}
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="mb-4 h-12 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.accent}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend indicator */}
      <div className="flex items-center gap-2">
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colors.text}`} style={{ backgroundColor: `${colors.accent}20` }}>
          <TrendingUp size={14} className={trendIsPositive ? 'rotate-0' : 'rotate-180'} />
          <span>{trendIsPositive ? '+' : ''}{trend}%</span>
        </div>
        <span className="text-xs text-slate-500">{trendLabel}</span>
      </div>

      {/* Animated border accent on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: `${colors.accent}40` }} />
    </div>
  );
};

export const ExecutiveDashboardRedesign: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const metrics = [
    {
      icon: <Activity size={24} />,
      label: 'General QA Score',
      value: 87.5,
      unit: '%',
      trend: 5,
      trendLabel: 'vs last month',
      status: 'excellent' as const,
      sparkData: generateTrendData(87.5, 5),
      position: 'large' as const,
      delay: 0,
    },
    {
      icon: <Zap size={24} />,
      label: 'Predominant Emotion',
      value: 'Satisfied',
      trend: 12,
      trendLabel: 'sentiment increase',
      status: 'excellent' as const,
      sparkData: generateTrendData(75, 8),
      position: 'medium' as const,
      delay: 1,
    },
    {
      icon: <Shield size={24} />,
      label: 'Compliance Score',
      value: 92.3,
      unit: '%',
      trend: 3,
      trendLabel: 'vs last month',
      status: 'excellent' as const,
      sparkData: generateTrendData(92.3, 3),
      position: 'medium' as const,
      delay: 2,
    },
    {
      icon: <Activity size={24} />,
      label: 'Operation Health',
      value: 'Healthy',
      trend: 2,
      trendLabel: 'stability score',
      status: 'good' as const,
      sparkData: generateTrendData(95, 2),
      position: 'small' as const,
      delay: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
      {/* Header with dramatic typography */}
      <div className="mb-12 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
          Executive Overview
        </h1>
        <p className="text-lg text-slate-400 font-light">
          Real-time performance metrics across your organization
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-slate-400">Live data • Last updated now</span>
        </div>
      </div>

      {/* Asymmetric mosaic grid */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @media (min-width: 768px) {
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: auto auto;
            gap: 2rem;
          }
        }

        @media (max-width: 767px) {
          .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="dashboard-grid">
        {/* QA Score - Large hero card (spans 2 cols, 2 rows on desktop) */}
        <div className="md:col-span-2 md:row-span-2">
          <MetricCard {...metrics[0]} />
        </div>

        {/* Emotion - Medium card */}
        <div className="md:col-span-1 md:row-span-1">
          <MetricCard {...metrics[1]} />
        </div>

        {/* Compliance - Medium card */}
        <div className="md:col-span-1 md:row-span-1">
          <MetricCard {...metrics[2]} />
        </div>

        {/* Health - Small card */}
        <div className="md:col-span-1">
          <MetricCard {...metrics[3]} />
        </div>
      </div>

      {/* Bottom insights section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">Key Insight</h3>
          <p className="text-slate-200">All metrics trending positively. Organization performing at peak capacity.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">Next Action</h3>
          <p className="text-slate-200">Review team feedback from last month's satisfaction survey.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">Forecast</h3>
          <p className="text-slate-200">Expected 8% improvement in compliance by end of quarter.</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboardRedesign;
