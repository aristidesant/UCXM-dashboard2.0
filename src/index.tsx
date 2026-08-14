import React from 'react';
import ReactDOM from 'react-dom/client';
import { colors, typography, spacing, fontFamily } from './design';

// Test that design tokens are properly exported
console.log('Design tokens loaded:', { colors, typography, spacing, fontFamily });

const App = () => {
  return (
    <div style={{ fontFamily, backgroundColor: colors.light.bgPrimary, color: colors.light.darkGray }}>
      <h1 style={{ fontSize: typography.display.fontSize, fontWeight: typography.display.fontWeight }}>
        Localization Campaign Management
      </h1>
      <p style={{ fontSize: typography.body.fontSize, fontWeight: typography.body.fontWeight }}>
        Design tokens successfully loaded.
      </p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
