'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type ContrastMode, type FontSize, type ThemeType } from '../../contexts/theme/theme.context';

// eslint-disable-next-line max-lines-per-function
export const ThemeProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [theme, setThemeState] = useState<ThemeType>('luxury');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [contrastMode, setContrastModeState] = useState<ContrastMode>('normal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load preferences from localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    const savedContrast = localStorage.getItem('contrastMode') as ContrastMode;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';

    if (savedTheme) setThemeState(savedTheme);
    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedContrast) setContrastModeState(savedContrast);
    setIsDarkMode(savedDarkMode);
    setReducedMotion(savedReducedMotion);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Apply theme
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));

    // Apply font size
    root.setAttribute('data-font-size', fontSize);
    localStorage.setItem('fontSize', fontSize);

    // Apply contrast mode
    root.setAttribute('data-contrast', contrastMode);
    localStorage.setItem('contrastMode', contrastMode);

    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    localStorage.setItem('reducedMotion', String(reducedMotion));
  }, [theme, fontSize, contrastMode, isDarkMode, reducedMotion, mounted]);

  const setTheme = (newTheme: ThemeType): void => {
    setThemeState(newTheme);
  };

  const setFontSize = (size: FontSize): void => {
    setFontSizeState(size);
  };

  const setContrastMode = (mode: ContrastMode): void => {
    setContrastModeState(mode);
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(prev => !prev);
  };

  const toggleReducedMotion = (): void => {
    setReducedMotion(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        contrastMode,
        setContrastMode,
        isDarkMode,
        toggleDarkMode,
        reducedMotion,
        toggleReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
