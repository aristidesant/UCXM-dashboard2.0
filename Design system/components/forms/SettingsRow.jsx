import React from "react";

export function SettingsRow({ icon, iconBg, title, subtitle, control, danger = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
      background: "var(--surface-row)", borderRadius: "var(--radius-md)"
    }}>
      {icon && (
        <div style={{
          width: 32, height: 32, borderRadius: "var(--radius-pill)", background: iconBg || "var(--accent-primary-tint)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--accent-primary)"
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "700 15px/1.4 var(--font-sans)", color: danger ? "var(--text-negative)" : "var(--text-primary)" }}>{title}</div>
        {subtitle && <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {control}
    </div>
  );
}
