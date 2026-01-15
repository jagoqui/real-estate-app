import { MutationCache, QueryCache, QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { toast } from 'sonner';
import { ZodError } from 'zod';

const MAX_RETRY_ATTEMPTS = 3;
const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_CLIENT_ERROR_MAX = 500;
const GC_TIME_MS = 0;
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred.';
const DEFAULT_ERROR_DESCRIPTION = 'Please try again later.';

/**
 * Global configuration for the React Query client.
 *
 * Sets default behaviors for queries and mutations, including:
 * - Centralized retry logic with intelligent error handling
 * - Customizable success and error messages via meta properties
 * - Configurable cache garbage collection time
 * - Disables automatic refetch on window focus
 *
 * @remarks
 * Retry logic handles:
 * - Zod validation errors (no retry)
 * - HTTP 4xx client errors (no retry)
 * - Other errors: retries up to {@link MAX_RETRY_ATTEMPTS}
 *
 * Additionally, notifications are shown using Sonner for success and error states,
 * allowing custom messages through the `meta` property on each query or mutation.
 *
 * @see {@link QueryClientConfig} for the configuration type
 * @see {@link MAX_RETRY_ATTEMPTS} for the maximum number of retry attempts
 * @see {@link GC_TIME_MS} for the cache garbage collection time
 */
export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  queryCache: new QueryCache({
    onSuccess: (data, query): void => {
      query.meta?.onSuccess?.(data);

      if (query.meta?.successMessage) {
        toast.success(query.meta.successMessage);
      }
    },
    onError: (error, query): void => {
      query.meta?.onError?.(error);
      const message = query.meta?.errorMessage ?? DEFAULT_ERROR_MESSAGE;
      toast.error(message, {
        duration: Infinity,
        description: error?.message ?? DEFAULT_ERROR_DESCRIPTION,
        closeButton: true,
      });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, _variables, _context, mutation): void => {
      mutation.meta?.onSuccess?.(data);

      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
    },
    onError: (error, _variables, _context, mutation): void => {
      mutation.meta?.onError?.(error);
      const message = mutation.meta?.errorMessage ?? DEFAULT_ERROR_MESSAGE;
      toast.error(message, {
        duration: Infinity,
        description: error?.message ?? DEFAULT_ERROR_DESCRIPTION,
        closeButton: true,
      });
    },
  }),
  defaultOptions: {
    mutations: {
      /**
       * Centralized retry logic for mutations.
       * @param failureCount - Number of times the request has failed
       * @param error - The error that occurred
       * @returns Whether to retry the request
       */
      retry: (failureCount, error) => {
        if (error instanceof ZodError) return false;

        if (error instanceof HTTPError) {
          const status = error.response.status;
          if (status >= HTTP_CLIENT_ERROR_MIN && status < HTTP_CLIENT_ERROR_MAX) return false;
        }

        return failureCount < MAX_RETRY_ATTEMPTS;
      },
    },
    queries: {
      gcTime: GC_TIME_MS,
      refetchOnWindowFocus: false,
    },
  },
};

/**
 * Singleton instance of the React Query client, configured with {@link QUERY_CLIENT_CONFIG}.
 */
export const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);
