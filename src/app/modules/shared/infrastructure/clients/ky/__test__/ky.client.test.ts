import ky from 'ky';

vi.mock('ky', () => {
  const create = vi.fn();
  return {
    __esModule: true,
    default: {create},
    create,
  };
});

const setup = async (): Promise<unknown> => await import('../ky.client');

describe('API Configuration', () => {
  it('should call ky.create with the correct configuration', async () => {
    await setup();

    expect(ky.create).toHaveBeenNthCalledWith(1, {
      timeout: false,
    });
  });
});
