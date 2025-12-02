import type { PropertiesRequests } from '@/modules/shared/domain/contracts/properties-requests.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/async-function-validation-wrapper/async-function-validation-wrapper.helper';
import { createPropertyRequest } from '@/modules/shared/infrastructure/requests/create-property/create-property.request';
import { deletePropertyRequest } from '@/modules/shared/infrastructure/requests/delete-property/delete-property.request';
import { getPropertiesByFilterRequest } from '@/modules/shared/infrastructure/requests/get-properties-by-filter/get-properties-by-filter.request';
import { getPropertiesByOwnerIdRequest } from '@/modules/shared/infrastructure/requests/get-properties-by-owner-id/get-properties-by-owner-id.request';
import { getPropertiesStatusesRequest } from '@/modules/shared/infrastructure/requests/get-properties-statuses/get-properties-statuses.request';
import { getPropertiesTypesRequest } from '@/modules/shared/infrastructure/requests/get-properties-types/get-properties-types.request';
import { getPropertiesRequest } from '@/modules/shared/infrastructure/requests/get-properties/get-properties.request';
import { getPropertyByIdRequest } from '@/modules/shared/infrastructure/requests/get-property-by-id/get-property-by-id.request';
import { updatePropertyStatusRequest } from '@/modules/shared/infrastructure/requests/update-property-status/update-property-status.request';
import { updatePropertyRequest } from '@/modules/shared/infrastructure/requests/update-property/update-property.request';

const PROPERTIES_REQUESTS: PropertiesRequests = {
  createPropertyRequest,
  getPropertiesRequest,
  getPropertyByIdRequest,
  getPropertiesByOwnerIdRequest,
  getPropertiesTypesRequest,
  getPropertiesStatusesRequest,
  getPropertiesByFilterRequest,
  updatePropertyRequest,
  updatePropertyStatusRequest,
  deletePropertyRequest,
};

export const usePropertiesRequests = (): PropertiesRequests => {
  const wrappedRequests: PropertiesRequests = {
    createPropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.createPropertyRequest,
        args,
      }),
    getPropertiesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesRequest,
      }),
    getPropertyByIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertyByIdRequest,
        args,
      }),
    getPropertiesByOwnerIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesByOwnerIdRequest,
        args,
      }),
    getPropertiesTypesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesTypesRequest,
      }),
    getPropertiesStatusesRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesStatusesRequest,
      }),
    getPropertiesByFilterRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.getPropertiesByFilterRequest,
        args,
      }),
    updatePropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.updatePropertyRequest,
        args,
      }),
    updatePropertyStatusRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.updatePropertyStatusRequest,
        args,
      }),
    deletePropertyRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: PROPERTIES_REQUESTS.deletePropertyRequest,
        args,
      }),
  };

  return wrappedRequests;
};
