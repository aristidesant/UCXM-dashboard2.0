import React from "react";

export function StatCard({ label, value, delta, deltaTone = "negative", meta, size = "sm" }) {
  return (
    <div style={{
      background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)", padding: 16,
      display: "flex", flexDirection: "column", gap: 8, minWidth: 150
    }}>
      <div style={{ width: 24, height: 3, borderRadius: 2, background: "var(--accent-interactive-tint)" }} />
      <div style={{ font: "var(--text-caption)", fontWeight: 600, color: "var(--text-secondary)" }}>{label}</div>
      <div style={{
        font: size === "lg" ? "var(--text-display)" : "700 22px/1.15 var(--font-sans)",
        color: "var(--text-primary)"
      }}>{value}</div>
      {(delta || meta) && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", font: "var(--text-caption)", color: "var(--text-secondary)" }}>
          {delta && <span style={{ color: deltaTone === "negative" ? "var(--text-negative)" : "var(--text-positive)", fontWeight: 700 }}>{delta}</span>}
          {meta && <span>{meta}</span>}
        </div>
      )}
    </div>
  );
}
