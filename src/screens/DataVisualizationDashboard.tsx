import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

// Generate data
const generateAreaData = () => Array.from({ length: 12 }, (_, i) => ({
  month: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i],
  value: 75 + Math.random() * 20,
  target: 85,
}));

const generateEmotionData = () => [
  { name: 'Satisfied', value: 45, fill: '#10b981' },
  { name: 'Neutral', value: 35, fill: '#3b82f6' },
  { name: 'Frustrated', value: 15, fill: '#f59e0b' },
  { name: 'Angry', value: 5, fill: '#ef4444' },
];

const generateComplianceData = () => Array.from({ length: 6 }, (_, i) => ({
  month: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  score: 88 + Math.random() * 8,
}));

const generateHealthData = () => [
  { name: 'API', value: 98 },
  { name: 'DB', value: 99 },
  { name: 'Queue', value: 97 },
  { name: 'Cache', value: 100 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name?: string }>;
  isDark?: boolean;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-2 rounded shadow-lg text-xs font-medium ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
        <p>{payload[0].value.toFixed(1)}</p>
      </div>
    );
  }
  return null;
};

export const DataVisualizationDashboard: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'} p-8`}>
      {/* Header */}
      <div className="mb-12">
        <h1 className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Analytics
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Real-time performance metrics
        </p>
      </div>

      {/* Hero: QA Score */}
      <div className={`rounded-xl p-8 mb-8 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                QA Score
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                12-month trend
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-500">87.5%</div>
              <div className="text-xs text-emerald-500 mt-1 flex items-center justify-end gap-1">
                <TrendingUp size={12} />
                +5% vs month
              </div>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={generateAreaData()} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} vertical={false} />
            <XAxis dataKey="month" stroke={isDark ? '#64748b' : '#cbd5e1'} style={{ fontSize: '12px' }} />
            <YAxis stroke={isDark ? '#64748b' : '#cbd5e1'} style={{ fontSize: '12px' }} domain={[60, 100]} />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#grad1)" isAnimationActive={animated} animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Grid: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sentiment */}
        <div className={`rounded-xl p-8 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Sentiment
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={generateEmotionData()} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" isAnimationActive={animated} animationDuration={1200}>
                {generateEmotionData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {generateEmotionData().map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.name}</span>
                </div>
                <span className="font-semibold" style={{ color: item.fill }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className={`rounded-xl p-8 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Compliance
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={generateComplianceData()} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="month" stroke={isDark ? '#64748b' : '#cbd5e1'} style={{ fontSize: '12px' }} />
              <YAxis stroke={isDark ? '#64748b' : '#cbd5e1'} style={{ fontSize: '12px' }} domain={[80, 100]} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              <Bar dataKey="score" fill="#f59e0b" isAnimationActive={animated} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 text-center">
            <div className="text-3xl font-bold text-amber-500">92.3%</div>
            <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Current score</p>
          </div>
        </div>

        {/* Health */}
        <div className={`rounded-xl p-8 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            System Health
          </h3>
          <div className="space-y-4">
            {generateHealthData().map((item) => {
              const isHealthy = item.value >= 98;
              const healthColor = item.value >= 99 ? '#10b981' : item.value >= 95 ? '#3b82f6' : '#f59e0b';
              return (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {isHealthy && <CheckCircle2 size={14} color={healthColor} />}
                      <span className="text-sm font-semibold" style={{ color: healthColor }}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: animated ? `${item.value}%` : '0%',
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

      {/* Summary */}
      <div className={`rounded-xl p-8 mt-8 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Avg Score', value: '87.5%', color: '#10b981' },
            { label: 'Satisfaction', value: '92%', color: '#3b82f6' },
            { label: 'Uptime', value: '99.2%', color: '#10b981' },
            { label: 'Avg Response', value: '245ms', color: '#f59e0b' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className={`text-xs mb-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
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
