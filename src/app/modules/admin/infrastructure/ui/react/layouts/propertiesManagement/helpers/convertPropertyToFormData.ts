import { type Property } from '@/modules/shared/domain/schemas/property.schema';
import { propertyFormValuesSchema, type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = (property: Property): PropertyFormValues => {
  const formData = {
    ...property,
    action: 'update',
  };
  return propertyFormValuesSchema.parse(formData);
};
