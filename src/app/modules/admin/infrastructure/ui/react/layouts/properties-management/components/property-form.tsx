import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type PropertyFormValues } from '@/modules/shared/domain/models/property-form.model';
import {
  createPropertyFormValuesSchema,
  updatePropertyFormValuesSchema,
} from '@/modules/shared/infrastructure/schemas/property-form.schema';
import { useCreatePropertyRequest } from '@/modules/shared/infrastructure/ui/react/hooks/use-create-property-request/use-create-property-request';
import { useUpdatePropertyRequest } from '@/modules/shared/infrastructure/ui/react/hooks/use-update-property-request/use-update-property-request';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, type DefaultValues } from 'react-hook-form';
import { BasicInfoTab } from './basic-infoTab';
import { FeaturesTab } from './features-tab';
import { ImagesTab } from './Images-tab';
import { LocationTab } from './location-tab';
import { VirtualToursTab } from './virtual-toursTab';

interface PropertyFormWithHookFormProps {
  defaultValues?: DefaultValues<PropertyFormValues>;
  onReset: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
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
} as const;

interface ErrorWithMessage {
  message?: string;
  [key: string]: unknown;
}

const flattenErrors = (
  errors: Record<string, ErrorWithMessage>,
  parentKey = ''
): Array<{ field: string; message: string }> => {
  const result: Array<{ field: string; message: string }> = [];

  Object.entries(errors).forEach(([key, value]) => {
    const fieldPath = parentKey ? `${parentKey}.${key}` : key;

    // If the error has a message property, it's a leaf error
    if (value?.message && typeof value.message === 'string') {
      result.push({
        field: fieldPath,
        message: value.message,
      });
    }
    // If it's an object without a message, it might have nested errors
    else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested errors
      result.push(...flattenErrors(value as Record<string, ErrorWithMessage>, fieldPath));
    }
  });

  return result;
};

// eslint-disable-next-line max-lines-per-function
export const PropertyForm = React.memo(({ defaultValues, onReset, onLoadingChange }: PropertyFormWithHookFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('basic');

  const schema = defaultValues ? updatePropertyFormValuesSchema : createPropertyFormValuesSchema;

  const form = useForm<PropertyFormValues>({
    //Use never to bypass type issues with zod discriminations types and react-hook-form
    resolver: zodResolver(schema) as never,
    defaultValues: defaultValues ?? formDefaultValues,
  });

  const [formErrors, setFormErrors] = useState<typeof form.formState.errors>();

  const {
    onCreateProperty,
    isPending: isCreating,
    error: createError,
  } = useCreatePropertyRequest({
    onSuccess: onReset,
  });

  const {
    onUpdateProperty,
    isPending: isUpdating,
    error: updateError,
  } = useUpdatePropertyRequest({
    onSuccess: onReset,
  });

  const isLoading = isCreating || isUpdating;
  const error = createError || updateError;

  React.useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const onSubmit = (data: PropertyFormValues): void => {
    if (data.action === 'create') {
      onCreateProperty(data);
      return;
    }

    onUpdateProperty({
      data: {
        ...data,
        action: 'update',
      },
      propertyId: data.id,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    void form.handleSubmit(
      data => {
        onSubmit(data);
      },
      errors => {
        setFormErrors(errors);
      }
    )(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={handlerSubmit} className="space-y-4" id="property-form">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-h-0">
          <FormTabsList />

          <TabsContent value="basic">
            <BasicInfoTab />
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
        {formErrors && Object.keys(formErrors).length > 0 && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <h3 className="font-semibold mb-2">Please fix the following errors:</h3>
            <ul className="list-disc list-inside space-y-1">
              {flattenErrors(formErrors as Record<string, ErrorWithMessage>).map(({ field, message }) => (
                <li key={field}>
                  <span className="font-medium">{field}</span>: {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mt-4">
          <h3 className="font-semibold">Submission Error:</h3>
          <p>{error.message}</p>
        </div>
      )}
    </Form>
  );
});

PropertyForm.displayName = 'PropertyForm';
