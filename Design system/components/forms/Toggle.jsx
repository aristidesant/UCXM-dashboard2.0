import React from "react";

export function Toggle({ checked = false, onChange, disabled = false }) {
  return (
    <button role="switch" aria-checked={checked} disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 51, height: 31, borderRadius: "var(--radius-pill)", border: "none",
        padding: 2, cursor: disabled ? "default" : "pointer",
        background: checked ? "var(--accent-primary)" : "var(--gray-200)",
        display: "flex", justifyContent: checked ? "flex-end" : "flex-start",
        transition: "background 0.2s ease"
      }}>
      <span style={{
        width: 27, height: 27, borderRadius: "var(--radius-pill)", background: "var(--white)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)"
      }} />
    </button>
  );
}
