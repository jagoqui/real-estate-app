import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (data: unknown) => void;
      onError?: (error: Error) => void;
    };
    mutationMeta: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (data: unknown) => void;
      onError?: (error: Error) => void;
    };
  }
}
