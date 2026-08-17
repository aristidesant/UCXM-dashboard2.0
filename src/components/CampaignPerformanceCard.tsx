import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../design';

interface Campaign {
  id: string;
  name: string;
  callVolume: number;
  complianceViolations: number;
  performance: 'best' | 'lowest';
}

interface CampaignPerformanceCardProps {
  bestPerforming: Campaign[];
  lowestPerforming: Campaign[];
}

export const CampaignPerformanceCard: React.FC<CampaignPerformanceCardProps> = ({
  bestPerforming,
  lowestPerforming,
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: themeColors.pureSurface,
        borderColor: themeColors.whisperBorder,
      }}
    >
      <h3
        className="text-xl font-semibold mb-2"
        style={{ color: themeColors.inkPrimary }}
      >
        Campaign performance
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: themeColors.mutedSlate }}
      >
        Best and lowest performing campaigns
      </p>

      {/* Top Performers */}
      <div className="mb-8">
        <p
          className="text-xs font-semibold mb-4"
          style={{ color: themeColors.steelSecondary }}
        >
          TOP PERFORMERS
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: themeColors.whisperBorder }}
            >
              <th
                className="text-left py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Campaign
              </th>
              <th
                className="text-right py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Call volume
              </th>
              <th
                className="text-right py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Violations
              </th>
            </tr>
          </thead>
          <tbody>
            {bestPerforming.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b"
                style={{ borderColor: themeColors.whisperBorder }}
              >
                <td
                  className="py-3 px-0"
                  style={{ color: themeColors.inkPrimary }}
                >
                  {campaign.name}
                </td>
                <td className="text-right py-3 px-0" style={{ color: themeColors.inkPrimary }}>
                  {campaign.callVolume.toLocaleString()}
                </td>
                <td className="text-right py-3 px-0">
                  <span
                    className="inline-block px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: isDark ? 'rgba(38, 211, 102, 0.2)' : colors.light.greenSoft,
                      color: isDark ? colors.dark.newtechGreen : colors.light.newtechGreen,
                    }}
                  >
                    {campaign.complianceViolations}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Needs Attention */}
      <div>
        <p
          className="text-xs font-semibold mb-4"
          style={{ color: themeColors.steelSecondary }}
        >
          NEEDS ATTENTION
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: themeColors.whisperBorder }}
            >
              <th
                className="text-left py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Campaign
              </th>
              <th
                className="text-right py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Call volume
              </th>
              <th
                className="text-right py-2 px-0 font-semibold"
                style={{ color: themeColors.steelSecondary }}
              >
                Violations
              </th>
            </tr>
          </thead>
          <tbody>
            {lowestPerforming.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b"
                style={{ borderColor: themeColors.whisperBorder }}
              >
                <td
                  className="py-3 px-0"
                  style={{ color: themeColors.inkPrimary }}
                >
                  {campaign.name}
                </td>
                <td className="text-right py-3 px-0" style={{ color: themeColors.inkPrimary }}>
                  {campaign.callVolume.toLocaleString()}
                </td>
                <td className="text-right py-3 px-0">
                  <span
                    className="inline-block px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: isDark ? 'rgba(244, 63, 94, 0.2)' : colors.light.dangerBg,
                      color: isDark ? colors.dark.danger : colors.light.danger,
                    }}
                  >
                    {campaign.complianceViolations}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignPerformanceCard;
