
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { integrationService } from '@/services/integrationService';
import type { Integration } from '@/types/integration';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useIntegrationsQuery = () => {
  const queryClient = useQueryClient();

  // Get integrations query
  const integrationsQuery = useQuery({
    queryKey: [QUERY_KEYS.INTEGRATIONS],
    queryFn: integrationService.getIntegrations,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    integrations: integrationsQuery.data || [],
    isLoading: integrationsQuery.isLoading,
    error: integrationsQuery.error,
    refetch: integrationsQuery.refetch,
  };
};

export const useUpdateIntegrationMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Integration> }) =>
      integrationService.updateIntegration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTEGRATIONS] });
      toast.success('Integration updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update integration');
    },
  });
};

export const useTestIntegrationMutation = () => {
  return useMutation({
    mutationFn: (id: string) => integrationService.testConnection(id),
    onSuccess: () => {
      toast.success('Integration test successful');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Integration test failed');
    },
  });
};

export const useSyncIntegrationMutation = () => {
  return useMutation({
    mutationFn: (id: string) => integrationService.syncData(id),
    onSuccess: () => {
      toast.success('Integration sync completed');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Integration sync failed');
    },
  });
};
