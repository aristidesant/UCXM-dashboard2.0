import React from "react";

export function Badge({ label, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "var(--surface-row)", color: "var(--text-secondary)" },
    positive: { bg: "var(--accent-primary-tint)", color: "var(--accent-primary)" },
    info: { bg: "var(--accent-interactive-tint)", color: "var(--accent-interactive)" },
    negative: { bg: "var(--red-100)", color: "var(--red-500)" }
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "4px 10px",
      borderRadius: "var(--radius-pill)", background: t.bg, color: t.color,
      font: "700 13px/1.35 var(--font-sans)"
    }}>{label}</span>
  );
}
