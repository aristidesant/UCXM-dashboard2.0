import React from "react";

export function RadioDot({ selected = false, onSelect }) {
  return (
    <button onClick={onSelect} aria-pressed={selected} style={{
      width: 22, height: 22, borderRadius: "var(--radius-pill)",
      border: selected ? "none" : "2px solid var(--gray-300)",
      background: selected ? "var(--accent-primary)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0
    }}>
      {selected && <span style={{ width: 8, height: 8, borderRadius: "var(--radius-pill)", background: "var(--white)" }} />}
    </button>
  );
}
