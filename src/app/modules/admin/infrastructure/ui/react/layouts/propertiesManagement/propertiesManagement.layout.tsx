import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { type SearchSuggestion } from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import { type PropertyImage } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PropertyHeader } from '../../components/propertyList/propertyHeader';
import { PropertyTableHeader } from '../../components/propertyList/propertyTableHeader';
import { PropertyTableRow } from '../../components/propertyList/propertyTableRow';
import { BasicInfoTab } from './components/BasicInfoTab';
import { FeaturesTab } from './components/FeaturesTab';
import { ImagesTab } from './components/ImagesTab';
import { LocationTab } from './components/LocationTab';
import { VirtualToursTab } from './components/VirtualToursTab';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  location?: {
    lat: string;
    lon: string;
  };
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
  const [activeTab, setActiveTab] = useState<string>('basic');
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
      location: {
        lat: '34.0736',
        lon: '-118.4004',
      },
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
      location: {
        lat: '40.7589',
        lon: '-73.9441',
      },
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
      location: formData.location
        ? {
            lat: formData.location.lat,
            lon: formData.location.lon,
          }
        : undefined,
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
      property.location?.lat && property.location?.lon
        ? {
            display_name: property.address || `${property.city}, ${property.state}, ${property.country}`,
            lat: property.location?.lat || '',
            lon: property.location?.lon || '',
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

  const handleFormChange = (updates: Partial<typeof formData>): void => {
    setFormData(prev => ({ ...prev, ...updates }));
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
            className="max-h-[90vh] sm:max-w-[600px] min-h-[60vh] overflow-hidden h-auto p-0 flex flex-col"
            onInteractOutside={e => e.preventDefault()}
          >
            {/* Fixed Header */}
            <DialogHeader className="flex-shrink-0 bg-background border-b px-6 py-4 rounded-t-lg">
              <DialogTitle className="font-serif text-2xl">
                {editingProperty ? 'Edit Property' : 'New Property'}
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <form onSubmit={handleSubmit} className="space-y-4" id="property-form">
                <Tabs value={activeTab} onValueChange={v => setActiveTab(v)} className="w-full min-h-0">
                  <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0 mb-4">
                    <TabsTrigger
                      value="basic"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors hover:shadow-md"
                    >
                      Basic Information
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors hover:shadow-md"
                    >
                      Features & Amenities
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors hover:shadow-md"
                    >
                      Location
                    </TabsTrigger>
                    <TabsTrigger
                      value="images"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors hover:shadow-md"
                    >
                      Images
                    </TabsTrigger>
                    <TabsTrigger
                      value="virtual-tours"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors hover:shadow-md"
                    >
                      360° Views
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic">
                    <BasicInfoTab
                      formData={{
                        name: formData.name,
                        price: formData.price,
                        area: formData.area,
                        buildYear: formData.buildYear,
                        status: formData.status,
                        ownerName: formData.ownerName,
                        ownerId: formData.ownerId,
                        description: formData.description,
                      }}
                      onChange={handleFormChange}
                    />
                  </TabsContent>

                  <TabsContent value="features">
                    <FeaturesTab
                      formData={{
                        features: formData.features,
                        amenities: formData.amenities,
                        bedrooms: formData.bedrooms,
                        bathrooms: formData.bathrooms,
                      }}
                      onChange={handleFormChange}
                    />
                  </TabsContent>

                  <TabsContent value="location">
                    <LocationTab
                      formData={{
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        location: {
                          lat: formData.location ? parseFloat(formData.location.lat) : 0,
                          lng: formData.location ? parseFloat(formData.location.lon) : 0,
                        },
                      }}
                      onChange={updates => {
                        // Convert location back to SearchSuggestion if it exists
                        const locationUpdate: Partial<typeof formData> = {};
                        if (updates.city) locationUpdate.city = updates.city;
                        if (updates.state) locationUpdate.state = updates.state;
                        if (updates.country) locationUpdate.country = updates.country;
                        if (updates.location) {
                          locationUpdate.location = {
                            lat: updates.location.lat.toString(),
                            lon: updates.location.lng.toString(),
                            display_name: `${updates.city || formData.city}, ${updates.state || formData.state}, ${updates.country || formData.country}`,
                          };
                        }
                        handleFormChange(locationUpdate);
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="images">
                    <ImagesTab formData={{ images: formData.images }} onChange={handleFormChange} />
                  </TabsContent>

                  <TabsContent value="virtual-tours">
                    <VirtualToursTab
                      formData={{ virtualTours: formData.views380Url }}
                      onChange={updates => handleFormChange({ views380Url: updates.virtualTours })}
                    />
                  </TabsContent>
                </Tabs>
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
          <PropertyHeader value={searchTerm} onValueChange={setSearchTerm} />
        </CardHeader>
        <CardContent className="px-0">
          <div className="w-full overflow-hidden">
            <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
              <Table className="w-full">
                <PropertyTableHeader />
                <TableBody>
                  {filteredProperties.map(property => (
                    <PropertyTableRow
                      key={property.id}
                      property={property}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      maxVisibleFeatures={MAX_VISIBLE_FEATURES}
                      maxVisibleAmenities={MAX_VISIBLE_AMENITIES}
                    />
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
