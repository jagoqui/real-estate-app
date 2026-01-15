export interface TanstackQueryMetaCallbacks {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export type TanstackQueryMeta = TanstackQueryMetaCallbacks & {
  successMessage?: string;
  errorMessage?: string;
};
