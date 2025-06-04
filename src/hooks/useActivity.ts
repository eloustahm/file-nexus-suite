
import { useActivityQuery } from '@/hooks/queries/useActivityQuery';
import { useActivityUIStore } from '@/store/useActivityUIStore';
import { useMemo } from 'react';

/**
 * Combined hook that provides both UI state and server data for activity logs
 */
export const useActivity = () => {
  const activityUI = useActivityUIStore();
  
  // Build filters for React Query based on UI state
  const filters = useMemo(() => ({
    type: activityUI.typeFilter !== 'all' ? activityUI.typeFilter : undefined,
    userId: activityUI.userFilter || undefined,
    startDate: activityUI.dateRange.startDate || undefined,
    endDate: activityUI.dateRange.endDate || undefined,
    limit: activityUI.itemsPerPage,
    offset: (activityUI.currentPage - 1) * activityUI.itemsPerPage,
  }), [activityUI]);

  const activityQuery = useActivityQuery(filters);

  return {
    // Server data
    logs: activityQuery.logs,
    
    // Server state
    isLoading: activityQuery.isLoading,
    error: activityQuery.error?.message,
    
    // Activity actions
    logActivity: activityQuery.logActivity,
    refetch: activityQuery.refetch,
    getDocumentActivity: activityQuery.getDocumentActivity,
    getUserActivity: activityQuery.getUserActivity,
    
    // Mutation states
    isLogging: activityQuery.isLogging,
    
    // UI state
    typeFilter: activityUI.typeFilter,
    userFilter: activityUI.userFilter,
    dateRange: activityUI.dateRange,
    currentPage: activityUI.currentPage,
    itemsPerPage: activityUI.itemsPerPage,
    
    // UI actions
    setTypeFilter: activityUI.setTypeFilter,
    setUserFilter: activityUI.setUserFilter,
    setDateRange: activityUI.setDateRange,
    setCurrentPage: activityUI.setCurrentPage,
    setItemsPerPage: activityUI.setItemsPerPage,
    clearFilters: activityUI.clearFilters,
  };
};
