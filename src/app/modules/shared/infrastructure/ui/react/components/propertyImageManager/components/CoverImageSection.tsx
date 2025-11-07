import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ImagePlus, X } from 'lucide-react';
import React, { useRef } from 'react';

interface CoverImageSectionProps {
  coverImage: { file: File; preview: string } | null;
  onCoverImageChange: (file: File) => void;
  onRemoveCoverImage: () => void;
  maxFileSize: number;
  acceptedTypes: Array<string>;
}

export const CoverImageSection = ({
  coverImage,
  onCoverImageChange,
  onRemoveCoverImage,
  maxFileSize,
  acceptedTypes,
}: CoverImageSectionProps): React.ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      onCoverImageChange(file);
    }
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Cover Image</Label>
        <span className="text-xs text-muted-foreground">Main property image</span>
      </div>

      {coverImage ? (
        <div className="relative group rounded-lg overflow-hidden border-2 border-primary bg-muted">
          <img src={coverImage.preview} alt="Cover" className="w-full h-48 sm:h-64 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={onRemoveCoverImage}
              className="h-8 w-8 opacity-90 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white text-sm font-medium truncate">{coverImage.file.name}</p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="w-full h-48 sm:h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-3 group"
        >
          <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
            <ImagePlus className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Click to upload cover image</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to {maxFileSize}MB</p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
