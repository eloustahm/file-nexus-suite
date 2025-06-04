
import { mockApiService } from '@/lib/mockApi';

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
 * Mock Authentication API service for development
 */
export const mockAuthApi = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    return mockApiService.login(credentials);
  },
  
  // Register new user
  register: async (data: RegisterData) => {
    return mockApiService.register(data);
  },
  
  // Logout user
  logout: async () => {
    return mockApiService.logout();
  },
  
  // Get current user
  getCurrentUser: async (): Promise<User> => {
    return mockApiService.getCurrentUser();
  },
  
  // Reset password
  resetPassword: async (email: string) => {
    return mockApiService.resetPassword(email);
  },
  
  // Get CSRF token
  csrf: async () => {
    return mockApiService.csrf();
  }
};
