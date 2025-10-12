import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { AmenityForm, type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';
import {
  LocationPicker,
  type SearchSuggestion,
} from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import {
  PropertyImageManager,
  PropertyImagesTableCell,
  type PropertyImage,
} from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import { MapPin, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
  description: string;
  features: Array<string>;
  amenities?: Array<Amenity>;
  images: Array<string>;
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
      description: 'Spectacular modern villa with panoramic views',
      features: ['Pool', 'Gym', 'Cinema'],
      images: ['/luxury-villa-sunset.png'],
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
      description: 'Luxury penthouse in the heart of Manhattan',
      features: ['Terrace', 'Panoramic view', '24/7 Concierge'],
      images: ['/luxury-penthouse-with-ocean-view-modern-interior.jpg'],
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
    description: string;
    features: string;
    amenities: Array<Amenity>;
    images: Array<PropertyImage>;
    ownerId: string;
    ownerName: string;
    status: Property['status'];
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
    description: '',
    features: '',
    amenities: [],
    images: [],
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
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()),
      amenities: formData.amenities,
      images: finalImages.map(img => img.preview), // Convert File objects to URLs for display
      imageFiles: finalImages, // Store the actual File objects
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
    setFormData({
      name: property.name,
      city: property.city,
      state: property.state,
      country: property.country,
      location: null, // TODO: Convertir address + city + state + country a SearchSuggestion
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description,
      features: property.features.join(', '),
      amenities: property.amenities || [],
      images: property.imageFiles || [],
      ownerId: property.ownerId,
      ownerName: property.ownerName,
      status: property.status,
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
      description: '',
      features: '',
      amenities: [],
      images: [],
      ownerId: '',
      ownerName: '',
      status: 'available',
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
    setFormData(prev => ({
      ...prev,
      location: location || null,
    }));
  };

  const LocationPreview = ({ property }: { property: Property }): React.ReactElement => {
    if (!property.lat || !property.lon) {
      return (
        <div className="flex items-start gap-2 max-w-[200px]">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
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
      <div className="flex items-start gap-2 max-w-[200px]">
        <div className="shrink-0">
          <div
            className="w-12 h-8 rounded border bg-muted bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${property.lon},${property.lat},14,0/96x64@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw)`,
            }}
            title="Click to view on map"
          />
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
            className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]"
            onInteractOutside={e => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {editingProperty ? 'Edit Property' : 'New Property'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: e.target.value })}
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
              </div>
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
                <Button type="submit" disabled={!isAmenityFormValid}>
                  {editingProperty ? 'Save Changes' : 'Create Property'}
                </Button>
              </div>
            </form>
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
        <CardContent>
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Property</TableHead>
                    <TableHead className="min-w-[120px]">Location</TableHead>
                    <TableHead className="min-w-[100px]">Price</TableHead>
                    <TableHead className="min-w-[150px]">Details</TableHead>
                    <TableHead className="min-w-[140px]">Features</TableHead>
                    <TableHead className="min-w-[140px]">Amenities</TableHead>
                    <TableHead className="min-w-[120px]">Images</TableHead>
                    <TableHead className="min-w-[120px]">Owner</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map(property => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>
                        <LocationPreview property={property} />
                      </TableCell>
                      <TableCell className="font-semibold">${property.price.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {property.bedrooms} beds • {property.bathrooms} baths • {property.area}m²
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[130px]">
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <PropertyImagesTableCell images={property.imageFiles || []} propertyName={property.name} />
                      </TableCell>
                      <TableCell>{property.ownerName}</TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
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
