import type { Property } from '@/modules/shared/domain/models/property.model';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useGetPropertiesRequest } from '../../hooks/useGetProperties/useGetPropertiesRequest';
import {
  FilterToggleButton,
  FiltersPanel,
  MapEmptyState,
  MapErrorState,
  MapLoadingState,
  PropertyPopupContent,
} from './components';
import { createPropertyMarker } from './utils/createPropertyMarker';

// Constants
const DEFAULT_MAX_PRICE = 10000000;
const DEFAULT_CENTER: [number, number] = [40.7128, -74.006]; // NYC
const DEFAULT_ZOOM = 12;

// Fix Leaflet default icon issue (fallback)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: (() => string) | undefined })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapBoundsUpdaterProps {
  properties: Array<Property>;
}

const MapBoundsUpdater = ({ properties }: MapBoundsUpdaterProps): null => {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [parseFloat(p.location.lat), parseFloat(p.location.lon)]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);

  return null;
};

interface PropertyFilters {
  search: string;
  priceRange: [number, number];
}

export const PropertiesMap = (): React.ReactElement => {
  const { data, isPending, error } = useGetPropertiesRequest();
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    priceRange: [0, DEFAULT_MAX_PRICE],
  });
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = useMemo(() => {
    if (!data || data.length === 0) return DEFAULT_MAX_PRICE;
    return Math.max(...data.map(p => p.price));
  }, [data]);

  const handleResetFilters = (): void => {
    setFilters({
      search: '',
      priceRange: [0, maxPrice],
    });
  };

  const filteredProperties = useMemo(() => {
    if (!data) return [];

    return data.filter(property => {
      const matchesSearch =
        filters.search === '' ||
        property.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.search.toLowerCase());

      const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];

      return matchesSearch && matchesPrice;
    });
  }, [data, filters]);

  if (isPending) return <MapLoadingState />;
  if (error) return <MapErrorState message={error.message} />;
  if (!data || data.length === 0) return <MapEmptyState />;

  const defaultCenter: [number, number] =
    data.length > 0 ? [parseFloat(data[0].location.lat), parseFloat(data[0].location.lon)] : DEFAULT_CENTER;

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-lg z-[1]">
      <FilterToggleButton showFilters={showFilters} onToggle={() => setShowFilters(!showFilters)} />

      {showFilters && (
        <FiltersPanel
          filters={filters}
          maxPrice={maxPrice}
          totalProperties={data.length}
          filteredCount={filteredProperties.length}
          onFiltersChange={setFilters}
          onResetFilters={handleResetFilters}
        />
      )}

      <MapContainer center={defaultCenter} zoom={DEFAULT_ZOOM} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBoundsUpdater properties={filteredProperties} />

        {filteredProperties.map(property => (
          <Marker
            key={property.id}
            position={[parseFloat(property.location.lat), parseFloat(property.location.lon)]}
            icon={createPropertyMarker(property)}
          >
            <Popup className="custom-popup" maxWidth={320} minWidth={280}>
              <PropertyPopupContent property={property} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
