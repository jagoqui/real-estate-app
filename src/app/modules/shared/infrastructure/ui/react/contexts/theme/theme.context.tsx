import { createContext, useContext } from 'react';

export type ThemeType = 'luxury' | 'modern' | 'classic' | 'minimal' | 'ocean';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export type ContrastMode = 'normal' | 'high' | 'higher';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
