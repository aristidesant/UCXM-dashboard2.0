import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ComposedChart,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

// Generate realistic trend data
const generateAreaData = () => Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  value: 75 + Math.random() * 20,
  target: 85,
}));

const generateEmotionData = () => [
  { name: 'Satisfied', value: 45, fill: '#10b981' },
  { name: 'Neutral', value: 35, fill: '#3b82f6' },
  { name: 'Frustrated', value: 15, fill: '#f59e0b' },
  { name: 'Angry', value: 5, fill: '#ef4444' },
];

const generateComplianceData = () => Array.from({ length: 12 }, (_, i) => ({
  month: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i],
  compliance: 88 + Math.random() * 8,
  target: 90,
}));

const generateHealthData = () => [
  { name: 'API Health', value: 98 },
  { name: 'Database', value: 99 },
  { name: 'Message Queue', value: 97 },
  { name: 'Cache', value: 100 },
  { name: 'Storage', value: 95 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  isDark?: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-3 rounded-lg shadow-lg border ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <p className="text-xs font-semibold opacity-75">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DataVisualizationDashboard: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    setAnimateCharts(true);
  }, []);

  // Restrained color palette
  const palette = {
    primary: '#10b981', // Emerald
    secondary: '#3b82f6', // Blue
    tertiary: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    neutral: isDark ? '#64748b' : '#cbd5e1',
  };

  const areaData = generateAreaData();
  const emotionData = generateEmotionData();
  const complianceData = generateComplianceData();
  const healthData = generateHealthData();

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'
      } p-6 md:p-8`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-2 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          Analytics Dashboard
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Real-time performance metrics and trends
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* HERO: QA Score Area Chart (Large, spans 2 columns) */}
        <div
          className={`lg:col-span-2 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 ${
            isDark
              ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              : 'bg-white/50 border border-slate-200/50 hover:border-slate-300/50'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                General QA Score
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                12-month trend with target baseline
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold" style={{ color: palette.primary }}>
                87.5<span className="text-lg">%</span>
              </div>
              <div className="text-xs flex items-center gap-1 mt-1" style={{ color: palette.primary }}>
                <TrendingUp size={12} />
                <span>+5% vs last month</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={palette.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#475569' : '#e2e8f0'}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={isDark ? '#64748b' : '#cbd5e1'}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={isDark ? '#64748b' : '#cbd5e1'}
                domain={[60, 100]}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                content={<CustomTooltip isDark={isDark} />}
                cursor={{ stroke: palette.primary, strokeWidth: 2, opacity: 0.3 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={palette.primary}
                strokeWidth={2}
                fill="url(#areaGradient)"
                isAnimationActive={animateCharts}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={palette.secondary}
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={animateCharts}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Emotion Distribution - Pie Chart */}
        <div
          className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 ${
            isDark
              ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              : 'bg-white/50 border border-slate-200/50 hover:border-slate-300/50'
          }`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Sentiment Distribution
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Customer emotion breakdown
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={animateCharts}
                animationDuration={1200}
              >
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip isDark={isDark} />}
                formatter={(value) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {emotionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.name}</span>
                </div>
                <span className="font-semibold" style={{ color: item.fill }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Progress - Composed Chart */}
        <div
          className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 ${
            isDark
              ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              : 'bg-white/50 border border-slate-200/50 hover:border-slate-300/50'
          }`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Compliance Trend
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Monthly compliance score vs target
            </p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={complianceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#475569' : '#e2e8f0'}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={isDark ? '#64748b' : '#cbd5e1'}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={isDark ? '#64748b' : '#cbd5e1'}
                domain={[80, 100]}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              <Bar
                dataKey="compliance"
                fill={palette.tertiary}
                opacity={0.7}
                isAnimationActive={animateCharts}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={palette.secondary}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={animateCharts}
                animationDuration={1500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* System Health - Gauge-style Bar Chart */}
        <div
          className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 ${
            isDark
              ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              : 'bg-white/50 border border-slate-200/50 hover:border-slate-300/50'
          }`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              System Health
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Component performance metrics
            </p>
          </div>
          <div className="space-y-3">
            {healthData.map((item, idx) => {
              const isHealthy = item.value >= 97;
              const healthColor = item.value >= 98 ? palette.primary : item.value >= 95 ? palette.secondary : palette.tertiary;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {isHealthy && <CheckCircle2 size={14} style={{ color: palette.primary }} />}
                      <span className="text-sm font-semibold" style={{ color: healthColor }}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div
                    className={`h-2 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-700' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: animateCharts ? `${item.value}%` : '0%',
                        backgroundColor: healthColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className={`mt-6 rounded-2xl p-6 backdrop-blur-sm ${
        isDark
          ? 'bg-slate-800/30 border border-slate-700/30'
          : 'bg-white/30 border border-slate-200/30'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg QA Score', value: '87.5%', color: palette.primary },
            { label: 'Satisfaction Rate', value: '92%', color: palette.secondary },
            { label: 'Uptime', value: '99.2%', color: palette.primary },
            { label: 'Response Time', value: '245ms', color: palette.tertiary },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationDashboard;
