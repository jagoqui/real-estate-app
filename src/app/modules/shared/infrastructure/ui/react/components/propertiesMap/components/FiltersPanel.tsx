import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface PropertyFilters {
  search: string;
  priceRange: [number, number];
}

interface FiltersPanelProps {
  filters: PropertyFilters;
  maxPrice: number;
  totalProperties: number;
  filteredCount: number;
  onFiltersChange: (filters: PropertyFilters) => void;
  onResetFilters: () => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export const FiltersPanel = ({
  filters,
  maxPrice,
  totalProperties,
  filteredCount,
  onFiltersChange,
  onResetFilters,
}: FiltersPanelProps): React.ReactElement => {
  const hasActiveFilters = filters.search !== '' || filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice;

  return (
    <Card className="absolute top-16 left-4 z-[1000] w-80 p-4 bg-background/95 backdrop-blur-sm shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="h-8 gap-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search Location</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="City, address, or property name..."
            value={filters.search}
            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price Range</Label>
        <div className="space-y-2">
          <Slider
            value={filters.priceRange}
            onValueChange={value => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
            max={maxPrice}
            step={10000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{' '}
          <span className="font-semibold text-foreground">{totalProperties}</span> properties
        </p>
      </div>
    </Card>
  );
};
