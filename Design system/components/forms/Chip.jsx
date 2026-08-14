import React from "react";

export function Chip({ label, active = false, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 14px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer",
      background: active ? "var(--accent-primary-tint)" : "var(--surface-row)",
      color: active ? "var(--accent-primary)" : "var(--text-primary)",
      font: "700 13px/1.35 var(--font-sans)"
    }}>{icon}{label}</button>
  );
}
