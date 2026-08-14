import React from "react";

export function SegmentedControl({ options, activeIndex = 0, onChange }) {
  return (
    <div style={{ display: "flex", background: "var(--surface-row)", borderRadius: "var(--radius-pill)", padding: 4 }}>
      {options.map((o, i) => (
        <button key={o} onClick={() => onChange && onChange(i)} style={{
          flex: 1, padding: "10px 12px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer",
          background: i === activeIndex ? "var(--surface-card)" : "transparent",
          boxShadow: i === activeIndex ? "var(--shadow-card)" : "none",
          font: "var(--text-body)", fontWeight: 700,
          color: i === activeIndex ? "var(--text-primary)" : "var(--text-secondary)"
        }}>{o}</button>
      ))}
    </div>
  );
}
