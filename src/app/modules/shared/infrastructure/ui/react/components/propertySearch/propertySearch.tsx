import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { useGetPropertiesByFilterRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetPropertiesByFilterRequest/useGetPropertiesByFilterRequest';
import { useGetPropertiesStatusesRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetPropertiesStatusesRequest/useGetPropertiesStatusesRequest';
import { useGetPropertiesTypesRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetPropertiesTypesRequest/useGetPropertiesTypesRequest';
import { Link } from '@tanstack/react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';

const MAX_PRICE = 10000000;
const MAX_BEDROOMS = 10;
const MAX_BATHROOMS = 10;
const MAX_AREA = 1000;
const MAX_YEAR = new Date().getFullYear();
const MIN_YEAR = 1800;
const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_LENGTH = 2;

// eslint-disable-next-line max-lines-per-function
export const PropertySearch = (): React.ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [bedroomsRange, setBedroomsRange] = useState([0, MAX_BEDROOMS]);
  const [bathroomsRange, setBathroomsRange] = useState([0, MAX_BATHROOMS]);
  const [areaRange, setAreaRange] = useState([0, MAX_AREA]);
  const [yearRange, setYearRange] = useState([MIN_YEAR, MAX_YEAR]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Filtros aplicados (solo se actualizan al hacer click en "Apply")
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, MAX_PRICE]);
  const [appliedBedroomsRange, setAppliedBedroomsRange] = useState([0, MAX_BEDROOMS]);
  const [appliedBathroomsRange, setAppliedBathroomsRange] = useState([0, MAX_BATHROOMS]);
  const [appliedAreaRange, setAppliedAreaRange] = useState([0, MAX_AREA]);
  const [appliedYearRange, setAppliedYearRange] = useState([MIN_YEAR, MAX_YEAR]);
  const [appliedStatus, setAppliedStatus] = useState<string>('');
  const [appliedType, setAppliedType] = useState<string>('');

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const { data: availableTypes } = useGetPropertiesTypesRequest();
  const { data: availableStatuses } = useGetPropertiesStatusesRequest();

  const filters = useMemo(
    () => ({
      name: debouncedSearchQuery || undefined,
      minPrice: appliedPriceRange[0] > 0 ? appliedPriceRange[0] : undefined,
      maxPrice: appliedPriceRange[1] < MAX_PRICE ? appliedPriceRange[1] : undefined,
      minBedrooms: appliedBedroomsRange[0] > 0 ? appliedBedroomsRange[0] : undefined,
      maxBedrooms: appliedBedroomsRange[1] < MAX_BEDROOMS ? appliedBedroomsRange[1] : undefined,
      minBathrooms: appliedBathroomsRange[0] > 0 ? appliedBathroomsRange[0] : undefined,
      maxBathrooms: appliedBathroomsRange[1] < MAX_BATHROOMS ? appliedBathroomsRange[1] : undefined,
      minArea: appliedAreaRange[0] > 0 ? appliedAreaRange[0] : undefined,
      maxArea: appliedAreaRange[1] < MAX_AREA ? appliedAreaRange[1] : undefined,
      minYear: appliedYearRange[0] > MIN_YEAR ? appliedYearRange[0] : undefined,
      maxYear: appliedYearRange[1] < MAX_YEAR ? appliedYearRange[1] : undefined,
      status: appliedStatus || undefined,
      type: appliedType || undefined,
    }),
    [
      debouncedSearchQuery,
      appliedPriceRange,
      appliedBedroomsRange,
      appliedBathroomsRange,
      appliedAreaRange,
      appliedYearRange,
      appliedStatus,
      appliedType,
    ]
  );

  const { data: properties, isPending } = useGetPropertiesByFilterRequest(filters);

  // Debounce para el search query (solo actualiza si tiene al menos 2 caracteres)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Solo actualizar si cumple el mínimo de caracteres o si está vacío (para limpiar)
      if (searchQuery.length >= MIN_SEARCH_LENGTH || searchQuery.length === 0) {
        setDebouncedSearchQuery(searchQuery);
      }
    }, DEBOUNCE_DELAY);

    return (): void => clearTimeout(timer);
  }, [searchQuery]);

  // Debounce para aplicar filtros del panel (cuando se mueven sliders)
  useEffect(() => {
    // Solo aplicar debounce si hay filtros aplicados (si el usuario ya dio click en "Apply filters")
    if (!filtersApplied) return;

    const timer = setTimeout(() => {
      setAppliedPriceRange(priceRange);
      setAppliedBedroomsRange(bedroomsRange);
      setAppliedBathroomsRange(bathroomsRange);
      setAppliedAreaRange(areaRange);
      setAppliedYearRange(yearRange);
      setAppliedStatus(selectedStatus);
      setAppliedType(selectedType);
    }, DEBOUNCE_DELAY);

    return (): void => clearTimeout(timer);
  }, [priceRange, bedroomsRange, bathroomsRange, areaRange, yearRange, selectedStatus, selectedType, filtersApplied]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setShowAutocomplete(value.length >= MIN_SEARCH_LENGTH || filtersApplied);
  };

  const handleApplyFilters = (): void => {
    // Aplicar los filtros actuales del panel
    setAppliedPriceRange(priceRange);
    setAppliedBedroomsRange(bedroomsRange);
    setAppliedBathroomsRange(bathroomsRange);
    setAppliedAreaRange(areaRange);
    setAppliedYearRange(yearRange);
    setAppliedStatus(selectedStatus);
    setAppliedType(selectedType);
    setFiltersApplied(true);
    setShowAutocomplete(true);
  };

  const handleClearFilters = (): void => {
    // Limpiar valores del panel
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setPriceRange([0, MAX_PRICE]);
    setBedroomsRange([0, MAX_BEDROOMS]);
    setBathroomsRange([0, MAX_BATHROOMS]);
    setAreaRange([0, MAX_AREA]);
    setYearRange([MIN_YEAR, MAX_YEAR]);
    setSelectedStatus('');
    setSelectedType('');

    // Limpiar filtros aplicados
    setAppliedPriceRange([0, MAX_PRICE]);
    setAppliedBedroomsRange([0, MAX_BEDROOMS]);
    setAppliedBathroomsRange([0, MAX_BATHROOMS]);
    setAppliedAreaRange([0, MAX_AREA]);
    setAppliedYearRange([MIN_YEAR, MAX_YEAR]);
    setAppliedStatus('');
    setAppliedType('');

    setShowAutocomplete(false);
    setFiltersApplied(false);
  };

  const handleRemoveFilter = (filterType: string): void => {
    switch (filterType) {
      case 'price':
        setPriceRange([0, MAX_PRICE]);
        setAppliedPriceRange([0, MAX_PRICE]);
        break;
      case 'bedrooms':
        setBedroomsRange([0, MAX_BEDROOMS]);
        setAppliedBedroomsRange([0, MAX_BEDROOMS]);
        break;
      case 'bathrooms':
        setBathroomsRange([0, MAX_BATHROOMS]);
        setAppliedBathroomsRange([0, MAX_BATHROOMS]);
        break;
      case 'area':
        setAreaRange([0, MAX_AREA]);
        setAppliedAreaRange([0, MAX_AREA]);
        break;
      case 'year':
        setYearRange([MIN_YEAR, MAX_YEAR]);
        setAppliedYearRange([MIN_YEAR, MAX_YEAR]);
        break;
      case 'status':
        setSelectedStatus('');
        setAppliedStatus('');
        break;
      case 'type':
        setSelectedType('');
        setAppliedType('');
        break;
    }

    // Mostrar autocomplete con resultados actualizados
    setShowAutocomplete(true);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <PropertySearchView
      searchQuery={searchQuery}
      priceRange={priceRange}
      bedroomsRange={bedroomsRange}
      bathroomsRange={bathroomsRange}
      areaRange={areaRange}
      yearRange={yearRange}
      selectedStatus={selectedStatus}
      selectedType={selectedType}
      showAutocomplete={showAutocomplete}
      filtersApplied={filtersApplied}
      appliedPriceRange={appliedPriceRange}
      appliedBedroomsRange={appliedBedroomsRange}
      appliedBathroomsRange={appliedBathroomsRange}
      appliedAreaRange={appliedAreaRange}
      appliedYearRange={appliedYearRange}
      appliedStatus={appliedStatus}
      appliedType={appliedType}
      properties={properties || []}
      isPending={isPending}
      availableTypes={availableTypes || []}
      availableStatuses={availableStatuses || []}
      autocompleteRef={autocompleteRef}
      onSearchChange={handleSearchChange}
      onPriceRangeChange={setPriceRange}
      onBedroomsRangeChange={setBedroomsRange}
      onBathroomsRangeChange={setBathroomsRange}
      onAreaRangeChange={setAreaRange}
      onYearRangeChange={setYearRange}
      onStatusChange={setSelectedStatus}
      onTypeChange={setSelectedType}
      onClearFilters={handleClearFilters}
      onApplyFilters={handleApplyFilters}
      onRemoveFilter={handleRemoveFilter}
      onCloseAutocomplete={() => setShowAutocomplete(false)}
      formatPrice={formatPrice}
    />
  );
};

