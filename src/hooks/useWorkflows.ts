import { useWorkflowsQuery } from '@/hooks/queries/useWorkflowsQuery';
import { useState } from 'react';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'status' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

/**
 * Combined hook that provides server data and UI state for workflows
 */
export const useWorkflows = () => {
  const workflowsQuery = useWorkflowsQuery();

  // Search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkflowIds, setSelectedWorkflowIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  
  // Modal and dialog UI state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showExecuteModal, setShowExecuteModal] = useState<string | null>(null);
  const [showCompleteStepModal, setShowCompleteStepModal] = useState<{ workflowId: string; stepId: string } | null>(null);

  const toggleWorkflowSelection = (id: string) => {
    setSelectedWorkflowIds(prev => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter(workflowId => workflowId !== id)
        : [...prev, id];
    });
  };

  const setSorting = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus([]);
    setSelectedWorkflowIds([]);
  };

  const resetModals = () => {
    setShowCreateModal(false);
    setShowDeleteConfirm(null);
    setShowExecuteModal(null);
    setShowCompleteStepModal(null);
  };

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
    completeStep: workflowsQuery.completeStep,
    refetch: workflowsQuery.refetch,
    
    // Mutation states
    isCreating: workflowsQuery.isCreating,
    isUpdating: workflowsQuery.isUpdating,
    isDeleting: workflowsQuery.isDeleting,
    isExecuting: workflowsQuery.isExecuting,
    isCompletingStep: workflowsQuery.isCompletingStep,

    // UI state
    searchQuery,
    selectedWorkflowIds,
    viewMode,
    sortBy,
    sortOrder,
    filterStatus,
    showCreateModal,
    showDeleteConfirm,
    showExecuteModal,
    showCompleteStepModal,

    // UI actions
    setSearchQuery,
    setSelectedWorkflowIds,
    toggleWorkflowSelection,
    setViewMode,
    setSorting,
    setFilterStatus,
    setShowCreateModal,
    setShowDeleteConfirm,
    setShowExecuteModal,
    setShowCompleteStepModal,
    clearFilters,
    resetModals,
  };
};
