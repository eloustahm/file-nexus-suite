
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
    console.log('Login attempt:', credentials.email);
    return http.post('/api/auth/login', credentials);
  },

  // Register new user
  register: async (data: RegisterData) => {
    console.log('Register attempt:', data.email);
    return http.post('/api/auth/register', data);
  },

  // Logout user
  logout: async () => {
    console.log('Logout attempt');
    return http.post('/api/auth/logout');
  },

  // Get current user - simplified error handling
  getCurrentUser: async (): Promise<User | null> => {
    console.log('Checking current user authentication...');
    try {
      const response = await http.get<{ user: User }>('/api/auth/me');
      console.log('Auth check successful:', response.user?.email);
      return response.user;
    } catch (error: any) {
      console.log('Auth check failed:', error.response?.status, error.message);
      // Always return null for any auth error - don't throw
      return null;
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