interface PropertySearchViewProps {
  searchQuery: string;
  priceRange: Array<number>;
  bedroomsRange: Array<number>;
  bathroomsRange: Array<number>;
  areaRange: Array<number>;
  yearRange: Array<number>;
  selectedStatus: string;
  selectedType: string;
  showAutocomplete: boolean;
  filtersApplied: boolean;
  appliedPriceRange: Array<number>;
  appliedBedroomsRange: Array<number>;
  appliedBathroomsRange: Array<number>;
  appliedAreaRange: Array<number>;
  appliedYearRange: Array<number>;
  appliedStatus: string;
  appliedType: string;
  properties: Array<{ id: string; name: string; coverImage?: string; price: number; city: string; address: string }>;
  isPending: boolean;
  availableTypes: Array<string>;
  availableStatuses: Array<string>;
  autocompleteRef: React.RefObject<HTMLDivElement | null>;
  onSearchChange: (value: string) => void;
  onPriceRangeChange: (value: Array<number>) => void;
  onBedroomsRangeChange: (value: Array<number>) => void;
  onBathroomsRangeChange: (value: Array<number>) => void;
  onAreaRangeChange: (value: Array<number>) => void;
  onYearRangeChange: (value: Array<number>) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  onRemoveFilter: (filterType: string) => void;
  onCloseAutocomplete: () => void;
  formatPrice: (price: number) => string;
}

