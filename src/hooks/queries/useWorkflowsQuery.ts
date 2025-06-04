
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsApi } from '@/services/workflows';
import { toast } from 'sonner';

export const useWorkflowsQuery = () => {
  const queryClient = useQueryClient();

  // Get all workflows query
  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: workflowsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create workflow mutation
  const createWorkflowMutation = useMutation({
    mutationFn: (data: any) => workflowsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      toast.success('Workflow created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create workflow');
    },
  });

  // Update workflow mutation
  const updateWorkflowMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      workflowsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      toast.success('Workflow updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update workflow');
    },
  });

  // Delete workflow mutation
  const deleteWorkflowMutation = useMutation({
    mutationFn: (id: string) => workflowsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      toast.success('Workflow deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete workflow');
    },
  });

  // Execute workflow mutation
  const executeWorkflowMutation = useMutation({
    mutationFn: ({ id, documentId }: { id: string; documentId: string }) => 
      workflowsApi.execute(id, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      toast.success('Workflow executed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to execute workflow');
    },
  });

  return {
    workflows: workflowsQuery.data || [],
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error,

    // Mutations
    createWorkflow: createWorkflowMutation.mutateAsync,
    updateWorkflow: updateWorkflowMutation.mutateAsync,
    deleteWorkflow: deleteWorkflowMutation.mutateAsync,
    executeWorkflow: executeWorkflowMutation.mutateAsync,

    // Loading states
    isCreating: createWorkflowMutation.isPending,
    isUpdating: updateWorkflowMutation.isPending,
    isDeleting: deleteWorkflowMutation.isPending,
    isExecuting: executeWorkflowMutation.isPending,

    // Refetch
    refetch: workflowsQuery.refetch,
  };
};
