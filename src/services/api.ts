
import { http } from '@/lib/api';

// Re-export all domain-specific APIs
export { authApi } from './auth';
export { documentsApi } from './documents';
export { documentGenerationApi } from './documentGeneration';
export { chatApi } from './chat';
export { teamApi } from './team';
export { activityApi } from './activity';
export { notificationsApi } from './notifications';
export { foldersApi } from './folders';
export { workflowsApi } from './workflows';
export { paymentApi } from './payment';
export { settingsApi } from './settings';

// Centralized HTTP client for any direct API calls
export { http };
