import React from "react";

export function FilterRow({ label = "Filtros", summary, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
      padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)",
      background: "var(--surface-card)", cursor: "pointer"
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, font: "700 15px/1.4 var(--font-sans)", color: "var(--text-primary)" }}>
        <i data-lucide="list-filter" style={{ width: 18, height: 18 }}></i>{label}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 4, font: "var(--text-caption)", color: "var(--text-secondary)" }}>
        {summary}<i data-lucide="chevron-right" style={{ width: 16, height: 16 }}></i>
      </span>
    </button>
  );
}
