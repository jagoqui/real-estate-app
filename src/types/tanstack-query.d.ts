import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      onSuccess?: (data: unknown) => void;
      onError?: (error: Error) => void;
      successMessage?: string;
      errorMessage?: string;
    };
    mutationMeta: {
      onSuccess?: (data: unknown) => void;
      onError?: (error: Error) => void;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}
