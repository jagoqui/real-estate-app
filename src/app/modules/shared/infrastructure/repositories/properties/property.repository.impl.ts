import type { PropertyRepository } from '@/modules/shared/domain/repositories/property.repository';
import { createPropertyAdapter } from './create-property/create-property.adapter';
import { deletePropertyAdapter } from './delete-property/delete-property.adapter';
import { getAllPropertiesAdapter } from './get-all-properties/get-all-properties.adapter';
import { getPropertiesByFilterAdapter } from './get-properties-by-filter/get-properties-by-filter.adapter';
import { getPropertiesByOwnerIdAdapter } from './get-properties-by-owner-id/get-properties-by-owner-id.adapter';
import { getPropertyByIdAdapter } from './get-property-by-id/get-property-by-id.adapter';
import { getPropertyStatusesAdapter } from './get-property-statuses/get-property-statuses.adapter';
import { getPropertyTypesAdapter } from './get-property-types/get-property-types.adapter';
import { updatePropertyStatusAdapter } from './update-property-status/update-property-status.adapter';
import { updatePropertyAdapter } from './update-property/update-property.adapter';

export const propertyRepositoryImpl: PropertyRepository = {
  create: createPropertyAdapter,
  getAll: getAllPropertiesAdapter,
  getById: getPropertyByIdAdapter,
  getByOwnerId: getPropertiesByOwnerIdAdapter,
  getTypes: getPropertyTypesAdapter,
  getStatuses: getPropertyStatusesAdapter,
  getByFilter: getPropertiesByFilterAdapter,
  update: updatePropertyAdapter,
  updateStatus: updatePropertyStatusAdapter,
  delete: deletePropertyAdapter,
};
