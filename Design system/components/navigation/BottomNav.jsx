import React from "react";

export function BottomNav({ items, activeIndex = 0, onChange }) {
  return (
    <div style={{
      display: "flex", background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)", padding: "8px 4px"
    }}>
      {items.map((it, i) => {
        const active = i === activeIndex;
        return (
          <button key={it.label} onClick={() => onChange && onChange(i)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            background: "none", border: "none", cursor: "pointer", padding: "6px 4px",
            color: active ? "var(--accent-interactive)" : "var(--text-secondary)"
          }}>
            {it.icon}
            <span style={{ font: "var(--text-micro)", fontWeight: active ? 700 : 400 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
