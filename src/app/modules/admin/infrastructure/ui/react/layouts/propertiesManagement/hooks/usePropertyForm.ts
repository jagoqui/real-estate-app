import { type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { type SearchSuggestion } from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import { type PropertyImage } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import { useState } from 'react';
import { type Property } from '../types/property.types';

export interface PropertyFormData {
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
}

const initialFormData: PropertyFormData = {
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
};

export const usePropertyForm = (): {
  formData: PropertyFormData;
  editingProperty: Property | null;
  isAmenityFormValid: boolean;
  pendingImageDeletions: Set<string>;
  handleFormChange: (updates: Partial<PropertyFormData>) => void;
  resetForm: () => void;
  loadPropertyForEdit: (property: Property) => void;
  setIsAmenityFormValid: (value: boolean) => void;
  setPendingImageDeletions: (value: Set<string>) => void;
} => {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAmenityFormValid, setIsAmenityFormValid] = useState(true);
  const [pendingImageDeletions, setPendingImageDeletions] = useState<Set<string>>(new Set());

  const handleFormChange = (updates: Partial<PropertyFormData>): void => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = (): void => {
    setEditingProperty(null);
    setIsAmenityFormValid(true);
    setPendingImageDeletions(new Set());
    setFormData(initialFormData);
  };

  const loadPropertyForEdit = (property: Property): void => {
    setEditingProperty(property);

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
  };

  return {
    formData,
    editingProperty,
    isAmenityFormValid,
    pendingImageDeletions,
    handleFormChange,
    resetForm,
    loadPropertyForEdit,
    setIsAmenityFormValid,
    setPendingImageDeletions,
  };
};
