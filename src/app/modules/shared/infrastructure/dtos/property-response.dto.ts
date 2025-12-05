import type { AmenityResponseDto } from './amenity-response.dto';
import type { LocationResponseDto } from './location-response.dto';

export interface PropertyResponseDto {
  id: string;
  name: string;
  address: string;
  price: number;
  year: number;
  description: string;
  bathrooms: number;
  bedrooms: number;
  areaSqm: number;
  highlightedFeatures: Array<string>;
  amenities: Array<AmenityResponseDto>;
  featured: boolean;
  views360Url: Array<string>;
  city: string;
  state: string;
  country: string;
  location: LocationResponseDto;
  idOwner: string;
  status: string;
  type: string;
  images: Array<string>;
  coverImage: string;
  codeInternal?: string;
  createdAt: string;
  updatedAt: string;
}
