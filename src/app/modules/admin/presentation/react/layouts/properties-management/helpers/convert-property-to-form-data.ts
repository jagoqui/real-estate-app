import type { UpdatePropertyData } from '@/modules/shared/domain/data/property.data';
import { urlsToFiles } from '@/modules/shared/domain/helpers/url-to-file/url-to-file.helper';
import { type Property } from '@/modules/shared/domain/models/property.model';
import { updatePropertyDataSchema } from '@/modules/shared/infrastructure/schemas/property-data.schema';

export const convertPropertyToFormData = async (property: Property): Promise<UpdatePropertyData> => {
  const imageUrls = [property.coverImage, ...property.images].filter((url): url is string => url !== null);
  const imagesFiles = await urlsToFiles(imageUrls);

  const formData: UpdatePropertyData = {
    ...property,
    coverImageFile: imagesFiles[0],
    imagesFiles: [...imagesFiles.slice(1)],
    action: 'update',
  };
  return updatePropertyDataSchema.parse(formData);
};
