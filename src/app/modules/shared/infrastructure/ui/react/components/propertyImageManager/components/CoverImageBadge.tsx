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
      <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 sm:gap-1 shadow-md z-10">
        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
        <span className="xs:inline">Cover</span>
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
        className="absolute top-1 left-1 sm:bottom-auto sm:top-1 bg-black/70 hover:bg-black/80 active:bg-black/90 text-white rounded text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1 transition-all opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 z-10 px-1.5 sm:px-2 py-0.5 touch-manipulation"
        aria-label="Set as cover image"
      >
        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        <span className="hidden xs:inline">Set as Cover</span>
      </button>
    );
  }

  return null;
};
