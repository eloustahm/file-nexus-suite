import { useIntegrationsQuery, useUpdateIntegrationMutation, useTestIntegrationMutation, useSyncIntegrationMutation } from '@/hooks/queries/useIntegrations';
import type { Integration } from '@/types/integration';

/**
 * Combined hook that provides both UI state and server data for integrations
 */
export const useIntegrations = () => {
  // Queries
  const { integrations, isLoading, error } = useIntegrationsQuery();

  // Mutations
  const updateIntegrationMutation = useUpdateIntegrationMutation();
  const testIntegrationMutation = useTestIntegrationMutation();
  const syncIntegrationMutation = useSyncIntegrationMutation();

  // Toggle integration
  const toggleIntegration = (id: string, status: 'active' | 'inactive') => {
    updateIntegrationMutation.mutate({ id, data: { status } });
  };

  // Update API key
  const updateApiKey = (id: string, apiKey: string) => {
    updateIntegrationMutation.mutate({
      id,
      data: {
        config: { apiKey },
        status: 'active'
      }
    });
  };

  return {
    // Data
    integrations,
    
    // Loading states
    isLoading,
    isUpdating: updateIntegrationMutation.isPending,
    isTesting: testIntegrationMutation.isPending,
    isSyncing: syncIntegrationMutation.isPending,
    
    // Errors
    error: error?.message,
    updateError: updateIntegrationMutation.error?.message,
    testError: testIntegrationMutation.error?.message,
    syncError: syncIntegrationMutation.error?.message,
    
    // Actions
    toggleIntegration,
    updateApiKey,
    testConnection: testIntegrationMutation.mutate,
    syncData: syncIntegrationMutation.mutate,
  };
}; 