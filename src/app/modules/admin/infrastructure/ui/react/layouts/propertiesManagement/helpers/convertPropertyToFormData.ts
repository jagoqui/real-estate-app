import { type Property } from '@/modules/shared/domain/schemas/property.schema';
import {
  updatePropertyFormValuesSchema,
  type UpdatePropertyFormValues,
} from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = (property: Property): UpdatePropertyFormValues => {
  const formData: UpdatePropertyFormValues = {
    ...property,
    imagesFiles: [],
    action: 'update',
  };
  return updatePropertyFormValuesSchema.parse(formData);
};
