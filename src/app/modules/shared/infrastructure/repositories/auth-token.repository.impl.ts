import { AUTH_RESPONSE_STORAGE_KEY } from '@/modules/shared/domain/constants/local-storage-keys.constants';
import type { AuthResponse } from '../../domain/models/auth-response.model';
import type { AuthTokenRepository } from '../../domain/repositories/auth-token.repository';

/**
 * Implementation of the AuthTokenRepository interface for managing authentication tokens in localStorage.
 *
 * @remarks
 * This implementation provides secure storage and retrieval of authentication tokens with the following features:
 * - SSR-safe operations (checks for browser environment)
 * - Data integrity validation
 * - Automatic cleanup of corrupted data
 * - Error handling for JSON parsing failures
 *
 * @example
 * ```typescript
 * // Save authentication token
 * authTokenRepositoryImpl.save({
 *   accessToken: 'abc123',
 *   refreshToken: 'xyz789'
 * });
 *
 * // Retrieve authentication token
 * const token = authTokenRepositoryImpl.get();
 *
 * // Remove authentication token
 * authTokenRepositoryImpl.remove();
 * ```
 */
export const authTokenRepositoryImpl: AuthTokenRepository = {
  get: (): AuthResponse | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(AUTH_RESPONSE_STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored) as AuthResponse;

      if (!parsed.accessToken || !parsed.refreshToken) {
        localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
        return null;
      }

      return parsed;
    } catch {
      localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
      return null;
    }
  },

  save: (token: AuthResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_RESPONSE_STORAGE_KEY, JSON.stringify(token));
    }
  },

  remove: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_RESPONSE_STORAGE_KEY);
    }
  },
};
