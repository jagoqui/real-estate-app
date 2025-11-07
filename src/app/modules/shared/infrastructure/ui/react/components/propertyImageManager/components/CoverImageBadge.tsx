import { Star } from 'lucide-react';
import React from 'react';

interface CoverImageBadgeProps {
  isCover: boolean;
  onSetAsCover?: () => void;
  showSetButton?: boolean;
}

export const CoverImageBadge = ({
  isCover,
  onSetAsCover,
  showSetButton = true,
}: CoverImageBadgeProps): React.ReactElement | null => {
  if (isCover) {
    return (
      <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 shadow-md z-10">
        <Star className="h-3 w-3 fill-current" />
        Cover
      </div>
    );
  }

  if (showSetButton && onSetAsCover) {
    return (
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSetAsCover();
        }}
        className="absolute bottom-1 left-1 bg-black/50 hover:bg-black/70 text-white rounded text-xs font-medium flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 z-10 p-0.5"
      >
        <Star className="h-3 w-3" />
        Set as Cover
      </button>
    );
  }

  return null;
};