const PropertySearchView = (props: PropertySearchViewProps): React.ReactElement => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-balance">Find your ideal property</h2>
          <SearchCard {...props} />
        </div>
      </div>
    </section>
  );
};

const SearchCard = (props: PropertySearchViewProps): React.ReactElement => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
      <SearchAndFiltersBar
        searchQuery={props.searchQuery}
        showAutocomplete={props.showAutocomplete}
        properties={props.properties}
        isPending={props.isPending}
        autocompleteRef={props.autocompleteRef}
        priceRange={props.priceRange}
        bedroomsRange={props.bedroomsRange}
        bathroomsRange={props.bathroomsRange}
        areaRange={props.areaRange}
        yearRange={props.yearRange}
        selectedStatus={props.selectedStatus}
        selectedType={props.selectedType}
        availableTypes={props.availableTypes}
        availableStatuses={props.availableStatuses}
        onSearchChange={props.onSearchChange}
        onCloseAutocomplete={props.onCloseAutocomplete}
        onPriceRangeChange={props.onPriceRangeChange}
        onBedroomsRangeChange={props.onBedroomsRangeChange}
        onBathroomsRangeChange={props.onBathroomsRangeChange}
        onAreaRangeChange={props.onAreaRangeChange}
        onYearRangeChange={props.onYearRangeChange}
        onStatusChange={props.onStatusChange}
        onTypeChange={props.onTypeChange}
        onClearFilters={props.onClearFilters}
        onApplyFilters={props.onApplyFilters}
        formatPrice={props.formatPrice}
      />

      {props.filtersApplied && (
        <ActiveFilters
          appliedPriceRange={props.appliedPriceRange}
          appliedBedroomsRange={props.appliedBedroomsRange}
          appliedBathroomsRange={props.appliedBathroomsRange}
          appliedAreaRange={props.appliedAreaRange}
          appliedYearRange={props.appliedYearRange}
          appliedStatus={props.appliedStatus}
          appliedType={props.appliedType}
          onRemoveFilter={props.onRemoveFilter}
          formatPrice={props.formatPrice}
        />
      )}
    </div>
  );
};

