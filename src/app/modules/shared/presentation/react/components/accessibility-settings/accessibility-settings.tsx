import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Eye, Globe, Palette, Settings, Type, Zap } from 'lucide-react';
import { useState } from 'react';
import { useThemeContext, type ContrastMode, type FontSize, type ThemeType } from '../../contexts/theme/theme.context';

interface AccessibilitySettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// eslint-disable-next-line max-lines-per-function
export const AccessibilitySettings = ({ open, onOpenChange }: AccessibilitySettingsProps = {}): React.ReactElement => {
  const {
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
  } = useThemeContext();

  const [language, setLanguage] = useState<string>('en');
  const [currency, setCurrency] = useState<string>('usd');

  const themes = [
    { value: 'luxury', label: 'Luxury', description: 'Elegant and sophisticated with warm tones' },
    { value: 'modern', label: 'Modern', description: 'Clean and contemporary with vibrant accents' },
    { value: 'classic', label: 'Classic', description: 'Traditional and timeless with neutral tones' },
    { value: 'minimal', label: 'Minimal', description: 'Minimalist and spacious with soft grays' },
    { value: 'ocean', label: 'Ocean', description: 'Fresh and serene with deep blues' },
  ];

  const dialogProps = open !== undefined && onOpenChange !== undefined ? { open, onOpenChange } : {};

  return (
    <Dialog {...dialogProps}>
      {open === undefined && (
        <Button variant="ghost" size="icon" className="relative" aria-label={'Accessibility and Theme Settings'}>
          <Settings className="w-5 h-5" />
        </Button>
      )}
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings className="w-5 h-5" />
            Accessibility & Personalization
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="themes" className="w-full min-h-[640px]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="themes" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="gap-2">
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="contrast" className="gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Contrast</span>
            </TabsTrigger>
            <TabsTrigger value="motion" className="gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Motion</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="themes" className="space-y-4 mt-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Select a theme</h3>
              <RadioGroup value={theme} onValueChange={value => setTheme(value as ThemeType)}>
                <div className="grid gap-3">
                  {themes.map(t => (
                    <div
                      key={t.value}
                      className={`flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        theme === t.value ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => setTheme(t.value as ThemeType)}
                    >
                      <RadioGroupItem value={t.value} id={t.value} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={t.value} className="cursor-pointer font-medium">
                          {t.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-md theme-preview-${t.value}`} />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">Reduces screen brightness</p>
              </div>
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 mt-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Font size</h3>
              <RadioGroup value={fontSize} onValueChange={value => setFontSize(value as FontSize)}>
                <div className="grid gap-3">
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      fontSize === 'small' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setFontSize('small')}
                  >
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="cursor-pointer flex-1 text-sm">
                      Small - Compact text
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      fontSize === 'medium' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setFontSize('medium')}
                  >
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer flex-1 text-base">
                      Medium - Standard size
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      fontSize === 'large' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setFontSize('large')}
                  >
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large" className="cursor-pointer flex-1 text-lg">
                      Large - Bigger and more readable
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      fontSize === 'xlarge' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setFontSize('xlarge')}
                  >
                    <RadioGroupItem value="xlarge" id="xlarge" />
                    <Label htmlFor="xlarge" className="cursor-pointer flex-1 text-xl">
                      Extra Large - Maximum readability
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="contrast" className="space-y-4 mt-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Contrast level</h3>
              <RadioGroup value={contrastMode} onValueChange={value => setContrastMode(value as ContrastMode)}>
                <div className="grid gap-3">
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      contrastMode === 'normal'
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setContrastMode('normal')}
                  >
                    <RadioGroupItem value="normal" id="normal" />
                    <div className="flex-1">
                      <Label htmlFor="normal" className="cursor-pointer font-medium">
                        Normal
                      </Label>
                      <p className="text-sm text-muted-foreground">Standard contrast</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      contrastMode === 'high'
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setContrastMode('high')}
                  >
                    <RadioGroupItem value="high" id="high" />
                    <div className="flex-1">
                      <Label htmlFor="high" className="cursor-pointer font-medium">
                        High
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Greater difference between colors for improved visibility
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      contrastMode === 'higher'
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setContrastMode('higher')}
                  >
                    <RadioGroupItem value="higher" id="higher" />
                    <div className="flex-1">
                      <Label htmlFor="higher" className="cursor-pointer font-medium">
                        Very High
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Maximum contrast between text and background for improved readability
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="motion" className="space-y-4 mt-6">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <Label htmlFor="reduced-motion" className="font-medium">
                  Reduce motion
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Minimizes animations and transitions to reduce dizziness
                </p>
              </div>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={toggleReducedMotion} />
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-6 mt-6">
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </h3>
              <RadioGroup value={language} onValueChange={(value: string) => setLanguage(value)}>
                <div className="grid gap-3">
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      language === 'es' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setLanguage('es')}
                  >
                    <RadioGroupItem value="es" id="lang-es" />
                    <div className="flex-1">
                      <Label htmlFor="lang-es" className="cursor-pointer font-medium">
                        Spanish
                      </Label>
                      <p className="text-sm text-muted-foreground">Spanish - Default language</p>
                    </div>
                    <span className="text-2xl">🇪🇸</span>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      language === 'en' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setLanguage('en')}
                  >
                    <RadioGroupItem value="en" id="lang-en" />
                    <div className="flex-1">
                      <Label htmlFor="lang-en" className="cursor-pointer font-medium">
                        English
                      </Label>
                      <p className="text-sm text-muted-foreground">English - Default language</p>
                    </div>
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Currency
              </h3>
              <RadioGroup value={currency} onValueChange={(value: string) => setCurrency(value)}>
                <div className="grid gap-3">
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      currency === 'USD' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setCurrency('USD')}
                  >
                    <RadioGroupItem value="USD" id="curr-usd" />
                    <div className="flex-1">
                      <Label htmlFor="curr-usd" className="cursor-pointer font-medium">
                        USD - US Dollar
                      </Label>
                      <p className="text-sm text-muted-foreground">United States Dollar ($)</p>
                    </div>
                    <span className="text-xl font-bold">$</span>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      currency === 'EUR' ? 'border-primary bg-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => setCurrency('EUR')}
                  >
                    <RadioGroupItem value="EUR" id="curr-eur" />
                    <div className="flex-1">
                      <Label htmlFor="curr-eur" className="cursor-pointer font-medium">
                        EUR - Euro
                      </Label>
                      <p className="text-sm text-muted-foreground">European Euro (€)</p>
                    </div>
                    <span className="text-xl font-bold">€</span>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
