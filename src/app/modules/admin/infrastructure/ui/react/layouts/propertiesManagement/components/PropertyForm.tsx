import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { type PropertyFormData } from '../hooks/usePropertyForm';
import { BasicInfoTab } from './BasicInfoTab';
import { FeaturesTab } from './FeaturesTab';
import { ImagesTab } from './ImagesTab';
import { LocationTab } from './LocationTab';
import { VirtualToursTab } from './VirtualToursTab';

interface PropertyFormProps {
  formData: PropertyFormData;
  activeTab: string;
  onTabChange: (value: string) => void;
  onFormChange: (updates: Partial<PropertyFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormTabsList = React.memo(() => (
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
));

FormTabsList.displayName = 'FormTabsList';

interface FormTabsContentProps {
  formData: PropertyFormData;
  onFormChange: (updates: Partial<PropertyFormData>) => void;
}

const FormTabsContent = React.memo(({ formData, onFormChange }: FormTabsContentProps) => (
  <>
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
        onChange={onFormChange}
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
        onChange={onFormChange}
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
          const locationUpdate: Partial<PropertyFormData> = {};
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
          onFormChange(locationUpdate);
        }}
      />
    </TabsContent>

    <TabsContent value="images">
      <ImagesTab formData={{ images: formData.images }} onChange={onFormChange} />
    </TabsContent>

    <TabsContent value="virtual-tours">
      <VirtualToursTab
        formData={{ virtualTours: formData.views380Url }}
        onChange={updates => onFormChange({ views380Url: updates.virtualTours })}
      />
    </TabsContent>
  </>
));

FormTabsContent.displayName = 'FormTabsContent';

export const PropertyForm = React.memo(
  ({ formData, activeTab, onTabChange, onFormChange, onSubmit }: PropertyFormProps) => (
    <form onSubmit={onSubmit} className="space-y-4" id="property-form">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full min-h-0">
        <FormTabsList />
        <FormTabsContent formData={formData} onFormChange={onFormChange} />
      </Tabs>
    </form>
  )
);

PropertyForm.displayName = 'PropertyForm';
