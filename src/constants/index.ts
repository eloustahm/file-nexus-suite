
/**
 * Application Constants
 * Centralized location for all constants used throughout the application
 */

// Query Keys for React Query
export const QUERY_KEYS = {
  auth: ['auth'] as const,
  user: ['auth', 'user'] as const,
  documents: ['documents'] as const,
  folders: ['folders'] as const,
  chat: ['chat'] as const,
  chatSessions: ['chat', 'sessions'] as const,
  team: ['team'] as const,
  teamMembers: ['team', 'members'] as const,
  notifications: ['notifications'] as const,
  activity: ['activity'] as const,
  workflows: ['workflows'] as const,
  payment: ['payment'] as const,
  settings: ['settings'] as const,
  integrations: ['settings', 'integrations'] as const,
  documentGeneration: ['documentGeneration'] as const,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    resetPassword: '/api/auth/reset-password',
    csrf: '/sanctum/csrf-cookie',
  },
  documents: {
    base: '/api/documents',
    upload: '/api/documents/upload',
    share: (id: string) => `/api/documents/${id}/share`,
    download: (id: string) => `/api/documents/${id}/download`,
    versions: (id: string) => `/api/documents/${id}/versions`,
  },
  folders: {
    base: '/api/folders',
    documents: (id: string) => `/api/folders/${id}/documents`,
  },
  chat: {
    sessions: '/api/chat/sessions',
    messages: '/api/chat/messages',
    agents: '/api/chat/agents',
  },
  team: {
    members: '/api/team/members',
    invite: '/api/team/invite',
    chatRooms: '/api/team/chat/rooms',
  },
  notifications: {
    base: '/api/notifications',
    unreadCount: '/api/notifications/unread-count',
    markAllRead: '/api/notifications/mark-all-read',
    settings: '/api/notifications/settings',
  },
  activity: {
    base: '/api/activity',
    documents: (id: string) => `/api/activity/documents/${id}`,
    users: (id: string) => `/api/activity/users/${id}`,
  },
  workflows: {
    base: '/api/workflows',
    execute: (id: string) => `/api/workflows/${id}/execute`,
  },
  payment: {
    plans: '/api/payment/plans',
    subscribe: '/api/payment/subscribe',
    cancel: '/api/payment/cancel',
    usage: '/api/payment/usage',
  },
  settings: {
    profile: '/api/settings/profile',
    password: '/api/settings/password',
    integrations: '/api/settings/integrations',
  },
} as const;

// Cache Times (in milliseconds)
export const CACHE_TIMES = {
  short: 2 * 60 * 1000, // 2 minutes
  medium: 5 * 60 * 1000, // 5 minutes
  long: 15 * 60 * 1000, // 15 minutes
  user: 10 * 60 * 1000, // 10 minutes for user data
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  authAttempted: 'auth_attempted',
  theme: 'app_theme',
  sidebarCollapsed: 'sidebar_collapsed',
} as const;
