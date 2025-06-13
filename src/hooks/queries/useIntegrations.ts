import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { integrationService } from '@/services/integrationService';
import type { Integration } from '@/types/integration';

// Query keys
export const integrationKeys = {
  all: ['integrations'] as const,
  lists: () => [...integrationKeys.all, 'list'] as const,
  list: (filters: string) => [...integrationKeys.lists(), { filters }] as const,
  details: () => [...integrationKeys.all, 'detail'] as const,
  detail: (id: string) => [...integrationKeys.details(), id] as const,
};

// Query hooks
export const useIntegrationsQuery = () => {
  return useQuery({
    queryKey: integrationKeys.lists(),
    queryFn: () => integrationService.getIntegrations(),
  });
};

export const useIntegrationQuery = (id: string) => {
  return useQuery({
    queryKey: integrationKeys.detail(id),
    queryFn: () => integrationService.getIntegration(id),
    enabled: !!id,
  });
};

// Mutation hooks
export const useCreateIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Integration>) => integrationService.createIntegration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.lists() });
      toast.success('Integration created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create integration');
      console.error('Create integration error:', error);
    },
  });
};

export const useUpdateIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Integration> }) =>
      integrationService.updateIntegration(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: integrationKeys.lists() });
      toast.success('Integration updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update integration');
      console.error('Update integration error:', error);
    },
  });
};

export const useDeleteIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => integrationService.deleteIntegration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.lists() });
      toast.success('Integration deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete integration');
      console.error('Delete integration error:', error);
    },
  });
};

export const useTestIntegrationMutation = () => {
  return useMutation({
    mutationFn: (id: string) => integrationService.testConnection(id),
    onSuccess: () => {
      toast.success('Connection test successful');
    },
    onError: (error) => {
      toast.error('Connection test failed');
      console.error('Test connection error:', error);
    },
  });
};

export const useSyncIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => integrationService.syncData(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.detail(id) });
      toast.success('Data sync completed successfully');
    },
    onError: (error) => {
      toast.error('Data sync failed');
      console.error('Sync data error:', error);
    },
  });
}; 