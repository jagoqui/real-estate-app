import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import React from 'react';

interface FilterToggleButtonProps {
  showFilters: boolean;
  onToggle: () => void;
}

export const FilterToggleButton = ({ showFilters, onToggle }: FilterToggleButtonProps): React.ReactElement => {
  return (
    <Button
      onClick={onToggle}
      className="absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg border border-border"
      size="sm"
      variant="outline"
    >
      {showFilters ? <X className="h-4 w-4 mr-2" /> : <Search className="h-4 w-4 mr-2" />}
      {showFilters ? 'Close' : 'Filters'}
    </Button>
  );
};
