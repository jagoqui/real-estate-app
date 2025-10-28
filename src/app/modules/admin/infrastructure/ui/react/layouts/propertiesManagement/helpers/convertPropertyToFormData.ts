import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = (property?: Property): PropertyFormValues => ({
  ...property,
  action: property ? 'update' : 'create',
});
