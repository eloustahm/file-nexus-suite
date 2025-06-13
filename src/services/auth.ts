import { http } from '@/lib/api';
import type { User, LoginCredentials, RegisterData } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    return http.post<{ user: User; token: string }>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    return http.post<{ user: User; token: string }>('/auth/register', data);
  },

  async logout(): Promise<void> {
    await http.post<void>('/auth/logout');
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await http.get<{ user: User }>('/auth/me');
      return response.user;
    } catch (error) {
      return null;
    }
  },

  async resetPassword(email: string): Promise<void> {
    await http.post<void>('/auth/reset-password', { email });
  },

  async updatePassword(token: string, password: string): Promise<void> {
    await http.post<void>('/auth/update-password', { token, password });
  },

  async csrf(): Promise<void> {
    await http.get<void>('/sanctum/csrf-cookie');
  }
};
