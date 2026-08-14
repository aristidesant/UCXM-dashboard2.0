import React from "react";

export function ProfileCard({ initials, name, email, badgeLabel, badgeValue }) {
  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)", padding: 16, display: "flex", alignItems: "center", gap: 12
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "var(--radius-pill)", background: "var(--accent-primary)",
        color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center",
        font: "var(--text-heading)", flexShrink: 0
      }}>{initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "700 15px/1.4 var(--font-sans)", color: "var(--text-primary)" }}>{name}</div>
        <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{email}</div>
        {badgeLabel && (
          <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
            <span style={{ font: "var(--text-micro)", color: "var(--text-secondary)", background: "var(--surface-row)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>{badgeLabel}</span>
            <span style={{ font: "700 13px/1.35 var(--font-sans)", color: "var(--text-primary)" }}>{badgeValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
