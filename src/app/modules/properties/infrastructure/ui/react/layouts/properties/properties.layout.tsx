import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { PropertySearch } from '@/modules/shared/infrastructure/ui/react/components/propertySearch/propertySearch';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, Heart, Mail, MapPin, Maximize } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

const getStatusBadgeClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'sold':
      return 'bg-destructive text-destructive-foreground';
    case 'available':
      return 'bg-green-600 text-white';
    case 'pending':
      return 'bg-yellow-600 text-white';
    case 'rented':
      return 'bg-blue-600 text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCardImage = ({ property }: PropertyCardProps): React.ReactElement => (
  <div className="relative h-64 overflow-hidden flex-shrink-0">
    <img
      src={property.coverImage || property.images[0] || '/placeholder.svg'}
      alt={property.name}
      className="object-cover group-hover:scale-110 transition-transform duration-500 size-full"
    />
    <Badge className={`absolute top-4 left-4 ${getStatusBadgeClass(property.status)}`}>
      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
    </Badge>
    {property.featured && <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Featured</Badge>}
    <Button
      size="icon"
      variant="secondary"
      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={e => e.preventDefault()}
    >
      <Heart className="h-4 w-4" />
    </Button>
  </div>
);

const PropertyCardContent = ({ property }: PropertyCardProps): React.ReactElement => (
  <CardContent className="p-6 flex flex-col flex-grow">
    <div className="mb-3">
      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground line-clamp-2 min-h-[3.5rem]">
        {property.name}
      </h3>
    </div>

    <div className="flex items-center gap-2 text-muted-foreground mb-4">
      <MapPin className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm line-clamp-1">
        {property.city}, {property.state}, {property.country}
      </span>
    </div>

    <div className="flex items-center gap-2 mb-4">
      <Badge variant="outline" className="text-xs">
        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
      </Badge>
    </div>

    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Bed className="h-4 w-4" />
        <span>{property.bedrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Bath className="h-4 w-4" />
        <span>{property.bathrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Maximize className="h-4 w-4" />
        <span>{property.area}m²</span>
      </div>
    </div>

    <div className="pt-4 border-t border-border mt-auto">
      <p className="text-2xl sm:text-3xl font-bold text-foreground">{formatPrice(property.price)}</p>
    </div>

    <Button className="w-full mt-4 gap-2 bg-transparent" variant="outline" onClick={e => e.preventDefault()}>
      <Mail className="h-4 w-4" />
      Contact Agent
    </Button>
  </CardContent>
);

const PropertyCard = ({ property }: PropertyCardProps): React.ReactElement => (
  <Link to={property.id} key={property.id}>
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <PropertyCardImage property={property} />
      <PropertyCardContent property={property} />
    </Card>
  </Link>
);

const SortControls = ({
  sortBy,
  setSortBy,
  isPending,
  count,
}: {
  sortBy: string;
  setSortBy: (value: string) => void;
  isPending: boolean;
  count: number;
}): React.ReactElement => (
  <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
    <p className="text-muted-foreground">
      {isPending ? 'Loading properties...' : `${count} ${count === 1 ? 'property' : 'properties'} available`}
    </p>

    <div className="flex items-center gap-2">
      <Label htmlFor="sort-select" className="text-sm">
        Sort by:
      </Label>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger id="sort-select" className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="area-desc">Area: Largest First</SelectItem>
          <SelectItem value="area-asc">Area: Smallest First</SelectItem>
          <SelectItem value="year-desc">Year: Newest First</SelectItem>
          <SelectItem value="year-asc">Year: Oldest First</SelectItem>
          <SelectItem value="bedrooms-desc">Bedrooms: Most First</SelectItem>
          <SelectItem value="bedrooms-asc">Bedrooms: Least First</SelectItem>
          <SelectItem value="status-asc">Status: A to Z</SelectItem>
          <SelectItem value="status-desc">Status: Z to A</SelectItem>
          <SelectItem value="type-asc">Type: A to Z</SelectItem>
          <SelectItem value="type-desc">Type: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const PropertyGrid = ({
  isPending,
  properties,
}: {
  isPending: boolean;
  properties: Array<Property>;
}): React.ReactElement => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {isPending ? (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">Loading properties...</p>
      </div>
    ) : (
      properties.map(property => <PropertyCard key={property.id} property={property} />)
    )}
  </div>
);

export const PropertiesLayout = (): React.ReactElement => {
  const [sortBy, setSortBy] = useState<string>('price-desc');
  const [properties, setProperties] = useState<Array<Property>>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  // Handle results from PropertySearch in emit mode
  const handleSearchResults = useCallback((searchProperties: Array<Property>, searchIsPending: boolean): void => {
    setProperties(searchProperties);
    setIsPending(searchIsPending);
  }, []);

  // Client-side sorting
  const sortedProperties = useMemo(() => {
    if (!properties) return [];

    const sorted = [...properties];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'area-asc':
        return sorted.sort((a, b) => a.area - b.area);
      case 'area-desc':
        return sorted.sort((a, b) => b.area - a.area);
      case 'year-asc':
        return sorted.sort((a, b) => a.buildYear - b.buildYear);
      case 'year-desc':
        return sorted.sort((a, b) => b.buildYear - a.buildYear);
      case 'bedrooms-desc':
        return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
      case 'bedrooms-asc':
        return sorted.sort((a, b) => a.bedrooms - b.bedrooms);
      case 'status-asc':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      case 'status-desc':
        return sorted.sort((a, b) => b.status.localeCompare(a.status));
      case 'type-asc':
        return sorted.sort((a, b) => a.type.localeCompare(b.type));
      case 'type-desc':
        return sorted.sort((a, b) => b.type.localeCompare(a.type));
      default:
        return sorted;
    }
  }, [properties, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* PropertySearch Component in emit mode */}
      <PropertySearch
        mode="emit"
        title="Exclusive Properties"
        subtitle="Discover our curated selection of luxury properties in the world's most prestigious locations"
        onResultsChange={handleSearchResults}
      />

      <main className="container mx-auto px-4 py-12">
        {/* Sort Controls */}
        <SortControls sortBy={sortBy} setSortBy={setSortBy} isPending={isPending} count={sortedProperties.length} />

        {/* Property Grid */}
        <PropertyGrid isPending={isPending} properties={sortedProperties} />

        {/* Empty State */}
        {!isPending && sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No properties found</p>
          </div>
        )}
      </main>
    </div>
  );
};
