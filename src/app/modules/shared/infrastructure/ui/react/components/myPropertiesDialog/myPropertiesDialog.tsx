/* eslint-disable @typescript-eslint/no-magic-numbers */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, Edit, Eye, MapPin, Maximize, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Mock data - replace with actual data from backend
const mockProperties = [
  {
    id: '1',
    name: 'Modern Villa in Beverly Hills',
    address: '123 Luxury Lane',
    city: 'Beverly Hills',
    state: 'CA',
    price: 12500000,
    bedrooms: 6,
    bathrooms: 8,
    area: 8500,
    images: ['/modern-luxury-villa.png'],
    status: 'active' as const,
    views: 1234,
  },
  {
    id: '2',
    name: 'Penthouse with Ocean View',
    address: '456 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    images: ['/luxury-penthouse-ocean-view.jpg'],
    status: 'pending' as const,
    views: 567,
  },
];

interface MyPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// eslint-disable-next-line max-lines-per-function
export const MyPropertiesDialog = ({ open, onOpenChange }: MyPropertiesDialogProps): React.ReactElement => {
  const [properties, setProperties] = useState(mockProperties);

  const deleteProperty = (id: string): void => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  const getStatusBadge = (status: 'active' | 'pending' | 'sold'): React.ReactElement => {
    const variants = {
      active: { label: 'Active', className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20' },
      pending: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' },
      sold: { label: 'Sold', className: 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20' },
    };
    const variant = variants[status];
    return (
      <Badge variant="secondary" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-fit! max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="mt-5 text-2xl font-serif">My Properties</DialogTitle>
              <p className="text-sm text-muted-foreground">Manage your property listings</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Property
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="px-6 pb-6">
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif mb-2">You have no listed properties</h3>
              <p className="text-muted-foreground mb-6 text-center">Start listing your luxury properties</p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Property
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map(property => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-64 aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img
                        src={property.images[0] || '/placeholder.svg'}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">{getStatusBadge(property.status)}</div>
                    </div>

                    <CardContent className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-serif mb-2">{property.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {property.address}, {property.city}, {property.state}
                            </span>
                          </div>

                          <div className="flex items-center gap-6 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Bed className="w-4 h-4 text-muted-foreground" />
                              <span>{property.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bath className="w-4 h-4 text-muted-foreground" />
                              <span>{property.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Maximize className="w-4 h-4 text-muted-foreground" />
                              <span>{property.area.toLocaleString()} ft²</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              <span>{property.views} views</span>
                            </div>
                          </div>

                          <p className="text-2xl font-serif">${(property.price / 1000000).toFixed(1)}M</p>
                        </div>

                        <div className="flex md:flex-col gap-2">
                          <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none bg-transparent">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Link
                            to={`/properties/${property.id}`}
                            onClick={() => onOpenChange(false)}
                            className="flex-1 md:flex-none"
                          >
                            <Button variant="outline" size="sm" className="gap-2 w-full bg-transparent">
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground flex-1 md:flex-none bg-transparent"
                            onClick={() => deleteProperty(property.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
