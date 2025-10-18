/* eslint-disable max-lines-per-function */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { AmenityForm, type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import {
  LocationPicker,
  type SearchSuggestion,
} from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import {
  PropertyImageManager,
  PropertyImagesTableCell,
  type PropertyImage,
} from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import 'leaflet/dist/leaflet.css';
import { MapPin, Maximize, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat?: string;
  lon?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  buildYear: number;
  description: string;
  features: Array<string>;
  amenities?: Array<Amenity>;
  images: Array<string>;
  views380Url: Array<string>;
  imageFiles?: Array<{ id: string; file: File; preview: string; name: string; size: number }>;
  ownerId: string;
  ownerName: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  properties: number;
  createdAt: string;
}

// eslint-disable-next-line max-lines-per-function
export const PropertiesManagementLayout = (): React.ReactElement => {
  const MAX_VISIBLE_FEATURES = 2;
  const MAX_VISIBLE_AMENITIES = 3;

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAmenityFormValid, setIsAmenityFormValid] = useState(true);
  const [pendingImageDeletions, setPendingImageDeletions] = useState<Set<string>>(new Set());

  const [properties, setProperties] = useState<Array<Property>>([
    {
      id: '1',
      name: 'Modern Villa Beverly Hills',
      address: '123 Luxury Lane',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
      lat: '34.0736',
      lon: '-118.4004',
      price: 8500000,
      bedrooms: 6,
      bathrooms: 7,
      area: 850,
      buildYear: 2020,
      description: 'Spectacular modern villa with panoramic views',
      features: ['Pool', 'Gym', 'Cinema'],
      images: ['/luxury-villa-sunset.png'],
      views380Url: [],
      ownerId: '1',
      ownerName: 'John Smith',
      status: 'available',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Penthouse Manhattan',
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      lat: '40.7589',
      lon: '-73.9441',
      price: 12000000,
      bedrooms: 4,
      bathrooms: 5,
      area: 450,
      buildYear: 2018,
      description: 'Luxury penthouse in the heart of Manhattan',
      features: ['Terrace', 'Panoramic view', '24/7 Concierge'],
      images: ['/luxury-penthouse-with-ocean-view-modern-interior.jpg'],
      views380Url: [],
      ownerId: '2',
      ownerName: 'Sarah Johnson',
      status: 'sold',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-20',
    },
  ]);

  const [formData, setFormData] = useState<{
    name: string;
    city: string;
    state: string;
    country: string;
    location: SearchSuggestion | null;
    price: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    buildYear: string;
    description: string;
    features: string;
    amenities: Array<Amenity>;
    images: Array<PropertyImage>;
    ownerId: string;
    ownerName: string;
    status: Property['status'];
    views380Url: Property['views380Url'];
  }>({
    name: '',
    city: '',
    state: '',
    country: '',
    location: null,
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    buildYear: '',
    description: '',
    features: '',
    amenities: [],
    images: [],
    views380Url: [],
    ownerId: '',
    ownerName: '',
    status: 'available',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Process pending image deletions
    const finalImages = formData.images.filter(img => !pendingImageDeletions.has(img.id));

    // Clean up object URLs for deleted images
    formData.images
      .filter(img => pendingImageDeletions.has(img.id))
      .forEach(img => {
        if (img.preview.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });

    const newProperty: Property = {
      id: editingProperty?.id || Date.now().toString(),
      name: formData.name,
      address: formData.location?.display_name || '',
      city: formData.city,
      state: formData.state,
      country: formData.country,
      lat: formData.location?.lat,
      lon: formData.location?.lon,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      buildYear: Number(formData.buildYear),
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()),
      amenities: formData.amenities,
      images: finalImages.map(img => img.preview), // Convert File objects to URLs for display
      imageFiles: finalImages, // Store the actual File objects
      views380Url: formData.views380Url,
      ownerId: formData.ownerId,
      ownerName: formData.ownerName,
      status: formData.status,
      createdAt: editingProperty?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProperty) {
      setProperties(properties.map(p => (p.id === editingProperty.id ? newProperty : p)));
    } else {
      setProperties([...properties, newProperty]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (property: Property): void => {
    setEditingProperty(property);

    // Convertir la propiedad guardada a SearchSuggestion si tiene coordenadas
    const locationSuggestion: SearchSuggestion | null =
      property.lat && property.lon
        ? {
            display_name: property.address || `${property.city}, ${property.state}, ${property.country}`,
            lat: property.lat,
            lon: property.lon,
          }
        : null;

    setFormData({
      name: property.name,
      city: property.city,
      state: property.state,
      country: property.country,
      location: locationSuggestion,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      buildYear: property.buildYear.toString(),
      description: property.description,
      features: property.features.join(', '),
      amenities: property.amenities || [],
      images: property.imageFiles || [],
      ownerId: property.ownerId,
      ownerName: property.ownerName,
      status: property.status,
      views380Url: property.views380Url || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string): void => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const resetForm = (): void => {
    setEditingProperty(null);
    setIsAmenityFormValid(true);
    setPendingImageDeletions(new Set());
    setFormData({
      name: '',
      city: '',
      state: '',
      country: '',
      location: null,
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      buildYear: '',
      description: '',
      features: '',
      amenities: [],
      images: [],
      ownerId: '',
      ownerName: '',
      status: 'available',
      views380Url: [],
    });
  };

  const filteredProperties = properties.filter(
    p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Property['status']): React.ReactElement => {
    const variants = {
      available: 'default',
      sold: 'secondary',
      pending: 'outline',
    } as const;

    const labels = {
      available: 'Available',
      sold: 'Sold',
      pending: 'Pending',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const handleLocationChange = (location: SearchSuggestion | undefined): void => {
    setFormData(prev => {
      if (!location) {
        return { ...prev, location: null };
      }

      // Intentar extraer ciudad, estado y país del display_name
      const parts = location.display_name.split(',').map(part => part.trim());
      const updates: Partial<typeof prev> = { location };

      // Si hay suficientes partes, intentar mapear
      const MIN_PARTS = 3;
      const CITY_OFFSET = 3;
      const STATE_OFFSET = 2;
      const COUNTRY_OFFSET = 1;

      if (parts.length >= MIN_PARTS) {
        // Típicamente: "Street, City, State, Country" o similar
        const possibleCity = parts[parts.length - CITY_OFFSET] || prev.city;
        const possibleState = parts[parts.length - STATE_OFFSET] || prev.state;
        const possibleCountry = parts[parts.length - COUNTRY_OFFSET] || prev.country;

        updates.city = possibleCity;
        updates.state = possibleState;
        updates.country = possibleCountry;
      }

      return { ...prev, ...updates };
    });
  };

  // eslint-disable-next-line max-lines-per-function
  const LocationPreview = ({ property }: { property: Property }): React.ReactElement => {
    if (!property.lat || !property.lon) {
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
                  backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${property.lon},${property.lat},14,0/96x64@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw)`,
                }}
              >
                {/* Overlay with click indicator */}
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
              center={[parseFloat(property.lat), parseFloat(property.lon)]}
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
              <Marker position={[parseFloat(property.lat), parseFloat(property.lon)]}>
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
                const googleMapsUrl = `https://www.google.com/maps?q=${property.lat},${property.lon}&z=15`;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold">Properties</h2>
          <p className="mt-2 text-sm lg:text-base text-muted-foreground">Manage all properties on your platform</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={open => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Property</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-h-[90vh] sm:max-w-[600px] p-0 flex flex-col"
            onInteractOutside={e => e.preventDefault()}
          >
            {/* Fixed Header */}
            <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
              <DialogTitle className="font-serif text-2xl">
                {editingProperty ? 'Edit Property' : 'New Property'}
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
              <form onSubmit={handleSubmit} className="space-y-4" id="property-form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Property Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="location">Location Picker</Label>
                    <LocationPicker
                      value={formData.location || undefined}
                      onValueChange={handleLocationChange}
                      placeholder="Search for a location..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <FormattedInput
                      id="price"
                      formatType="currency"
                      value={formData.price}
                      onChange={(value: string) => setFormData({ ...formData, price: value })}
                      placeholder="$0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <FormattedInput
                      id="bedrooms"
                      formatType="number"
                      value={formData.bedrooms}
                      onChange={(value: string) => setFormData({ ...formData, bedrooms: value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <FormattedInput
                      id="bathrooms"
                      formatType="number"
                      value={formData.bathrooms}
                      onChange={(value: string) => setFormData({ ...formData, bathrooms: value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (m²)</Label>
                    <FormattedInput
                      id="area"
                      formatType="number"
                      value={formData.area}
                      onChange={(value: string) => setFormData({ ...formData, area: value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buildYear">Build Year</Label>
                    <FormattedInput
                      id="buildYear"
                      formatType="year"
                      value={formData.buildYear}
                      onChange={(value: string) => setFormData({ ...formData, buildYear: value })}
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: Property['status']) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner</Label>
                    <Input id="ownerName" value={formData.ownerName} disabled required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerId">Owner ID</Label>
                    <Input
                      id="ownerId"
                      value={formData.ownerId}
                      onChange={e => setFormData({ ...formData, ownerId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="features">Features (comma separated)</Label>
                    <Input
                      id="features"
                      value={formData.features}
                      onChange={e => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Pool, Gym, Garden"
                    />
                  </div>
                  <AmenityForm
                    value={formData.amenities}
                    onValueChange={amenities => setFormData({ ...formData, amenities })}
                    onValidationChange={setIsAmenityFormValid}
                    className="space-y-2 sm:col-span-2"
                  />
                  <PropertyImageManager
                    value={formData.images}
                    onValueChange={(images, pendingDeletions) => {
                      setFormData({ ...formData, images });
                      if (pendingDeletions) {
                        setPendingImageDeletions(pendingDeletions);
                      }
                    }}
                    className="space-y-2 sm:col-span-2"
                  />
                  <div className="space-y-4 sm:col-span-2">
                    <Label>360° Virtual Tours</Label>
                    <div className="space-y-4">
                      {formData.views380Url.map((url, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <div className="mb-2">
                              <Label className="text-sm text-muted-foreground">Tour URL {index + 1}</Label>
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={url}
                                onChange={(e) => {
                                  const newUrls = [...formData.views380Url];
                                  newUrls[index] = e.target.value;
                                  setFormData({ ...formData, views380Url: newUrls });
                                }}
                                placeholder="https://my.matterport.com/show/?m=..."
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newUrls = formData.views380Url.filter((_, i) => i !== index);
                                  setFormData({ ...formData, views380Url: newUrls });
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  // Preview in new tab
                                  window.open(url, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                <Maximize className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 aspect-video rounded-lg overflow-hidden border">
                              <iframe
                                src={url}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen
                                title={`Virtual Tour ${index + 1}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            views380Url: [...formData.views380Url, '']
                          });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add 360° Virtual Tour
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 bg-background border-t px-6 py-4 rounded-b-lg">
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" form="property-form" disabled={!isAmenityFormValid}>
                  {editingProperty ? 'Save Changes' : 'Create Property'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, address or city..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="w-full overflow-hidden">
            <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] sticky left-0 z-20 bg-background shadow-[2px_0_4px_rgba(0,0,0,0.1)] font-medium">
                      Property
                    </TableHead>
                    <TableHead className="flex-1 p-0">
                      <div
                        className="flex overflow-x-auto"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
                      >
                        <div className="w-[180px] flex-shrink-0">Location</div>
                        <div className="w-[120px] flex-shrink-0">Price</div>
                        <div className="w-[150px] flex-shrink-0">Details</div>
                        <div className="w-[150px] flex-shrink-0">Features</div>
                        <div className="w-[150px] flex-shrink-0">Amenities</div>
                        <div className="w-[120px] flex-shrink-0">Images</div>
                        <div className="w-[120px] flex-shrink-0">Owner</div>
                        <div className="w-[100px] flex-shrink-0">Status</div>
                      </div>
                    </TableHead>
                    <TableHead className="w-[100px] sticky right-0 z-20 bg-background shadow-[-2px_0_4px_rgba(0,0,0,0.1)] text-right font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map(property => (
                    <TableRow key={property.id}>
                      <TableCell className="w-[200px] sticky left-0 z-10 bg-background/95 shadow-[2px_0_4px_rgba(0,0,0,0.1)] font-medium">
                        <div className="font-medium truncate">{property.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {property.city}, {property.state}
                        </div>
                      </TableCell>
                      <TableCell className="flex-1 p-0">
                        <div
                          className="flex overflow-x-auto"
                          style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
                        >
                          <div className="w-[180px] flex-shrink-0 px-4 py-3">
                            <LocationPreview property={property} />
                          </div>
                          <div className="w-[120px] flex-shrink-0 px-4 py-3 font-semibold">
                            ${property.price.toLocaleString()}
                          </div>
                          <div className="w-[150px] flex-shrink-0 px-4 py-3 text-sm text-muted-foreground">
                            <div>
                              {property.bedrooms} beds • {property.bathrooms} baths
                            </div>
                            <div className="text-xs mt-1">
                              {property.area}m² • Built {property.buildYear}
                            </div>
                          </div>
                          <div className="w-[150px] flex-shrink-0 px-4 py-3">
                            <div className="flex flex-wrap gap-1 max-w-[140px]">
                              {property.features.slice(0, MAX_VISIBLE_FEATURES).map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {property.features.length > MAX_VISIBLE_FEATURES && (
                                <Badge variant="outline" className="text-xs">
                                  +{property.features.length - MAX_VISIBLE_FEATURES}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="w-[150px] flex-shrink-0 px-4 py-3">
                            <div className="flex flex-wrap gap-1 max-w-[130px]">
                              {property.amenities?.slice(0, MAX_VISIBLE_AMENITIES).map((amenity, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                                  <DynamicIcon name={amenity.icon} className="h-3 w-3" />
                                  <span className="truncate max-w-[60px]">{amenity.name}</span>
                                </div>
                              ))}
                              {(property.amenities?.length || 0) > MAX_VISIBLE_AMENITIES && (
                                <Badge variant="outline" className="text-xs">
                                  +{(property.amenities?.length || 0) - MAX_VISIBLE_AMENITIES}
                                </Badge>
                              )}
                              {(!property.amenities || property.amenities.length === 0) && (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </div>
                          </div>
                          <div className="w-[120px] flex-shrink-0 px-4 py-3">
                            <PropertyImagesTableCell images={property.imageFiles || []} propertyName={property.name} />
                          </div>
                          <div className="w-[120px] flex-shrink-0 px-4 py-3">{property.ownerName}</div>
                          <div className="w-[100px] flex-shrink-0 px-4 py-3">{getStatusBadge(property.status)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="w-[100px] sticky right-0 z-10 bg-background/95 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
