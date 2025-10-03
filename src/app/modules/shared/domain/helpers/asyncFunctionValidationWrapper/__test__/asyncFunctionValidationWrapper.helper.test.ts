import { asyncFunctionValidationWrapper } from '../asyncFunctionValidationWrapper.helper';

const MULTIPLIER = 2;
const mockSuccessFn = vi.fn(async (args: number) => Promise.resolve(args * MULTIPLIER));
const mockErrorFn = vi.fn(() => {
  throw new Error('Test error');
});

describe('asyncFunctionValidationWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the success callback on successful execution with args', async () => {
    const onSuccess = vi.fn();
    const args = 5;
    const result = await asyncFunctionValidationWrapper({
      fn: mockSuccessFn,
      args,
      onSuccess,
    });

    const EXPECTED_RESULT = 10;
    expect(result).toBe(EXPECTED_RESULT);
    expect(mockSuccessFn).toHaveBeenCalledWith(args);
    expect(onSuccess).toHaveBeenCalledWith(EXPECTED_RESULT);
  });

  it('should call the error callback on function error with args', async () => {
    const onError = vi.fn();
    const args = 5;
    await expect(
      asyncFunctionValidationWrapper({
        fn: mockErrorFn,
        args,
        onError,
      })
    ).rejects.toThrow('Test error');
    expect(mockErrorFn).toHaveBeenCalledWith(args);
    expect(onError).toHaveBeenCalled();
  });

  it('should call the success callback on successful execution without args', async () => {
    const simpleSuccessFn = vi.fn(async () => Promise.resolve('success'));
    const onSuccess = vi.fn();
    const result = await asyncFunctionValidationWrapper({
      fn: simpleSuccessFn,
      onSuccess,
    });

    expect(result).toBe('success');
    expect(simpleSuccessFn).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith('success');
  });

  it('should call the error callback on function error without args', async () => {
    const simpleErrorFn = vi.fn(() => {
      throw new Error('Simple error');
    });
    const onError = vi.fn();
    await expect(
      asyncFunctionValidationWrapper({
        fn: simpleErrorFn,
        onError,
      })
    ).rejects.toThrow('Simple error');
    expect(simpleErrorFn).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});
