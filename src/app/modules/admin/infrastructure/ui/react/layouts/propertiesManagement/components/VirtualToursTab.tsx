import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line max-lines-per-function
export const VirtualToursTab = (): React.ReactElement => {
  const [loadedIframes, setLoadedIframes] = useState<Record<number, boolean>>({});

  const form = useFormContext<PropertyFormValues>();
  const views360Url = form.watch('views360Url');

  const handleAddTour = useCallback((): void => {
    form.setValue('views360Url', [...views360Url, '']);
  }, [views360Url, form]);

  const handleRemoveTour = useCallback(
    (index: number): void => {
      const tours = [...views360Url];
      tours.splice(index, 1);
      form.setValue('views360Url', tours);
      // Limpiar el estado de carga del iframe eliminado
      setLoadedIframes(prev => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    },
    [views360Url, form]
  );

  const handleTourChange = useCallback(
    (index: number, value: string): void => {
      const tours = [...views360Url];
      tours[index] = value;
      form.setValue('views360Url', tours);
      // Resetear el estado de carga cuando cambia la URL
      setLoadedIframes(prev => ({
        ...prev,
        [index]: false,
      }));
    },
    [views360Url, form]
  );

  const handlePreviewTour = useCallback((url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleIframeLoad = useCallback((index: number): void => {
    setLoadedIframes(prev => ({
      ...prev,
      [index]: true,
    }));
  }, []);

  return (
    <div className="space-y-4">
      <Label>360° Virtual Tours</Label>
      <div className="space-y-4">
        {views360Url.map((url, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <div className="mb-2">
                <Label className="text-sm text-muted-foreground">Tour URL {index + 1}</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  value={url}
                  onChange={e => handleTourChange(index, e.target.value)}
                  placeholder="https://my.matterport.com/show/?m=..."
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveTour(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePreviewTour(url)}
                  disabled={!loadedIframes[index] || !url}
                  title={loadedIframes[index] ? 'Open in new tab' : 'Waiting for preview to load...'}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src={url}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`Virtual Tour ${index + 1}`}
                  onLoad={() => handleIframeLoad(index)}
                />
              </div>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" className="w-full" onClick={handleAddTour}>
          <Plus className="h-4 w-4 mr-2" />
          Add 360° Virtual Tour
        </Button>
      </div>
    </div>
  );
};

VirtualToursTab.displayName = 'VirtualToursTab';
