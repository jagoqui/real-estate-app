import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react';

interface CoverImagePreviewProps {
  preview: string;
  fileName: string;
  onRemove: () => void;
}

export const CoverImagePreview = ({ preview, fileName, onRemove }: CoverImagePreviewProps): React.ReactElement => {
  return (
    <div className="relative group rounded-lg overflow-hidden border-2 border-primary bg-muted">
      <img src={preview} alt="Cover" className="w-full h-48 sm:h-64 object-cover" />
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 opacity-90 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-white text-sm font-medium truncate">{fileName}</p>
      </div>
    </div>
  );
};
