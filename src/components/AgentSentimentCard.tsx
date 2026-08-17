import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';

interface AgentSentimentCardProps {
  score: number;
}

export const AgentSentimentCard: React.FC<AgentSentimentCardProps> = ({ score }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const percentage = Math.round(score * 10);
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (score >= 8) return themeColors.newtechGreen;
    if (score >= 6.5) return themeColors.newtechBlue;
    return themeColors.danger;
  };

  const color = getColor();

  return (
    <div
      className="rounded-xl p-8 border flex flex-col h-full justify-center"
      style={{
        backgroundColor: themeColors.pureSurface,
        borderColor: themeColors.whisperBorder,
      }}
    >
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-1"
          style={{ color: themeColors.inkPrimary }}
        >
          Agent sentiment score
        </h3>
        <div className="flex items-baseline gap-1">
          <span
            className="text-4xl font-bold"
            style={{ color: themeColors.inkPrimary }}
          >
            {score.toFixed(1)}
          </span>
          <span
            className="text-sm"
            style={{ color: themeColors.mutedSlate }}
          >
            / 10.0
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={themeColors.whisperBorder}
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '60px 60px',
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
          {/* Center text */}
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dy="0.3em"
            fontSize="20"
            fontWeight="600"
            fill={color}
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default AgentSentimentCard;
