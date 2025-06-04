
import { http } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Authentication API service
 */
export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    console.log(credentials)
    return http.post('/api/auth/login', credentials);
  },

  // Register new user
  register: async (data: RegisterData) => {
    return http.post('/api/auth/register', data);
  },

  // Logout user
  logout: async () => {
    return http.post('/api/auth/logout');
  },

  // Get current user - handles 401/403 gracefully
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await http.get<{ user: User }>('/api/auth/me');
      return response.user;
    } catch (error: any) {
      // If the error is 401 or 403, user is not authenticated
      if (error.response?.status === 401 || error.response?.status === 403) {
        return null;
      }
      // Re-throw other errors
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    return http.post('/api/auth/reset-password', { email });
  },

  // Get CSRF token
  csrf: async () => {
    return http.get('/sanctum/csrf-cookie');
  }
};
