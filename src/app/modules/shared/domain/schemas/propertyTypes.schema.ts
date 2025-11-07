import z from 'zod';

export const PROPERTIES_TYPES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  CONDO: 'condo',
  TOWNHOUSE: 'townhouse',
  LAND: 'land',
  COMMERCIAL: 'commercial',
  OTHER: 'other',
} as const satisfies Record<string, string>;

export const propertyTypesSchema = z.custom<PropertyTypes>();

export type PropertyTypes = keyof typeof PROPERTIES_TYPES | (string & {});
