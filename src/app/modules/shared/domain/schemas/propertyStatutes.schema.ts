import z from 'zod';

export const PROPERTY_STATUSES = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  PENDING: 'pending',
} as const satisfies Record<string, string>;

export const propertyStatutesSchema = z.custom<PropertyStatutes>();

export type PropertyStatutes = (typeof PROPERTY_STATUSES)[keyof typeof PROPERTY_STATUSES];
