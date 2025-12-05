export const PROPERTY_STATUSES = {
  AVAILABLE: 'AVAILABLE',
  SOLD: 'SOLD',
  PENDING: 'PENDING',
  UNKNOWN: 'UNKNOWN',
} as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[keyof typeof PROPERTY_STATUSES];
