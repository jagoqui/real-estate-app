import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { propertyFormSchema, type PropertyFormSchema } from '../schemas/propertyForm.schema';
import { BasicInfoTab } from './BasicInfoTab';
import { FeaturesTab } from './FeaturesTab';
import { ImagesTab } from './ImagesTab';
import { LocationTab } from './LocationTab';
import { VirtualToursTab } from './VirtualToursTab';

interface PropertyFormWithHookFormProps {
  defaultValues?: Partial<PropertyFormSchema>;
  activeTab: string;
  onTabChange: (value: string) => void;
  onSubmit: (data: PropertyFormSchema) => void;
  onOwnerChange?: (ownerId: string, ownerName: string) => void;
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

// Sub-component for Features Tab Content
// Sub-component for Features Tab Content
const FeaturesTabContent = ({ form }: { form: UseFormReturn<PropertyFormSchema> }): React.ReactElement => {
  const features = form.watch('highlightedFeatures');
  const amenities = form.watch('amenities') as Array<Amenity>;
  const bedrooms = form.watch('bedrooms');
  const bathrooms = form.watch('bathrooms');

  return (
    <TabsContent value="features">
      <FeaturesTab
        formData={{
          features,
          amenities,
          bedrooms,
          bathrooms,
        }}
        onChange={updates => {
          if (updates.features !== undefined) form.setValue('highlightedFeatures', updates.features);
          if (updates.amenities !== undefined)
            form.setValue('amenities', updates.amenities as PropertyFormSchema['amenities']);
          if (updates.bedrooms !== undefined) form.setValue('bedrooms', updates.bedrooms);
          if (updates.bathrooms !== undefined) form.setValue('bathrooms', updates.bathrooms);
        }}
      />
    </TabsContent>
  );
};

FeaturesTabContent.displayName = 'FeaturesTabContent';

// Sub-component for Location Tab Content
const LocationTabContent = ({ form }: { form: ReturnType<typeof useForm<PropertyFormSchema>> }): React.ReactElement => {
  const address = form.watch('address');
  const city = form.watch('city');
  const state = form.watch('state');
  const country = form.watch('country');
  const location = form.watch('location') || { lat: 0, lng: 0 };

  return (
    <TabsContent value="location">
      <LocationTab
        formData={{
          address,
          city,
          state,
          country,
          location,
        }}
        onChange={updates => {
          if (updates.city !== undefined) form.setValue('city', updates.city);
          if (updates.state !== undefined) form.setValue('state', updates.state);
          if (updates.country !== undefined) form.setValue('country', updates.country);
          if (updates.location !== undefined) form.setValue('location', updates.location);
        }}
      />
    </TabsContent>
  );
};

LocationTabContent.displayName = 'LocationTabContent';

// Sub-component for Images Tab Content
const ImagesTabContent = ({ form }: { form: ReturnType<typeof useForm<PropertyFormSchema>> }): React.ReactElement => {
  const images = form.watch('images');

  return (
    <TabsContent value="images">
      <ImagesTab
        formData={{
          images,
        }}
        onChange={updates => {
          if (updates.images !== undefined) form.setValue('images', updates.images);
        }}
      />
    </TabsContent>
  );
};

ImagesTabContent.displayName = 'ImagesTabContent';

// Sub-component for Virtual Tours Tab Content
const VirtualToursTabContent = ({
  form,
}: {
  form: ReturnType<typeof useForm<PropertyFormSchema>>;
}): React.ReactElement => {
  const virtualTours = form.watch('virtualTours');

  return (
    <TabsContent value="virtual-tours">
      <VirtualToursTab
        formData={{
          virtualTours,
        }}
        onChange={updates => {
          if (updates.virtualTours !== undefined) form.setValue('virtualTours', updates.virtualTours);
        }}
      />
    </TabsContent>
  );
};

VirtualToursTabContent.displayName = 'VirtualToursTabContent';

export const PropertyForm = React.memo(
  ({ defaultValues, activeTab, onTabChange, onSubmit, onOwnerChange }: PropertyFormWithHookFormProps) => {
    const form = useForm<PropertyFormSchema>({
      resolver: zodResolver(propertyFormSchema),
      defaultValues: {
        name: '',
        price: '',
        area: '',
        buildYear: '',
        bedrooms: '',
        bathrooms: '',
        description: '',
        highlightedFeatures: '',
        ownerId: '',
        ownerName: '',
        status: 'available',
        type: 'house',
        city: '',
        state: '',
        country: '',
        featured: false,
        amenities: [],
        images: [],
        location: undefined,
        virtualTours: [],
        ...defaultValues,
      },
    });

    // Update form when defaultValues change (for edit mode)
    useEffect(() => {
      if (defaultValues) {
        form.reset(defaultValues);
      }
    }, [defaultValues, form]);

    return (
      <Form {...form}>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.info('Form submit triggered');
            console.info('Form errors:', form.formState.errors);
            console.info('Form values:', form.getValues());
            void form.handleSubmit(
              data => {
                console.info('Form validation passed, calling onSubmit with:', data);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - TFieldValues type inference issue
                onSubmit(data);
              },
              errors => {
                console.error('Form validation failed:', errors);
              }
            )(e);
          }}
          className="space-y-4"
          id="property-form"
        >
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full min-h-0">
            <FormTabsList />

            <TabsContent value="basic">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore - Control type inference issue */}
              <BasicInfoTab control={form.control} onOwnerChange={onOwnerChange} />
            </TabsContent>

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore - UseFormReturn type inference issue */}
            <FeaturesTabContent form={form} />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore - UseFormReturn type inference issue */}
            <LocationTabContent form={form} />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore - UseFormReturn type inference issue */}
            <ImagesTabContent form={form} />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore - UseFormReturn type inference issue */}
            <VirtualToursTabContent form={form} />
          </Tabs>
        </form>
      </Form>
    );
  }
);

PropertyForm.displayName = 'PropertyForm';
