export const PROPERTY_STATUSES = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  PENDING: 'pending',
} as const satisfies Record<string, string>;

export type PropertyStatutes = keyof typeof PROPERTY_STATUSES | (string & {});
