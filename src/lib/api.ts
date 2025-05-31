// src/lib/http.ts

import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Custom type that extends RequestInit with optional skipAuth flag
 */
export type FetcherOptions = RequestInit & {
  skipAuth?: boolean; // if true, omits credentials in request
};

/**
 * Intercepts requests before they are sent
 * Useful for logging or dynamically modifying headers
 */
function requestInterceptor(url: string, options: FetcherOptions): [string, FetcherOptions] {
  return [url, options];
}

/**
 * Intercepts and processes the response
 * Handles common error and success response parsing
 */
async function responseInterceptor<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let error: any;
    try {
      error = await response.json(); // Attempt to parse JSON error
    } catch {
      throw new Error(`HTTP error ${response.status}`); // Fallback if JSON parsing fails
    }
    throw new Error(error.message || 'Unknown error');
  }

  if (response.status === 204) return null as T; // No content response
  return response.json();
}

/**
 * Central fetch function used by all methods
 * Applies interceptors and handles credentials/cookies
 */
async function api<T = any>(
    endpoint: string,
    options: FetcherOptions = {}
): Promise<T> {
  const finalUrl = `${API_BASE_URL}${endpoint}`;
  const [url, interceptedOptions] = requestInterceptor(finalUrl, options);

  const response = await fetch(url, {
    credentials: options.skipAuth ? 'same-origin' : 'include', // Include cookies unless skipped
    ...interceptedOptions,
    headers: {
      'Content-Type': 'application/json',
      ...interceptedOptions.headers,
    },
  });

  return responseInterceptor<T>(response);
}

/**
 * Hook for performing GET requests using React Query
 */
export const useApiQuery = <T = any>(
    key: QueryKey,
    endpoint: string,
    options?: FetcherOptions
) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => api<T>(endpoint, { method: 'GET', ...options }),
  });
};

/**
 * Hook for performing mutations (POST, PUT, PATCH, DELETE) using React Query
 */
export const useApiMutation = <T = any, V = any>(
    endpoint: string,
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    options?: FetcherOptions
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, V>({
    mutationFn: (variables: V) =>
        api<T>(endpoint, {
          method,
          body: JSON.stringify(variables),
          ...options,
        }),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidate cache to refetch fresh data
    },
  });
};

/**
 * Hook for uploading files using FormData and React Query
 */
export const useUploadMutation = <T = any>(
    endpoint: string,
    options?: FetcherOptions
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, FormData>({
    mutationFn: (formData: FormData) =>
        api<T>(endpoint, {
          method: 'POST',
          body: formData,
          ...options,
          headers: {
            ...options?.headers,
          },
        }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
