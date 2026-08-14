import React from "react";

export function NavHeader({ title, onBack, leading, trailing }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px"
    }}>
      <div style={{ width: 32, display: "flex", justifyContent: "flex-start" }}>
        {onBack ? (
          <button onClick={onBack} aria-label="Back" style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            color: "var(--text-secondary)", display: "flex"
          }}>
            {leading || <i data-lucide="chevron-left" style={{ width: 22, height: 22 }}></i>}
          </button>
        ) : leading}
      </div>
      <div style={{ font: "var(--text-heading)", color: "var(--text-primary)", textAlign: "center", flex: 1 }}>{title}</div>
      <div style={{ width: 32, display: "flex", justifyContent: "flex-end" }}>{trailing}</div>
    </div>
  );
}
