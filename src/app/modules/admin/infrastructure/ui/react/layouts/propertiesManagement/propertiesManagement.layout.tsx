import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { AmenityForm } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: Array<string>;
  images: Array<string>;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [properties, setProperties] = useState<Array<Property>>([
    {
      id: '1',
      name: 'Modern Villa Beverly Hills',
      address: '123 Luxury Lane',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
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

  // Mock data - replace with real data from your backend

  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    description: string;
    features: string;
    ownerId: string;
    ownerName: string;
    status: Property['status'];
  }>({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    features: '',
    ownerId: '',
    ownerName: '',
    status: 'available',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const newProperty: Property = {
      id: editingProperty?.id || Date.now().toString(),
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()),
      images: ['/placeholder.svg?height=400&width=600'],
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
      address: property.address,
      city: property.city,
      state: property.state,
      country: property.country,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description,
      features: property.features.join(', '),
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
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      features: '',
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
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
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
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
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
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                  />
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
                <AmenityForm onSave={console.log} />
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
                <Button type="submit">{editingProperty ? 'Save Changes' : 'Create Property'}</Button>
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
                        {property.city}, {property.state}
                      </TableCell>
                      <TableCell className="font-semibold">${property.price.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {property.bedrooms} beds • {property.bathrooms} baths • {property.area}m²
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
