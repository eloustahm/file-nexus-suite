
// Legacy API service - deprecated, use specific service files instead
import { authApi } from './auth';
import { documentsApi } from './documents';
import { foldersApi } from './folders';
import { teamApi } from './team';
import { notificationsApi } from './notifications';
import { paymentApi } from './payment';
import { workflowsApi } from './workflows';

// Re-export individual APIs for backwards compatibility
export {
  authApi,
  documentsApi,
  foldersApi,
  teamApi,
  notificationsApi,
  paymentApi,
  workflowsApi,
};
