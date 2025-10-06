import { createContext, useContext } from 'react';

export type ThemeType = 'luxury' | 'modern' | 'classic' | 'minimal' | 'ocean';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export type ContrastMode = 'normal' | 'high' | 'higher';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  fontSize: FontSize;
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>;
  contrastMode: ContrastMode;
  setContrastMode: React.Dispatch<React.SetStateAction<ContrastMode>>;
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
