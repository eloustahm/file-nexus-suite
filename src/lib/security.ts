
import CryptoJS from 'crypto-js';

// Constants
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key-should-be-changed';
const TOKEN_STORAGE_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token management
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
};

// Encryption utilities
export const encryption = {
  encrypt: (text: string): string => {
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  },

  decrypt: (cipherText: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};

// Password utilities
export const passwordUtils = {
  generateRandomPassword: (length: number = 12): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  },

  checkPasswordStrength: (password: string): { score: number; feedback: string[] } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Include numbers');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Include special characters');

    return { score, feedback };
  }
};

// Session management
export const sessionManager = {
  startSession: (user: any): void => {
    const sessionData = {
      user,
      startTime: Date.now(),
      lastActivity: Date.now()
    };
    sessionStorage.setItem('user_session', JSON.stringify(sessionData));
  },

  updateActivity: (): void => {
    const session = sessionManager.getSession();
    if (session) {
      session.lastActivity = Date.now();
      sessionStorage.setItem('user_session', JSON.stringify(session));
    }
  },

  getSession: (): any | null => {
    const sessionData = sessionStorage.getItem('user_session');
    return sessionData ? JSON.parse(sessionData) : null;
  },

  clearSession: (): void => {
    sessionStorage.removeItem('user_session');
  },

  isSessionExpired: (maxIdleTime: number = 30 * 60 * 1000): boolean => {
    const session = sessionManager.getSession();
    if (!session) return true;
    return Date.now() - session.lastActivity > maxIdleTime;
  }
};

// Input sanitization
export const sanitizer = {
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  },

  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
      .replace(/\.{2,}/g, '.') // Replace multiple dots
      .substring(0, 255); // Limit length
  }
};

// Rate limiting (client-side)
export const rateLimiter = {
  attempts: new Map<string, { count: number; lastAttempt: number }>(),

  canAttempt: (key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
    const now = Date.now();
    const record = rateLimiter.attempts.get(key);

    if (!record || now - record.lastAttempt > windowMs) {
      rateLimiter.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    if (record.count >= maxAttempts) {
      return false;
    }

    record.count++;
    record.lastAttempt = now;
    return true;
  },

  reset: (key: string): void => {
    rateLimiter.attempts.delete(key);
  }
};

export default {
  tokenManager,
  encryption,
  passwordUtils,
  sessionManager,
  sanitizer,
  rateLimiter
};
