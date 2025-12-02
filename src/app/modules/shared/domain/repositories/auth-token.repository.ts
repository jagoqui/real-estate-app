import type { AuthResponse } from '../models/auth-response.model';

export interface AuthTokenRepository {
  get(): AuthResponse | null;
  save(token: AuthResponse): void;
  remove(): void;
}
