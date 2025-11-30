import type { Token } from './token.model';
import type { User } from './user.model';

export type AuthResponse = Token & {
  user: User;
};
