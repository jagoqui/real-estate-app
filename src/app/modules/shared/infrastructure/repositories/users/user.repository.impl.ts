import type { UserRepository } from '@/modules/shared/domain/repositories/user.repository';
import { changeUserPasswordAction } from './actions/change-user-password-action';
import { createUserAction } from './actions/create-user.action';
import { deleteUserAction } from './actions/delete-user.action';
import { getUserByIdAction } from './actions/get-user-by-id.action';
import { getUsersWithoutOwnerAction } from './actions/get-users-without-owner-action';
import { getUsersAction } from './actions/get-users.action';
import { updateUserAction } from './actions/update-user-action';

export const userRepositoryImpl: UserRepository = {
  create: createUserAction,
  getAll: getUsersAction,
  getById: getUserByIdAction,
  getUsersWithoutOwner: getUsersWithoutOwnerAction,
  update: updateUserAction,
  changePassword: changeUserPasswordAction,
  delete: deleteUserAction,
};
