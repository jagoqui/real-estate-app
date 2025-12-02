import type { UserRepository } from '@/modules/shared/domain/repositories/user.repository';
import { changeUserPasswordAction } from './change-user-password-action/change-user-password.action';
import { createUserAction } from './create-user/create-user.action';
import { deleteUserAction } from './delete-user/delete-user.action';
import { getUserByIdAction } from './get-user-by-id/get-user-by-id.action';
import { getUsersWithoutOwnerAction } from './get-users-without-owner/get-users-without-owner.action';
import { getUsersAction } from './get-users/get-users.action';
import { updateUserAction } from './update-user/update-user.action';

export const userRepositoryImpl: UserRepository = {
  create: createUserAction,
  getAll: getUsersAction,
  getById: getUserByIdAction,
  getUsersWithoutOwner: getUsersWithoutOwnerAction,
  update: updateUserAction,
  changePassword: changeUserPasswordAction,
  delete: deleteUserAction,
};
