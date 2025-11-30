import { TOKEN_MOCK } from '@/data/mocks/token/token.mock';
import { TOKEN_DTO_MOCK } from '@/data/mocks/token/tokenDto.mock';
import { mapTokenToModel } from '../token.mapper';

describe('tokenMapper', () => {
  it('should correctly adapt TokenDto to Token', () => {
    const adaptedToken = mapTokenToModel(TOKEN_DTO_MOCK);

    expect(adaptedToken).toEqual(TOKEN_MOCK);
  });
});
