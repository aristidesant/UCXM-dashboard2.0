import React from "react";

export function BackgroundWash({ children, style }) {
  return (
    <div style={{
      minHeight: "100%", background: "var(--surface-app)",
      backgroundImage: "var(--bg-app-gradient)", backgroundAttachment: "fixed",
      ...style
    }}>{children}</div>
  );
}
