import type { ChangePasswordCommand, CreateUserCommand, UpdateUserCommand } from '../../commands/user.commands';
import type { User } from '../../models/user.model';

export interface UserRepository {
  create(args: CreateUserCommand): Promise<User>;
  getAll(): Promise<Array<User>>;
  getById(userId: string): Promise<User>;
  getUsersWithoutOwner(): Promise<Array<User>>;
  update(args: UpdateUserCommand): Promise<User>;
  changePassword(args: ChangePasswordCommand): Promise<void>;
  delete(userId: string): Promise<void>;
}
