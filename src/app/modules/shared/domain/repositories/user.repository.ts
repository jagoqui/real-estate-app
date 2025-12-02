import type { ChangePasswordInput } from '../inputs/users/change-password.input';
import type { CreateUserInput } from '../inputs/users/create-user.input';
import type { UpdateUserInput } from '../inputs/users/update-user.input';
import type { User } from '../models/user.model';

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
  getAll(): Promise<Array<User>>;
  getById(userId: string): Promise<User>;
  getUsersWithoutOwner(): Promise<Array<User>>;
  update(input: UpdateUserInput): Promise<User>;
  changePassword(input: ChangePasswordInput): Promise<void>;
  delete(userId: string): Promise<void>;
}
