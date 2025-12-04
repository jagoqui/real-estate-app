import type { PropertyRepository } from '@/modules/shared/domain/repositories/property.repository';
import { createPropertyAction } from './create-property/create-property.action';
import { deletePropertyAction } from './delete-property/delete-property.action';
import { getAllPropertiesAction } from './get-all-properties/get-all-properties.action';
import { getPropertiesByFilterAction } from './get-properties-by-filter/get-properties-by-filter.action';
import { getPropertiesByOwnerIdAction } from './get-properties-by-owner-id/get-properties-by-owner-id.action';
import { getPropertyByIdAction } from './get-property-by-id/get-property-by-id.action';
import { getPropertyStatusesAction } from './get-property-statuses/get-property-statuses.action';
import { getPropertyTypesAction } from './get-property-types/get-property-types.action';
import { updatePropertyStatusAction } from './update-property-status/update-property-status.action';
import { updatePropertyAction } from './update-property/update-property.action';

export const propertyRepositoryImpl: PropertyRepository = {
  create: createPropertyAction,
  getAll: getAllPropertiesAction,
  getById: getPropertyByIdAction,
  getByOwnerId: getPropertiesByOwnerIdAction,
  getTypes: getPropertyTypesAction,
  getStatuses: getPropertyStatusesAction,
  getByFilter: getPropertiesByFilterAction,
  update: updatePropertyAction,
  updateStatus: updatePropertyStatusAction,
  delete: deletePropertyAction,
};
