import type { OwnerRepository } from '@/modules/shared/domain/repositories/owner.repository';
import { createOwnerAction } from './create-owner/create-owner.action';
import { deleteOwnerAction } from './delete-owner/delete-owner.action';
import { getOwnerByIdAction } from './get-owner-by-id/get-owner-by-id.action';
import { getOwnerByUserIdAction } from './get-owner-by-user-id/get-owner-by-user-id.action';
import { getOwnersAction } from './get-owners/get-owners.action';
import { getPropertiesCountByOwnerIdAction } from './get-properties-count-by-owner-id/get-properties-count-by-owner-id.action';
import { updateOwnerAction } from './update-owner/update-owner.action';

export const ownerRepositoryImpl: OwnerRepository = {
  create: createOwnerAction,
  getAll: getOwnersAction,
  getById: getOwnerByIdAction,
  getByUserId: getOwnerByUserIdAction,
  getPropertiesCountByOwnerId: getPropertiesCountByOwnerIdAction,
  update: updateOwnerAction,
  delete: deleteOwnerAction,
};
