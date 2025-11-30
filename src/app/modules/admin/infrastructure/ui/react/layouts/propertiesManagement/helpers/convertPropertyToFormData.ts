import { urlsToFiles } from '@/modules/shared/domain/helpers/urlToFile';
import { type Property } from '@/modules/shared/domain/models/property.model';
import { type UpdatePropertyFormValues } from '@/modules/shared/domain/models/propertyForm.model';
import { updatePropertyFormValuesSchema } from '@/modules/shared/infrastructure/schemas/propertyForm.schema';

export const convertPropertyToFormData = async (property: Property): Promise<UpdatePropertyFormValues> => {
  const imageUrls = [property.coverImage, ...property.images].filter((url): url is string => url !== null);
  const imagesFiles = await urlsToFiles(imageUrls);

  const formData: UpdatePropertyFormValues = {
    ...property,
    coverImageFile: imagesFiles[0],
    imagesFiles: [...imagesFiles.slice(1)],
    action: 'update',
  };
  return updatePropertyFormValuesSchema.parse(formData);
};
