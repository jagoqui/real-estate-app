import type { ChangeUserPassword, CreateUser, UpdateUser, User } from '../schemas/user.schema';

interface UpdateUserRequestArgs {
  user: UpdateUser;
  photoFile?: File | null;
}

export type CreateUserRequest = (args: CreateUser) => Promise<User>;

export type GetUsersRequest = () => Promise<Array<User>>;

export type GetUserByIdRequest = (args: { userId: string }) => Promise<User>;

export type GetUsersWithoutOwnerRequest = () => Promise<Array<User>>;

export type UpdateUserRequest = (args: UpdateUserRequestArgs) => Promise<User>;

export type ChangeUserPasswordRequest = (args: ChangeUserPassword) => Promise<void>;

export type DeleteUserRequest = (args: { userId: string }) => Promise<void>;

export interface UsersRequests {
  createUserRequest: CreateUserRequest;
  getUsersRequest: GetUsersRequest;
  getUserByIdRequest: GetUserByIdRequest;
  getUsersWithoutOwnerRequest: GetUsersWithoutOwnerRequest;
  updateUserRequest: UpdateUserRequest;
  changeUserPasswordRequest: ChangeUserPasswordRequest;
  deleteUserRequest: DeleteUserRequest;
}
