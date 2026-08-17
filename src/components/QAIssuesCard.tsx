import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';

interface QAIssue {
  category: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

interface QAIssuesCardProps {
  issues: QAIssue[];
}

export const QAIssuesCard: React.FC<QAIssuesCardProps> = ({ issues }) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return themeColors.danger;
      case 'down':
        return themeColors.success;
      default:
        return themeColors.steelSecondary;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} />;
      case 'down':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: themeColors.pureSurface,
        borderColor: themeColors.whisperBorder,
      }}
    >
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: themeColors.inkPrimary }}
      >
        QA issues
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: themeColors.mutedSlate }}
      >
        This week
      </p>

      <div className="space-y-4">
        {issues.map((issue, idx) => {
          const trendColor = getTrendColor(issue.trend);
          return (
            <div
              key={idx}
              className="flex justify-between items-center pb-4 border-b last:border-b-0"
              style={{ borderColor: themeColors.whisperBorder }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: themeColors.inkPrimary }}
              >
                {issue.category}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2 py-1 rounded"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(79, 168, 245, 0.2)'
                      : colors.light.infoBg,
                    color: isDark
                      ? colors.dark.newtechBlue
                      : colors.light.newtechBlue,
                  }}
                >
                  {issue.count}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded flex items-center gap-1"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(79, 168, 245, 0.1)'
                      : 'rgba(0, 152, 212, 0.1)',
                    color: trendColor,
                  }}
                >
                  {getTrendIcon(issue.trend)}
                  {issue.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QAIssuesCard;
