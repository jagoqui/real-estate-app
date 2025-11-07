import { urlsToFiles } from '@/modules/shared/domain/helpers/urlToFile';
import { type Property } from '@/modules/shared/domain/schemas/property.schema';
import {
  updatePropertyFormValuesSchema,
  type UpdatePropertyFormValues,
} from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = async (property: Property): Promise<UpdatePropertyFormValues> => {
  const imageUrls = [property.coverImage, ...property.images].filter((url): url is string => url !== null);
  const imagesFiles = await urlsToFiles(imageUrls);

  const formData: UpdatePropertyFormValues = {
    ...property,
    imagesFiles,
    coverImageFile: imagesFiles[0],
    action: 'update',
  };
  return updatePropertyFormValuesSchema.parse(formData);
};
