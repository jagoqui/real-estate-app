import { PROPERTY_TYPES, type PropertyType } from '@/modules/shared/domain/models/property-types.model';
import { Logger } from '@/modules/shared/infrastructure/services/logger/logger.service';

const isValidType = (type: string): type is PropertyType => {
  return Object.values(PROPERTY_TYPES).includes(type as PropertyType);
};

export const mapPropertyTypeToModel = (rawType: string): PropertyType => {
  if (isValidType(rawType)) {
    return rawType;
  }

  Logger.warn(`Unknown Property Type received: '${rawType}'`, {
    context: 'PropertyTypeMapper',
    fallback: PROPERTY_TYPES.UNKNOWN,
  });

  return PROPERTY_TYPES.UNKNOWN;
};
