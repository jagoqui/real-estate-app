interface AsyncFunctionValidationWrapperCallback<TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: unknown) => void;
}

type AsyncFunctionValidationWrapperParamsNoArgs<TResult> =
  AsyncFunctionValidationWrapperCallback<TResult> & {
    fn: () => Promise<TResult>;
  };

type AsyncFunctionValidationWrapperParamsWithArgs<TArgs, TResult> =
  AsyncFunctionValidationWrapperCallback<TResult> & {
    fn: (args: TArgs) => Promise<TResult>;
    args: TArgs;
  };

export function asyncFunctionValidationWrapper<TResult>(
  params: AsyncFunctionValidationWrapperParamsNoArgs<TResult>
): Promise<TResult>;

export function asyncFunctionValidationWrapper<TArgs, TResult>(
  params: AsyncFunctionValidationWrapperParamsWithArgs<TArgs, TResult>
): Promise<TResult>;

export async function asyncFunctionValidationWrapper<TArgs extends Array<unknown>, TResult>(
  params:
    | AsyncFunctionValidationWrapperParamsNoArgs<TResult>
    | AsyncFunctionValidationWrapperParamsWithArgs<TArgs, TResult>
): Promise<TResult> {
  const {fn, onSuccess, onError} = params;

  try {
    let result: TResult;

    if ('args' in params) {
      result = await params.fn(params.args);
    } else {
      result = await params.fn();
    }

    if (onSuccess) onSuccess(result);
    return result;
  } catch (error) {
    console.error(`Error in async function ${fn.name}:`, error);
    if (onError) onError(error);
    throw error;
  }
}
