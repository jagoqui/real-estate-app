import type { UserRepository } from '@/modules/shared/domain/ports/repositories/user.repository';
import { changeUserPasswordAdapter } from './change-user-password/change-user-password.adapter';
import { createUserAdapter } from './create-user/create-user.adapter';
import { deleteUserAdapter } from './delete-user/delete-user.adapter';
import { getUserByIdAdapter } from './get-user-by-id/get-user-by-id.action';
import { getUsersWithoutOwnerAdapter } from './get-users-without-owner/get-users-without-owner.adapter';
import { getUsersAdapter } from './get-users/get-users.adapter';
import { updateUserAdapter } from './update-user/update-user.adapter';

export const userRepositoryImpl: UserRepository = {
  create: createUserAdapter,
  getAll: getUsersAdapter,
  getById: getUserByIdAdapter,
  getUsersWithoutOwner: getUsersWithoutOwnerAdapter,
  update: updateUserAdapter,
  changePassword: changeUserPasswordAdapter,
  delete: deleteUserAdapter,
};
