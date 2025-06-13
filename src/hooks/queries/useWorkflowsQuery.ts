
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsService } from '@/services/workflows';
import type { Workflow } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useWorkflowsQuery = () => {
  const queryClient = useQueryClient();

  // Get all workflows query
  const workflowsQuery = useQuery({
    queryKey: [QUERY_KEYS.WORKFLOWS],
    queryFn: workflowsService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get single workflow query
  const getWorkflow = (id: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.WORKFLOWS, id],
      queryFn: () => workflowsService.getById(id),
      enabled: !!id,
    });
  };

  // Create workflow mutation
  const createWorkflowMutation = useMutation({
    mutationFn: (data: Partial<Workflow>) => workflowsService.create(data),
    onSuccess: (newWorkflow) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      queryClient.setQueryData([QUERY_KEYS.WORKFLOWS, newWorkflow.id], newWorkflow);
      toast.success('Workflow created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create workflow');
    },
  });

  // Update workflow mutation
  const updateWorkflowMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Workflow> }) =>
      workflowsService.update(id, data),
    onSuccess: (updatedWorkflow) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      queryClient.setQueryData([QUERY_KEYS.WORKFLOWS, updatedWorkflow.id], updatedWorkflow);
      toast.success('Workflow updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update workflow');
    },
  });

  // Delete workflow mutation
  const deleteWorkflowMutation = useMutation({
    mutationFn: (id: string) => workflowsService.delete(id),
    onSuccess: (_, workflowId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.WORKFLOWS, workflowId] });
      toast.success('Workflow deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete workflow');
    },
  });

  // Execute workflow mutation
  const executeWorkflowMutation = useMutation({
    mutationFn: ({ id, documentId }: { id: string; documentId: string }) =>
      workflowsService.execute(id, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      toast.success('Workflow executed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to execute workflow');
    },
  });

  // Complete step mutation (placeholder for future implementation)
  const completeStepMutation = useMutation({
    mutationFn: ({ workflowId, stepId }: { workflowId: string; stepId: string }) => {
      // This would be implemented when we have a step completion API
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      toast.success('Step completed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to complete step');
    },
  });

  return {
    // Server data
    workflows: workflowsQuery.data || [],
    
    // Server state
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error,
    
    // Workflow actions
    createWorkflow: createWorkflowMutation.mutate,
    updateWorkflow: updateWorkflowMutation.mutate,
    deleteWorkflow: deleteWorkflowMutation.mutate,
    executeWorkflow: executeWorkflowMutation.mutate,
    completeStep: completeStepMutation.mutate,
    refetch: workflowsQuery.refetch,
    getWorkflow,
    
    // Mutation states
    isCreating: createWorkflowMutation.isPending,
    isUpdating: updateWorkflowMutation.isPending,
    isDeleting: deleteWorkflowMutation.isPending,
    isExecuting: executeWorkflowMutation.isPending,
    isCompletingStep: completeStepMutation.isPending,
  };
};