interface SearchAndFiltersBarProps {
  searchQuery: string;
  showAutocomplete: boolean;
  properties: Array<{ id: string; name: string; coverImage?: string; price: number; city: string; address: string }>;
  isPending: boolean;
  autocompleteRef: React.RefObject<HTMLDivElement | null>;
  priceRange: Array<number>;
  bedroomsRange: Array<number>;
  bathroomsRange: Array<number>;
  areaRange: Array<number>;
  yearRange: Array<number>;
  selectedStatus: string;
  selectedType: string;
  availableTypes: Array<string>;
  availableStatuses: Array<string>;
  onSearchChange: (value: string) => void;
  onCloseAutocomplete: () => void;
  onPriceRangeChange: (value: Array<number>) => void;
  onBedroomsRangeChange: (value: Array<number>) => void;
  onBathroomsRangeChange: (value: Array<number>) => void;
  onAreaRangeChange: (value: Array<number>) => void;
  onYearRangeChange: (value: Array<number>) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  formatPrice: (price: number) => string;
}

const SearchAndFiltersBar = ({
  searchQuery,
  showAutocomplete,
  properties,
  isPending,
  autocompleteRef,
  priceRange,
  bedroomsRange,
  bathroomsRange,
  areaRange,
  yearRange,
  selectedStatus,
  selectedType,
  availableTypes,
  availableStatuses,
  onSearchChange,
  onCloseAutocomplete,
  onPriceRangeChange,
  onBedroomsRangeChange,
  onBathroomsRangeChange,
  onAreaRangeChange,
  onYearRangeChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
  onApplyFilters,
  formatPrice,
}: SearchAndFiltersBarProps): React.ReactElement => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <SearchInput
        searchQuery={searchQuery}
        showAutocomplete={showAutocomplete}
        properties={properties}
        isPending={isPending}
        autocompleteRef={autocompleteRef}
        onSearchChange={onSearchChange}
        onCloseAutocomplete={onCloseAutocomplete}
        formatPrice={formatPrice}
      />

      <FiltersSheet
        priceRange={priceRange}
        bedroomsRange={bedroomsRange}
        bathroomsRange={bathroomsRange}
        areaRange={areaRange}
        yearRange={yearRange}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        availableTypes={availableTypes}
        availableStatuses={availableStatuses}
        onPriceRangeChange={onPriceRangeChange}
        onBedroomsRangeChange={onBedroomsRangeChange}
        onBathroomsRangeChange={onBathroomsRangeChange}
        onAreaRangeChange={onAreaRangeChange}
        onYearRangeChange={onYearRangeChange}
        onStatusChange={onStatusChange}
        onTypeChange={onTypeChange}
        onClearFilters={onClearFilters}
        onApplyFilters={onApplyFilters}
      />
    </div>
  );
};

