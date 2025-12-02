import { AUTH_RESPONSE_DTO_MOCK } from '@/data/__mocks__/auth-response/auth-response-dto.mock';
import { AUTH_RESPONSE_MOCK } from '@/data/__mocks__/auth-response/auth-response.mock';
import { TOKEN_MOCK } from '@/data/__mocks__/token/token.mock';
import { USER_MOCK } from '@/data/__mocks__/users/user.mock';
import * as tokenMapperModule from '../../token/token.mapper';
import * as userMapperModule from '../../user/user.mapper';
import { mapAuthResponseToModel } from '../auth-response.mapper';

describe('mapAuthResponseToModel', () => {
  beforeEach(() => {
    vi.spyOn(userMapperModule, 'mapUserResponseToModel').mockReturnValue(USER_MOCK);
    vi.spyOn(tokenMapperModule, 'mapTokenToModel').mockReturnValue(TOKEN_MOCK);
  });

  it('should map AuthResponseDto to AuthResponse', () => {
    const authResponse = mapAuthResponseToModel(AUTH_RESPONSE_DTO_MOCK);

    expect(authResponse).toEqual(AUTH_RESPONSE_MOCK);
  });
});
