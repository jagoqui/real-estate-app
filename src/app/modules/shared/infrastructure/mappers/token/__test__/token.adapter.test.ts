import { TOKEN_MOCK } from '@/data/mocks/token/token.mock';
import { TOKEN_DTO_MOCK } from '@/data/mocks/token/tokenDto.mock';
import { tokenAdapter } from '../token.adapter';

describe('tokenAdapter', () => {
  it('should correctly adapt TokenDto to Token', () => {
    const adaptedToken = tokenAdapter(TOKEN_DTO_MOCK);

    expect(adaptedToken).toEqual(TOKEN_MOCK);
  });
});
