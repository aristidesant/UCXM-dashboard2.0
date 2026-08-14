import React from "react";

export function ListRow({ avatar, title, subtitle, subtitleTone = "muted", meta, trailing }) {
  const subtitleColor = subtitleTone === "positive" ? "var(--text-positive)" : "var(--text-secondary)";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 16px", background: "var(--surface-row)", borderRadius: "var(--radius-md)"
    }}>
      {avatar && (
        <div style={{
          width: 36, height: 36, borderRadius: "var(--radius-pill)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: avatar.bg || "var(--accent-primary-tint)", color: avatar.color || "var(--accent-primary)"
        }}>{avatar.content}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          font: "700 15px/1.4 var(--font-sans)", color: "var(--text-primary)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>{title}</div>
        {subtitle && <div style={{ font: "var(--text-caption)", color: subtitleColor, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {meta && <div style={{ font: "var(--text-caption)", color: "var(--text-secondary)" }}>{meta}</div>}
      {trailing}
    </div>
  );
}
