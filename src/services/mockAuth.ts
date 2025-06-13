import { mockApiService } from '@/lib/mockApi';
import type { User, LoginCredentials, RegisterData } from '@/types';

export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    return mockApiService.login(credentials);
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    return mockApiService.register(data);
  },

  async logout(): Promise<void> {
    await mockApiService.logout();
  },

  async getCurrentUser(): Promise<User> {
    return mockApiService.getCurrentUser();
  },

  async resetPassword(email: string): Promise<void> {
    await mockApiService.resetPassword(email);
  },

  async csrf(): Promise<void> {
    await mockApiService.csrf();
  }
};
