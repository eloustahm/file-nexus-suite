// src/lib/http.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Type-safe fetch options with support for skipping auth and adding interceptors.
 */
export type FetcherOptions = RequestInit & {
  skipAuth?: boolean;
};

// Optional pre-request interceptor
function requestInterceptor(url: string, options: FetcherOptions): [string, FetcherOptions] {
  // You could log, add custom headers, tokens, etc. here
  return [url, options];
}

// Optional response interceptor
async function responseInterceptor<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let error: any;
    try {
      error = await response.json();
    } catch {
      throw new Error(`HTTP error ${response.status}`);
    }
    throw new Error(error.message || 'Unknown error');
  }

  if (response.status === 204) return null as T;
  return response.json();
}

/**
 * Unified fetch handler
 */
export async function api<T = any>(
    endpoint: string,
    options: FetcherOptions = {}
): Promise<T> {
  const finalUrl = `${API_BASE_URL}${endpoint}`;
  const [url, interceptedOptions] = requestInterceptor(finalUrl, options);

  const response = await fetch(url, {
    credentials: options.skipAuth ? 'same-origin' : 'include',
    ...interceptedOptions,
    headers: {
      'Content-Type': 'application/json',
      ...interceptedOptions.headers,
    },
  });

  return responseInterceptor<T>(response);
}

// Convenience helpers
export const http = {
  get: <T>(url: string, options?: FetcherOptions) =>
      api<T>(url, { method: 'GET', ...options }),

  post: <T>(url: string, data?: any, options?: FetcherOptions) =>
      api<T>(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      }),

  put: <T>(url: string, data?: any, options?: FetcherOptions) =>
      api<T>(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
      }),

  patch: <T>(url: string, data?: any, options?: FetcherOptions) =>
      api<T>(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        ...options,
      }),

  delete: <T>(url: string, options?: FetcherOptions) =>
      api<T>(url, { method: 'DELETE', ...options }),

  upload: <T>(url: string, formData: FormData, options?: FetcherOptions) =>
      api<T>(url, {
        method: 'POST',
        body: formData,
        ...options,
        headers: {
          ...options?.headers,
        },
      }),
};
