import { type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';

export const PROPERTY_TYPES = ['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial', 'other'] as const;

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
  highlightedFeatures: Array<string>;
  amenities?: Array<Amenity>;
  images: Array<string>;
  views380Url: Array<string>;
  imageFiles?: Array<{ id: string; file: File; preview: string; name: string; size: number }>;
  ownerId: string;
  ownerName: string;
  status: 'available' | 'sold' | 'pending';
  type: (typeof PROPERTY_TYPES)[number];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  properties: number;
  createdAt: string;
}
