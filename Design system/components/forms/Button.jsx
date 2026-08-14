import React from "react";

export function Button({ label, tone = "primary", onClick, fullWidth = false }) {
  const tones = {
    primary: { bg: "var(--accent-primary)", color: "#fff" },
    secondary: { bg: "var(--accent-interactive)", color: "#fff" },
  };
  const t = tones[tone] || tones.primary;
  return (
    <button onClick={onClick} style={{
      flex: fullWidth ? 1 : "none", padding: "12px 20px", borderRadius: "var(--radius-pill)",
      border: "none", cursor: "pointer", background: t.bg, color: t.color,
      font: "700 15px/1.4 var(--font-sans)"
    }}>{label}</button>
  );
}
