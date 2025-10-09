import type { UsersRequests } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import type { User } from '@/modules/shared/domain/schemas/user.schema';
import { getUsersWithoutOwnerRequest } from '@/modules/shared/infrastructure/requests/getUsersWithoutOwner/getUsersWithoutOwner.request';
import { updateUserRequest } from '@/modules/shared/infrastructure/requests/updateUser/updateUser.request';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

const USER_REQUESTS: UsersRequests = {
  getUsersWithoutOwnerRequest,
  updateUserRequest,
};

export const useUserRequests = (): UsersRequests => {
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
  };

  return wrappedRequests;
};
