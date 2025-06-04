
/**
 * Application constants
 */

// React Query Keys
export const QUERY_KEYS = {
  // Auth
  AUTH: 'auth',
  USER: 'user',
  
  // Documents
  DOCUMENTS: 'documents',
  DOCUMENT: 'document',
  
  // Document Generation
  DOCUMENT_GENERATION: 'documentGeneration',
  TEMPLATES: 'templates',
  GENERATED_DOCUMENTS: 'generatedDocuments',
  
  // Chat
  CHAT: 'chat',
  CHAT_SESSIONS: 'chatSessions',
  CHAT_AGENTS: 'chatAgents',
  
  // Team
  TEAM: 'team',
  TEAM_MEMBERS: 'teamMembers',
  TEAM_CHAT_ROOMS: 'teamChatRooms',
  
  // Activity
  ACTIVITY: 'activity',
  ACTIVITY_LOGS: 'activityLogs',
  
  // Notifications
  NOTIFICATIONS: 'notifications',
  NOTIFICATION_SETTINGS: 'notificationSettings',
  
  // Folders
  FOLDERS: 'folders',
  
  // Workflows
  WORKFLOWS: 'workflows',
  
  // Payment
  PAYMENT: 'payment',
  PAYMENT_PLANS: 'paymentPlans',
  PAYMENT_USAGE: 'paymentUsage',
  
  // Settings
  SETTINGS: 'settings',
  PROFILE: 'profile',
  INTEGRATIONS: 'integrations',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  
  // Documents
  DOCUMENTS: '/api/documents',
  DOCUMENT_UPLOAD: '/api/documents/upload',
  
  // Document Generation
  GENERATE_DOCUMENT: '/api/document-generation/generate',
  TEMPLATES: '/api/document-generation/templates',
  
  // Chat
  CHAT_SESSIONS: '/api/chat/sessions',
  CHAT_AGENTS: '/api/chat/agents',
  CHAT_MESSAGES: '/api/chat/messages',
  
  // Team
  TEAM_MEMBERS: '/api/team/members',
  TEAM_INVITE: '/api/team/invite',
  
  // Activity
  ACTIVITY_LOGS: '/api/activity',
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  
  // Settings
  PROFILE: '/api/settings/profile',
  INTEGRATIONS: '/api/settings/integrations',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Document Management System',
  VERSION: '1.0.0',
  API_TIMEOUT: 30000, // 30 seconds
  PAGINATION_SIZE: 20,
} as const;
