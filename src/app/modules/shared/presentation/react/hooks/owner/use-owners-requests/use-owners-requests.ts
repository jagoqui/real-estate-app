import type { OwnersRequests } from '@/modules/shared/domain/contracts/owners-request.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/async-function-validation-wrapper/async-function-validation-wrapper.helper';
import { createOwnerRequest } from '@/modules/shared/infrastructure/requests/create-owner/create-owner.request';
import { deleteOwnerRequest } from '@/modules/shared/infrastructure/requests/delete-owner/delete-owner.request';
import { getOwnerByIdRequest } from '@/modules/shared/infrastructure/requests/get-owner-by-id/get-owner-by-id.request';
import { getOwnerByUserIdRequest } from '@/modules/shared/infrastructure/requests/get-owner-by-user-id/get-owner-by-user-id.request';
import { getOwnersRequest } from '@/modules/shared/infrastructure/requests/get-owners/get-owners.request';
import { getPropertiesCountByOwnerIdRequest } from '@/modules/shared/infrastructure/requests/get-properties-count-by-owner-id/get-properties-count-by-owner-id.request';
import { updateOwnerRequest } from '@/modules/shared/infrastructure/requests/update-owner/update-owner.request';

const OWNERS_REQUEST: OwnersRequests = {
  createOwnerRequest,
  getOwnerByIdRequest,
  getOwnersRequest,
  getOwnerByUserIdRequest,
  getPropertiesCountByOwnerIdRequest,
  updateOwnerRequest,
  deleteOwnerRequest,
};

export const useOwnersRequests = (): OwnersRequests => {
  const wrappedRequests: OwnersRequests = {
    createOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.createOwnerRequest,
        args,
      }),
    getOwnerByIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnerByIdRequest,
        args,
      }),
    getOwnersRequest: async () =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnersRequest,
      }),
    getOwnerByUserIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getOwnerByUserIdRequest,
        args,
      }),
    getPropertiesCountByOwnerIdRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.getPropertiesCountByOwnerIdRequest,
        args,
      }),
    updateOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.updateOwnerRequest,
        args,
      }),
    deleteOwnerRequest: async args =>
      asyncFunctionValidationWrapper({
        fn: OWNERS_REQUEST.deleteOwnerRequest,
        args,
      }),
  };

  return wrappedRequests;
};
