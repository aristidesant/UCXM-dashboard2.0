// src/design/effects.ts
// Design tokens defined in design.md specification

export const borderRadius = {
  sm: 10,      // --radius-sm
  md: 14,      // --radius-md
  lg: 20,      // --radius-lg
  pill: 999,   // --radius-pill
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLayer2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
};
