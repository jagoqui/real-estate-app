import type { UpdateUser, User } from '../schemas/user.schema';

interface UpdateUserRequestArgs {
  user: UpdateUser;
  photoFile?: File | null;
}

export type UpdateUserRequest = (args: UpdateUserRequestArgs) => Promise<User>;

export interface UsersRequests {
  updateUserRequest: UpdateUserRequest;
}
