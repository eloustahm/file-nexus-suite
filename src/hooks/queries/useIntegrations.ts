
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { integrationService } from '@/services/integration';
import { toast } from 'sonner';
import type { Integration } from '@/types';

export const useIntegrationsQuery = () => {
  const queryClient = useQueryClient();

  const { data: integrations, isLoading, error, refetch } = useQuery({
    queryKey: ['integrations'],
    queryFn: integrationService.getIntegrations,
  });

  const updateIntegrationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Integration> }) =>
      integrationService.updateIntegration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success('Integration updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update integration');
    },
  });

  const testIntegrationMutation = useMutation({
    mutationFn: (id: string) => integrationService.testIntegration(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Integration test successful');
      } else {
        toast.error(result.message || 'Integration test failed');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Integration test failed');
    },
  });

  const useCreateIntegrationMutation = () => {
    return useMutation({
      mutationFn: (data: Omit<Integration, 'id'>) => integrationService.createIntegration(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['integrations'] });
        toast.success('Integration created successfully');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to create integration');
      },
    });
  };

  const useDeleteIntegrationMutation = () => {
    return useMutation({
      mutationFn: (id: string) => integrationService.deleteIntegration(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['integrations'] });
        toast.success('Integration deleted successfully');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to delete integration');
      },
    });
  };

  return {
    integrations: integrations || [],
    isLoading,
    error,
    refetch,
    updateIntegrationMutation,
    testIntegrationMutation,
    useCreateIntegrationMutation,
    useDeleteIntegrationMutation,
  };
};

export { useCreateIntegrationMutation, useDeleteIntegrationMutation } from './useIntegrations';
