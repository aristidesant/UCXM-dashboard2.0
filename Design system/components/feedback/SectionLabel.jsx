import React from "react";

export function SectionLabel({ children }) {
  return (
    <div style={{
      font: "700 11px/1.3 var(--font-sans)", letterSpacing: "0.04em",
      textTransform: "uppercase", color: "var(--text-secondary)"
    }}>{children}</div>
  );
}
