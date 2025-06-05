
import { http } from '@/lib/api';
import { User } from '@/types';

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

/**
 * Authentication API service
 */
export const authApi = {
  // Login user
  login: async (data: LoginData): Promise<{ user: User; token: string }> => {
    console.log('Logging in user:', data.email);
    return http.post<{ user: User; token: string }>('/api/auth/login', data);
  },

  // Register user
  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    console.log('Registering user:', data.email);
    return http.post<{ user: User; token: string }>('/api/auth/register', data);
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    console.log('Fetching current user');
    return http.get<User>('/api/auth/me');
  },

  // Logout user
  logout: async () => {
    console.log('Logging out user');
    return http.post('/api/auth/logout');
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    console.log('Sending reset password email:', email);
    return http.post('/api/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    console.log('Resetting password with token');
    return http.post('/api/auth/reset-password', { token, password });
  }
};
