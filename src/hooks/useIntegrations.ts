import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_INTEGRATIONS } from '@/constants/integrations';
import type { IntegrationDefinition } from '@/constants/integrations';
import { settingsService } from '@/services/settings';
import type { Integration } from '@/types';
import { toast } from 'sonner';

export const useIntegrations = () => {
  const queryClient = useQueryClient();

  // Get integrations query
  const { data: apiIntegrations = [], isLoading } = useQuery<Integration[]>({
    queryKey: ['integrations'],
    queryFn: settingsService.getIntegrations,
  });

  // Combine default and API integrations
  const integrations = DEFAULT_INTEGRATIONS.map(def => {
    const apiIntegration = apiIntegrations.find(api => api.id === def.id);
    return {
      ...def,
      status: apiIntegration?.status || 'disconnected',
      config: apiIntegration?.config || {},
    };
  });

  // Toggle integration mutation
  const toggleIntegration = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'connected' | 'disconnected' }) => {
      await settingsService.updateIntegration(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success('Integration updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update integration');
    },
  });

  // Update API key mutation
  const updateApiKey = useMutation({
    mutationFn: async ({ id, apiKey }: { id: string; apiKey: string }) => {
      await settingsService.updateIntegration(id, { 
        config: { apiKey },
        status: 'connected'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success('API key updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update API key');
    },
  });

  return {
    integrations,
    isLoading,
    toggleIntegration: toggleIntegration.mutate,
    updateApiKey: updateApiKey.mutate,
    isUpdating: toggleIntegration.isPending || updateApiKey.isPending,
  };
}; 