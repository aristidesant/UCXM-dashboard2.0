import React from "react";

export function TopTabs({ tabs, activeIndex = 0, onChange }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)" }}>
      {tabs.map((t, i) => (
        <button key={t} onClick={() => onChange && onChange(i)} style={{
          flex: 1, padding: "12px 8px", background: "none", border: "none", cursor: "pointer",
          font: "var(--text-body)", fontWeight: i === activeIndex ? 700 : 400,
          color: i === activeIndex ? "var(--text-primary)" : "var(--text-secondary)",
          borderBottom: i === activeIndex ? "2px solid var(--accent-interactive)" : "2px solid transparent",
          marginBottom: -1
        }}>{t}</button>
      ))}
    </div>
  );
}
