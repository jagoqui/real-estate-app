import { urlsToFiles } from '@/modules/shared/domain/helpers/urlToFile';
import { type Property } from '@/modules/shared/domain/schemas/property.schema';
import {
  updatePropertyFormValuesSchema,
  type UpdatePropertyFormValues,
} from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = async (property: Property): Promise<UpdatePropertyFormValues> => {
  const imagesFiles = await urlsToFiles(property.images);
  const formData: UpdatePropertyFormValues = {
    ...property,
    imagesFiles,
    action: 'update',
  };
  return updatePropertyFormValuesSchema.parse(formData);
};
