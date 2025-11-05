import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { MapPin } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
interface LocationPreviewProps {
  property: Property;
}

// eslint-disable-next-line max-lines-per-function
export const LocationPreview = ({ property }: LocationPreviewProps): React.ReactElement => {
  if (!property.location?.lat || !property.location?.lon) {
    return (
      <div className="flex items-start gap-2 max-w-[200px]">
        <div className="shrink-0">
          <div className="w-12 h-8 rounded border bg-muted flex items-center justify-center">
            <MapPin className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">
            {property.address || `${property.city}, ${property.state}`}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {property.city}, {property.state}, {property.country}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-start gap-2 max-w-[200px] cursor-pointer hover:bg-muted/50 rounded-md p-1 transition-all duration-200 hover:shadow-sm group">
          <div className="shrink-0 relative">
            <div
              className="w-12 h-8 rounded border bg-muted bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${property.location.lon},${property.location.lat},14,0/96x64@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw)`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
                  <MapPin className="h-2 w-2 text-gray-700" />
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {property.address || `${property.city}, ${property.state}`}
            </div>
            <div className="text-xs text-muted-foreground truncate group-hover:hidden transition-all duration-200">
              {property.city}, {property.state}, {property.country}
            </div>
            <div className="text-xs text-primary hidden group-hover:block transition-all duration-200 truncate">
              📍 Click to view map
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="right" align="start">
        <div className="p-3 border-b">
          <h4 className="font-medium text-sm">Property Location</h4>
          <p className="text-xs text-muted-foreground truncate mt-1">
            {property.address || `${property.city}, ${property.state}`}
          </p>
        </div>
        <div className="h-48 relative">
          <MapContainer
            center={[property.location?.lat ?? 0, property.location?.lon ?? 0]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[property.location?.lat ?? 0, property.location?.lon ?? 0]}>
              <Popup>
                <div className="text-sm">
                  <strong>{property.name}</strong>
                  <br />
                  {property.address || `${property.city}, ${property.state}`}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="p-3 border-t bg-muted/30">
          <button
            className="text-xs text-primary hover:underline"
            onClick={() => {
              const googleMapsUrl = `https://www.google.com/maps?q=${property.location?.lat},${property.location?.lon}&z=15`;
              window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
            }}
          >
            Open in Google Maps →
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
