import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { useState } from 'react';
import { convertPropertyFormDataToProperty } from '../helpers/convertPropertyToFormData';

const INITIAL_PROPERTIES: Array<Property> = [
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
    highlightedFeatures: ['Pool', 'Gym', 'Cinema'],
    amenities: [
      {
        id: '1',
        name: 'Infinite Pool',
        icon: 'infinity',
      },
      {
        id: '2',
        name: 'Home Gym',
        icon: 'dumbbell',
      },
      {
        id: '3',
        name: 'Private Cinema',
        icon: 'film',
      },
      {
        id: '4',
        name: 'Smart Home System',
        icon: 'sparkles',
      },
    ],
    featured: true,
    images: ['/luxury-villa-sunset.png'],
    views380Url: [],
    ownerId: '1',
    ownerName: 'John Smith',
    status: 'available',
    type: 'house',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
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
    highlightedFeatures: ['Terrace', 'Panoramic view', '24/7 Concierge'],
    amenities: [
      {
        id: '5',
        name: 'Terrace',
        icon: 'home',
      },
      {
        id: '6',
        name: 'Concierge',
        icon: 'users',
      },
      {
        id: '7',
        name: 'Elevator',
        icon: 'arrow-up',
      },
      {
        id: '8',
        name: 'Security',
        icon: 'shield',
      },
      {
        id: '9',
        name: 'Parking',
        icon: 'car',
      },
    ],
    featured: false,
    images: ['/luxury-penthouse-with-ocean-view-modern-interior.jpg'],
    views380Url: [],
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    status: 'sold',
    type: 'apartment',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-20',
  },
];

export const useProperties = (): {
  properties: Array<Property>;
  editingProperty: Property | null;
  deleteProperty: (id: string) => void;
  handleSubmit: (data: PropertyFormValues) => void;
  handleEdit: (property: Property) => void;
  handleReset: () => void;
} => {
  const [properties, setProperties] = useState<Array<Property>>(INITIAL_PROPERTIES);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const addProperty = (property: Property): void => {
    setProperties([...properties, property]);
  };

  const updateProperty = (property: Property): void => {
    setProperties(properties.map(p => (p.id === property.id ? property : p)));
  };

  const deleteProperty = (id: string): void => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (data: PropertyFormValues): void => {
    if (editingProperty) {
      updateProperty(convertPropertyFormDataToProperty(data));
    } else {
      addProperty(convertPropertyFormDataToProperty(data));
    }

    setEditingProperty(null);
  };

  const handleEdit = (property: Property): void => {
    setEditingProperty(property);
  };

  const handleReset = (): void => {
    setEditingProperty(null);
  };

  return {
    properties,
    editingProperty,
    deleteProperty,
    handleSubmit,
    handleEdit,
    handleReset,
  };
};
