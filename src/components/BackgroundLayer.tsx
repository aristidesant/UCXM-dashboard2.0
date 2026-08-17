import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundLayer: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  const backgroundGradient = isDark
    ? `radial-gradient(circle at 95% 5%, rgba(38, 211, 102, 0.15) 0%, rgba(11, 15, 20, 0) 25%),
       radial-gradient(ellipse 900px 700px at 50% 120%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 45%),
       radial-gradient(ellipse 800px 900px at -20% 105%, rgba(38, 211, 102, 0.1) 0%, rgba(11, 15, 20, 0) 55%)`
    : `radial-gradient(circle at 95% 5%, rgba(27, 181, 74, 0.1) 0%, rgba(247, 248, 250, 0) 25%),
       radial-gradient(ellipse 900px 700px at 50% 120%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 45%),
       radial-gradient(ellipse 800px 900px at -20% 105%, rgba(27, 181, 74, 0.08) 0%, rgba(247, 248, 250, 0) 55%)`;

  React.useEffect(() => {
    // Inject background style into document
    const styleId = 'background-layer-style';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }

    const cssText = `
      html::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: ${backgroundGradient};
        pointer-events: none;
        z-index: -1;
      }
    `;

    style.textContent = cssText;
    console.log('Background layer CSS injected:', { isDark, hasGradient: !!backgroundGradient });
  }, [isDark, backgroundGradient]);

  return null;
};
