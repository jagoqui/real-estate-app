import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { propertyFormValuesSchema, type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, type DefaultValues } from 'react-hook-form';
import { BasicInfoTab } from './BasicInfoTab';
import { FeaturesTab } from './FeaturesTab';
import { ImagesTab } from './ImagesTab';
import { LocationTab } from './LocationTab';
import { VirtualToursTab } from './VirtualToursTab';

interface PropertyFormWithHookFormProps {
  defaultValues?: DefaultValues<PropertyFormValues>;
  activeTab: string;
  onTabChange: (value: string) => void;
  onSubmit: (data: PropertyFormValues) => void;
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

const formDefaultValues: DefaultValues<PropertyFormValues> = {
  action: 'create',
  amenities: [],
  highlightedFeatures: [],
  imagesFiles: [],
  views360Url: [],
};

export const PropertyForm = React.memo(
  ({ defaultValues, activeTab, onTabChange, onSubmit, onOwnerChange }: PropertyFormWithHookFormProps) => {
    const form = useForm<PropertyFormValues>({
      resolver: zodResolver(propertyFormValuesSchema),
      defaultValues: defaultValues ?? formDefaultValues,
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
              <BasicInfoTab onOwnerChange={onOwnerChange} />
            </TabsContent>

            <TabsContent value="features">
              <FeaturesTab />
            </TabsContent>
            <TabsContent value="location">
              <LocationTab />
            </TabsContent>
            <TabsContent value="images">
              <ImagesTab />
            </TabsContent>
            <TabsContent value="virtual-tours">
              <VirtualToursTab />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    );
  }
);

PropertyForm.displayName = 'PropertyForm';
