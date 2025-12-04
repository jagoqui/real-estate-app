import type { Auth } from '../models/auth.model';

export interface AuthTokenRepository {
  get(): Auth | null;
  save(token: Auth): void;
  remove(): void;
}
