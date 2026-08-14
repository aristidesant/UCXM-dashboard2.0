import React from "react";

export function SearchBar({ placeholder = "Buscar...", onFilterClick }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", gap: 8,
        background: "var(--surface-row)", borderRadius: "var(--radius-md)", padding: "10px 14px"
      }}>
        <i data-lucide="search" style={{ width: 18, height: 18, color: "var(--text-secondary)" }}></i>
        <span style={{ font: "var(--text-body)", color: "var(--text-tertiary)" }}>{placeholder}</span>
      </div>
      <button onClick={onFilterClick} style={{
        width: 44, height: 44, borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer",
        background: "var(--gray-900)", color: "var(--white)", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0
      }}><i data-lucide="sliders-horizontal" style={{ width: 18, height: 18 }}></i></button>
    </div>
  );
}
