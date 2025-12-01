import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { AccessibilitySettings } from '../accessibility-settings/accessibility-settings';

export const FloatingAccessibilityButton = (): React.ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 right-3 z-50">
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Configuración de accesibilidad y temas"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <AccessibilitySettings open={open} onOpenChange={setOpen} />
    </>
  );
};
