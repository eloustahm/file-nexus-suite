
import { useWorkflowsQuery } from '@/hooks/queries/useWorkflowsQuery';

/**
 * Combined hook that provides server data for workflows
 */
export const useWorkflows = () => {
  const workflowsQuery = useWorkflowsQuery();

  return {
    // Server data
    workflows: workflowsQuery.workflows,
    
    // Server state
    isLoading: workflowsQuery.isLoading,
    error: workflowsQuery.error?.message,
    
    // Workflow actions
    createWorkflow: workflowsQuery.createWorkflow,
    updateWorkflow: workflowsQuery.updateWorkflow,
    deleteWorkflow: workflowsQuery.deleteWorkflow,
    executeWorkflow: workflowsQuery.executeWorkflow,
    refetch: workflowsQuery.refetch,
    
    // Mutation states
    isCreating: workflowsQuery.isCreating,
    isUpdating: workflowsQuery.isUpdating,
    isDeleting: workflowsQuery.isDeleting,
    isExecuting: workflowsQuery.isExecuting,
  };
};
