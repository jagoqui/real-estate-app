import {AUTH_RESPONSE_MOCK} from '@/data/mocks/authResponse/authResponse.mock';
import {AUTH_RESPONSE_DTO_MOCK} from '@/data/mocks/authResponse/authResponseDto.mock';
import {TOKEN_MOCK} from '@/data/mocks/token/token.mock';
import {USER_MOCK} from '@/data/mocks/users/user.mock';
import * as tokenAdapterModule from '../../token/token.adapter';
import * as userAdapterModule from '../../user/user.adapter';
import {authResponseAdapter} from '../auth-response.adapter';

describe('authResponseAdapter', () => {
  beforeEach(() => {
    vi.spyOn(userAdapterModule, 'userAdapter').mockReturnValue(USER_MOCK);
    vi.spyOn(tokenAdapterModule, 'tokenAdapter').mockReturnValue(TOKEN_MOCK);
  });

  it('should adapt AuthResponseDto to AuthResponse', () => {
    const authResponse = authResponseAdapter(AUTH_RESPONSE_DTO_MOCK);

    expect(authResponse).toEqual(AUTH_RESPONSE_MOCK);
  });
});
