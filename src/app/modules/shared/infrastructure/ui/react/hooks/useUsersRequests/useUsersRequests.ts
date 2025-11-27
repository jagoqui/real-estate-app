import type { UsersRequests } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import { changeUserPasswordRequest } from '@/modules/shared/infrastructure/requests/changeUserPassword/changeUserPassword';
import { createUserRequest } from '@/modules/shared/infrastructure/requests/createUser/createUser.request';
import { deleteUserRequest } from '@/modules/shared/infrastructure/requests/deleteUser/deleteUser.request';
import { getUserByIdRequest } from '@/modules/shared/infrastructure/requests/getUserById/getUserById.request';
import { getUsersRequest } from '@/modules/shared/infrastructure/requests/getUsers/getUsers.request';
import { getUsersWithoutOwnerRequest } from '@/modules/shared/infrastructure/requests/getUsersWithoutOwner/getUsersWithoutOwner.request';
import { updateUserRequest } from '@/modules/shared/infrastructure/requests/updateUser/updateUser.request';
import type { User } from '@/modules/shared/infrastructure/schemas/user.schema';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

const USER_REQUESTS: UsersRequests = {
  createUserRequest,
  getUsersRequest,
  getUserByIdRequest,
  getUsersWithoutOwnerRequest,
  updateUserRequest,
  changeUserPasswordRequest,
  deleteUserRequest,
};

export const useUsersRequests = (): UsersRequests => {
  const { setAuthResponse } = useAuthResponseContext();

  const onUpdateUserSuccess = (args: Awaited<ReturnType<typeof USER_REQUESTS.updateUserRequest>>): void => {
    setAuthResponse(prev => {
      if (!prev) return null;
      const userToUpdated: User = {
        ...prev.user,
        name: args.name,
        email: args.email,
        photoUrl: args.photoUrl,
        phone: args.phone,
        bio: args.bio,
      };
      return {
        accessToken: prev.accessToken,
        refreshToken: prev.refreshToken,
        user: userToUpdated,
      };
    });
  };

  const wrappedRequests: UsersRequests = {
    createUserRequest: async (user): Promise<User> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.createUserRequest,
        args: user,
      }),
    getUsersRequest: async (): Promise<Array<User>> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.getUsersRequest,
      }),
    getUserByIdRequest: async (args): Promise<User> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.getUserByIdRequest,
        args,
      }),
    getUsersWithoutOwnerRequest: async (): Promise<Array<User>> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.getUsersWithoutOwnerRequest,
      }),
    updateUserRequest: async (args): Promise<User> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.updateUserRequest,
        args,
        onSuccess: onUpdateUserSuccess,
      }),
    changeUserPasswordRequest: async (args): Promise<void> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.changeUserPasswordRequest,
        args,
      }),
    deleteUserRequest: async (args): Promise<void> =>
      asyncFunctionValidationWrapper({
        fn: USER_REQUESTS.deleteUserRequest,
        args,
      }),
  };

  return wrappedRequests;
};
