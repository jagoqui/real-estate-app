import { AUTH_RESPONSE_MOCK } from '@/data/mocks/authResponse/authResponse.mock'; // Asume que este mock es un objeto AuthResponse válido
import { AUTH_RESPONSE_STORAGE_KEY } from '@/modules/shared/domain/constants/local-storage-keys.constants';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAuthToken } from '../get-auth-token.bl'; // Ajusta la ruta

const getItem = vi.fn();
const setItem = vi.fn();
const removeItem = vi.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: Array<string>): string | null => getItem(...args) as string | null,
    setItem: (...args: Array<string>): void => {
      setItem(...args);
    },
    removeItem: (...args: Array<string>): void => {
      removeItem(...args);
    },
  },
});

describe('getAuthTokenBL', () => {
  beforeEach(() => {
    const VALID_STORED_AUTH = JSON.stringify(AUTH_RESPONSE_MOCK);
    getItem.mockReturnValue(VALID_STORED_AUTH);
  });

  afterEach(() => vi.clearAllMocks());

  it('should return access and refresh tokens when they exist in localStorage', () => {
    const tokens = getAuthToken();

    expect(getItem).toHaveBeenCalledWith(AUTH_RESPONSE_STORAGE_KEY);
    expect(tokens).toEqual({
      accessToken: AUTH_RESPONSE_MOCK.accessToken,
      refreshToken: AUTH_RESPONSE_MOCK.refreshToken,
    });
    expect(removeItem).not.toHaveBeenCalled();
  });

  it('should return null when no auth response is found in localStorage', () => {
    getItem.mockReturnValue(null);

    const tokens = getAuthToken();

    expect(getItem).toHaveBeenCalledWith(AUTH_RESPONSE_STORAGE_KEY);
    expect(tokens).toBeNull();
    expect(removeItem).not.toHaveBeenCalled(); // No hay nada que limpiar
  });

  it('should return null and call removeItem when the stored value is not a valid JSON', () => {
    getItem.mockReturnValue('invalid-json-string');

    const tokens = getAuthToken();

    expect(getItem).toHaveBeenCalledWith(AUTH_RESPONSE_STORAGE_KEY);
    expect(removeItem).toHaveBeenCalledWith(AUTH_RESPONSE_STORAGE_KEY);
    expect(tokens).toBeNull();
  });

  it('should return null when the stored object is missing the accessToken', () => {
    const invalidAuthWithoutAccess = JSON.stringify({
      refreshToken: AUTH_RESPONSE_MOCK.refreshToken,
      expiresIn: 3600,
    });
    getItem.mockReturnValue(invalidAuthWithoutAccess);

    const tokens = getAuthToken();

    expect(tokens).toBeNull();
    expect(removeItem).not.toHaveBeenCalled();
  });

  it('should return null when the stored object is missing the refreshToken', () => {
    const invalidAuthWithoutRefresh = JSON.stringify({
      accessToken: AUTH_RESPONSE_MOCK.accessToken,
      expiresIn: 3600,
    });
    getItem.mockReturnValue(invalidAuthWithoutRefresh);

    const tokens = getAuthToken();

    expect(tokens).toBeNull();
    expect(removeItem).not.toHaveBeenCalled();
  });
});
