import { authApi } from './api';

// Re-export all auth functions from the centralized API
export const {
  login,
  register,
  logout,
  getCurrentUser,
  resetPassword,
  csrf
} = authApi;

// Keep backward compatibility
export const signUp = authApi.register;
