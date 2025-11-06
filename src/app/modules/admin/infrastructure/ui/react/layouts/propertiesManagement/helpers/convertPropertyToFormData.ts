import { type Property } from '@/modules/shared/domain/schemas/property.schema';
import {
  updatePropertyFormValuesSchema,
  type PropertyFormValues,
} from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = (property: Property): PropertyFormValues => {
  const formData = {
    ...property,
    action: 'update',
  };
  return updatePropertyFormValuesSchema.parse(formData);
};