interface ActiveFiltersProps {
  appliedPriceRange: Array<number>;
  appliedBedroomsRange: Array<number>;
  appliedBathroomsRange: Array<number>;
  appliedAreaRange: Array<number>;
  appliedYearRange: Array<number>;
  appliedStatus: string;
  appliedType: string;
  onRemoveFilter: (filterType: string) => void;
  formatPrice: (price: number) => string;
}

const ActiveFilters = ({
  appliedPriceRange,
  appliedBedroomsRange,
  appliedBathroomsRange,
  appliedAreaRange,
  appliedYearRange,
  appliedStatus,
  appliedType,
  onRemoveFilter,
  formatPrice,
}: ActiveFiltersProps): React.ReactElement | null => {
  const filters: Array<{ key: string; label: string; isActive: boolean }> = [
    {
      key: 'price',
      label: `Price: ${formatPrice(appliedPriceRange[0])} - ${formatPrice(appliedPriceRange[1])}`,
      isActive: appliedPriceRange[0] > 0 || appliedPriceRange[1] < MAX_PRICE,
    },
    {
      key: 'bedrooms',
      label: `Bedrooms: ${appliedBedroomsRange[0]}+ to ${appliedBedroomsRange[1]}`,
      isActive: appliedBedroomsRange[0] > 0 || appliedBedroomsRange[1] < MAX_BEDROOMS,
    },
    {
      key: 'bathrooms',
      label: `Bathrooms: ${appliedBathroomsRange[0]}+ to ${appliedBathroomsRange[1]}`,
      isActive: appliedBathroomsRange[0] > 0 || appliedBathroomsRange[1] < MAX_BATHROOMS,
    },
    {
      key: 'area',
      label: `Area: ${appliedAreaRange[0]} - ${appliedAreaRange[1]} m²`,
      isActive: appliedAreaRange[0] > 0 || appliedAreaRange[1] < MAX_AREA,
    },
    {
      key: 'year',
      label: `Year: ${appliedYearRange[0]} - ${appliedYearRange[1]}`,
      isActive: appliedYearRange[0] > MIN_YEAR || appliedYearRange[1] < MAX_YEAR,
    },
    {
      key: 'type',
      label: `Type: ${appliedType.charAt(0).toUpperCase() + appliedType.slice(1)}`,
      isActive: !!appliedType,
    },
    {
      key: 'status',
      label: `Status: ${appliedStatus.charAt(0).toUpperCase() + appliedStatus.slice(1)}`,
      isActive: !!appliedStatus,
    },
  ];

  const activeFilters = filters.filter(f => f.isActive);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {activeFilters.map(filter => (
        <div
          key={filter.key}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
        >
          <span>{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter(filter.key)}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${filter.key} filter`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const SearchInput = ({
  searchQuery,
  showAutocomplete,
  properties,
  isPending,
  autocompleteRef,
  onSearchChange,
  onCloseAutocomplete,
  formatPrice,
}: {
  searchQuery: string;
  showAutocomplete: boolean;
  properties: Array<{ id: string; name: string; coverImage?: string; price: number; city: string; address: string }>;
  isPending: boolean;
  autocompleteRef: React.RefObject<HTMLDivElement | null>;
  onSearchChange: (value: string) => void;
  onCloseAutocomplete: () => void;
  formatPrice: (price: number) => string;
}): React.ReactElement => (
  <div className="flex-1 relative" ref={autocompleteRef}>
    <Input
      type="text"
      placeholder="City, address, or property name..."
      value={searchQuery}
      onChange={e => onSearchChange(e.target.value)}
      className="h-12 text-base"
    />
    {showAutocomplete && (
      <AutocompleteResults
        properties={properties}
        isPending={isPending}
        searchQuery={searchQuery}
        onClose={onCloseAutocomplete}
        formatPrice={formatPrice}
      />
    )}
  </div>
);

const FiltersSheet = ({
  priceRange,
  bedroomsRange,
  bathroomsRange,
  areaRange,
  yearRange,
  selectedStatus,
  selectedType,
  availableTypes,
  availableStatuses,
  onPriceRangeChange,
  onBedroomsRangeChange,
  onBathroomsRangeChange,
  onAreaRangeChange,
  onYearRangeChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
  onApplyFilters,
}: Omit<FiltersPanelProps, 'children'>): React.ReactElement => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="h-12 gap-2 md:w-auto bg-transparent">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="font-serif text-2xl">Search filters</SheetTitle>
        <SheetDescription>Refine your search with advanced filters</SheetDescription>
      </SheetHeader>

      <FiltersPanel
        priceRange={priceRange}
        bedroomsRange={bedroomsRange}
        bathroomsRange={bathroomsRange}
        areaRange={areaRange}
        yearRange={yearRange}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        availableTypes={availableTypes}
        availableStatuses={availableStatuses}
        onPriceRangeChange={onPriceRangeChange}
        onBedroomsRangeChange={onBedroomsRangeChange}
        onBathroomsRangeChange={onBathroomsRangeChange}
        onAreaRangeChange={onAreaRangeChange}
        onYearRangeChange={onYearRangeChange}
        onStatusChange={onStatusChange}
        onTypeChange={onTypeChange}
        onClearFilters={onClearFilters}
        onApplyFilters={onApplyFilters}
      />
    </SheetContent>
  </Sheet>
);

interface AutocompleteResultsProps {
  properties: Array<{ id: string; name: string; coverImage?: string; price: number; city: string; address: string }>;
  isPending: boolean;
  searchQuery: string;
  onClose: () => void;
  formatPrice: (price: number) => string;
}

const AutocompleteResults = ({
  properties,
  isPending,
  searchQuery,
  onClose,
  formatPrice,
}: AutocompleteResultsProps): React.ReactElement => {
  if (isPending) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
        <div className="p-4 text-center text-muted-foreground">Searching properties...</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
        <div className="p-4 text-center text-muted-foreground">No properties found for "{searchQuery}"</div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      <div className="divide-y">
        {properties.map(property => (
          <Link
            key={property.id}
            to={PATHNAME_ROUTES.PROPERTY_DETAILS}
            params={{ propertyId: property.id }}
            onClick={onClose}
            className="flex gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
              {property.coverImage ? (
                <img src={property.coverImage} alt={property.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{property.name}</h4>
              <p className="text-xs text-muted-foreground truncate">
                {property.address}, {property.city}
              </p>
              <p className="text-sm font-semibold text-primary mt-1">{formatPrice(property.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface FiltersPanelProps {
  priceRange: Array<number>;
  bedroomsRange: Array<number>;
  bathroomsRange: Array<number>;
  areaRange: Array<number>;
  yearRange: Array<number>;
  selectedStatus: string;
  selectedType: string;
  availableTypes: Array<string>;
  availableStatuses: Array<string>;
  onPriceRangeChange: (value: Array<number>) => void;
  onBedroomsRangeChange: (value: Array<number>) => void;
  onBathroomsRangeChange: (value: Array<number>) => void;
  onAreaRangeChange: (value: Array<number>) => void;
  onYearRangeChange: (value: Array<number>) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const RangeSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: {
  label: string;
  value: Array<number>;
  min: number;
  max: number;
  step: number;
  onChange: (value: Array<number>) => void;
  formatValue?: (val: number, isMin: boolean) => string;
}): React.ReactElement => (
  <div className="space-y-4">
    <Label className="text-base">{label}</Label>
    <Slider min={min} max={max} step={step} value={value} onValueChange={onChange} className="mt-2" />
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{formatValue ? formatValue(value[0], true) : value[0]}</span>
      <span>{formatValue ? formatValue(value[1], false) : value[1]}</span>
    </div>
  </div>
);

const FilterSelect = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: Array<string>;
  onChange: (value: string) => void;
}): React.ReactElement => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select value={value || 'all'} onValueChange={val => onChange(val === 'all' ? '' : val)}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const RangeFilters = ({
  priceRange,
  bedroomsRange,
  bathroomsRange,
  areaRange,
  yearRange,
  onPriceRangeChange,
  onBedroomsRangeChange,
  onBathroomsRangeChange,
  onAreaRangeChange,
  onYearRangeChange,
}: {
  priceRange: Array<number>;
  bedroomsRange: Array<number>;
  bathroomsRange: Array<number>;
  areaRange: Array<number>;
  yearRange: Array<number>;
  onPriceRangeChange: (value: Array<number>) => void;
  onBedroomsRangeChange: (value: Array<number>) => void;
  onBathroomsRangeChange: (value: Array<number>) => void;
  onAreaRangeChange: (value: Array<number>) => void;
  onYearRangeChange: (value: Array<number>) => void;
}): React.ReactElement => (
  <>
    <RangeSlider
      label="Price range"
      value={priceRange}
      min={0}
      max={MAX_PRICE}
      step={50000}
      onChange={onPriceRangeChange}
      formatValue={val => `$${val.toLocaleString()}`}
    />
    <RangeSlider
      label="Bedrooms"
      value={bedroomsRange}
      min={0}
      max={MAX_BEDROOMS}
      step={1}
      onChange={onBedroomsRangeChange}
      formatValue={(val, isMin) => (isMin ? `${val}+` : `${val}`)}
    />
    <RangeSlider
      label="Bathrooms"
      value={bathroomsRange}
      min={0}
      max={MAX_BATHROOMS}
      step={1}
      onChange={onBathroomsRangeChange}
      formatValue={(val, isMin) => (isMin ? `${val}+` : `${val}`)}
    />
    <RangeSlider
      label="Area (m²)"
      value={areaRange}
      min={0}
      max={MAX_AREA}
      step={10}
      onChange={onAreaRangeChange}
      formatValue={val => `${val} m²`}
    />
    <RangeSlider
      label="Build year"
      value={yearRange}
      min={MIN_YEAR}
      max={MAX_YEAR}
      step={1}
      onChange={onYearRangeChange}
    />
  </>
);

const FiltersPanel = ({
  priceRange,
  bedroomsRange,
  bathroomsRange,
  areaRange,
  yearRange,
  selectedStatus,
  selectedType,
  availableTypes,
  availableStatuses,
  onPriceRangeChange,
  onBedroomsRangeChange,
  onBathroomsRangeChange,
  onAreaRangeChange,
  onYearRangeChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
  onApplyFilters,
}: FiltersPanelProps): React.ReactElement => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 mt-8 px-4 space-y-6 overflow-y-auto pb-4">
        <RangeFilters
          priceRange={priceRange}
          bedroomsRange={bedroomsRange}
          bathroomsRange={bathroomsRange}
          areaRange={areaRange}
          yearRange={yearRange}
          onPriceRangeChange={onPriceRangeChange}
          onBedroomsRangeChange={onBedroomsRangeChange}
          onBathroomsRangeChange={onBathroomsRangeChange}
          onAreaRangeChange={onAreaRangeChange}
          onYearRangeChange={onYearRangeChange}
        />

        <FilterSelect
          id="property-type"
          label="Property type"
          value={selectedType}
          placeholder="All types"
          options={availableTypes}
          onChange={onTypeChange}
          key={`type-${selectedType}`}
        />

        <FilterSelect
          id="property-status"
          label="Property status"
          value={selectedStatus}
          placeholder="All statuses"
          options={availableStatuses}
          onChange={onStatusChange}
          key={`status-${selectedStatus}`}
        />
      </div>

      <div className="sticky bottom-0 p-4 bg-background border-t flex gap-2 mt-auto">
        <Button onClick={onApplyFilters} className="flex-1 bg-primary hover:bg-primary/90">
          Apply filters
        </Button>
        <Button onClick={onClearFilters} variant="outline" className="flex-1 gap-2">
          <X className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
