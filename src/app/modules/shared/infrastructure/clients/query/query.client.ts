import {QueryClient, type QueryClientConfig} from '@tanstack/react-query'

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      gcTime: 0,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
}

export const queryClient = new QueryClient(QUERY_CLIENT_CONFIG)
