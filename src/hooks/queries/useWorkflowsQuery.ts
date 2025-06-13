import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsService } from '@/services/workflows';
import type { Workflow, WorkflowStep } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useWorkflowsQuery = () => {
  const queryClient = useQueryClient();

  // Get all workflows query
  const workflowsQuery = useQuery({
    queryKey: [QUERY_KEYS.WORKFLOWS],
    queryFn: workflowsService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get single workflow query
  const getWorkflow = async (id: string) => {
    const workflow = await workflowsService.getById(id);
    queryClient.setQueryData([QUERY_KEYS.WORKFLOWS, id], workflow);
    return workflow;
  };

  // Create workflow mutation
  const createWorkflowMutation = useMutation({
    mutationFn: workflowsService.create,
    onSuccess: (newWorkflow) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
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
    mutationFn: workflowsService.delete,
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

  // Complete step mutation
  const completeStepMutation = useMutation({
    mutationFn: ({ workflowId, stepId, notes }: { workflowId: string; stepId: string; notes?: string }) => {
      const workflow = queryClient.getQueryData<Workflow>([QUERY_KEYS.WORKFLOWS, workflowId]);
      if (!workflow) {
        throw new Error('Workflow not found');
      }

      const updatedSteps = workflow.steps.map(step => 
        step.id === stepId 
          ? { ...step, completed: true, completedAt: new Date().toISOString(), notes }
          : step
      );

      return workflowsService.update(workflowId, { steps: updatedSteps });
    },
    onSuccess: (updatedWorkflow) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKFLOWS] });
      queryClient.setQueryData([QUERY_KEYS.WORKFLOWS, updatedWorkflow.id], updatedWorkflow);
      toast.success('Step completed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to complete step');
    },
  });

  return {
    // Data
    workflows: workflowsQuery.data || [],
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error,

    // Queries
    getWorkflow,

    // Mutations
    createWorkflow: createWorkflowMutation.mutateAsync,
    updateWorkflow: updateWorkflowMutation.mutateAsync,
    deleteWorkflow: deleteWorkflowMutation.mutateAsync,
    executeWorkflow: executeWorkflowMutation.mutateAsync,
    completeStep: completeStepMutation.mutateAsync,

    // Loading states
    isCreating: createWorkflowMutation.isPending,
    isUpdating: updateWorkflowMutation.isPending,
    isDeleting: deleteWorkflowMutation.isPending,
    isExecuting: executeWorkflowMutation.isPending,
    isCompletingStep: completeStepMutation.isPending,

    // Refetch
    refetch: workflowsQuery.refetch,
  };
};
