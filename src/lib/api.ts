import axios, { AxiosRequestConfig } from 'axios';
import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Axios instance with session & CSRF support
 */
export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Centralized error handler
 */
function handleAxiosError(error: any): never {
    const message =
        error.response?.data?.message || error.message || 'Unexpected error occurred';
    const customError = new Error(message) as Error & { details?: any };
    customError.details = error.response?.data;
    throw customError;
}

/**
 * HTTP methods using Axios
 */
export const http = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.get<T>(url, config);
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
    post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.post<T>(url, data, config);
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
    put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.put<T>(url, data, config);
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
    patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.patch<T>(url, data, config);
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.delete<T>(url, config);
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
    upload: async <T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const res = await axiosInstance.post<T>(url, formData, {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (err) {
            handleAxiosError(err);
        }
    },
};

/**
 * Hook for GET requests
 */
export const useApiQuery = <T = any>(
    key: QueryKey,
    url: string,
    config?: AxiosRequestConfig
) => {
    return useQuery<T>({
        queryKey: key,
        queryFn: () => http.get<T>(url, config),
    });
};

/**
 * Hook for POST/PUT/PATCH/DELETE requests
 */
export const useApiMutation = <T = any, V = any>(
    url: string,
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    config?: AxiosRequestConfig
) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, V>({
        mutationFn: (variables: V) => {
            switch (method) {
                case 'POST':
                    return http.post<T>(url, variables, config);
                case 'PUT':
                    return http.put<T>(url, variables, config);
                case 'PATCH':
                    return http.patch<T>(url, variables, config);
                case 'DELETE':
                    return http.delete<T>(url, config);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
};

/**
 * Hook for file uploads
 */
export const useUploadMutation = <T = any>(
    url: string,
    config?: AxiosRequestConfig
) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, FormData>({
        mutationFn: (formData: FormData) => http.upload<T>(url, formData, config),
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
};
