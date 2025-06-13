import { useActivityLogsQuery, useCreateActivityLogMutation, useClearActivityLogsMutation } from '@/hooks/queries/useActivityLogs';
import { useMemo, useState } from 'react';

type ActivityType = 'all' | 'document' | 'team' | 'system' | 'chat';

interface ActivityUIState {
  typeFilter: ActivityType;
  userFilter: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  currentPage: number;
  itemsPerPage: number;
}

/**
 * Combined hook that provides both UI state and server data for activity logs
 */
export const useActivity = () => {
  // UI state
  const [typeFilter, setTypeFilter] = useState<ActivityType>('all');
  const [userFilter, setUserFilter] = useState('');
  const [dateRange, setDateRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Build filters for React Query based on UI state
  const filters = useMemo(() => ({
    type: typeFilter !== 'all' ? typeFilter : undefined,
    userId: userFilter || undefined,
    startDate: dateRange.startDate || undefined,
    endDate: dateRange.endDate || undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  }), [typeFilter, userFilter, dateRange, currentPage, itemsPerPage]);

  // Queries and mutations
  const activityLogsQuery = useActivityLogsQuery(filters);
  const createActivityMutation = useCreateActivityLogMutation();
  const clearActivityMutation = useClearActivityLogsMutation();

  const clearFilters = () => {
    setTypeFilter('all');
    setUserFilter('');
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setCurrentPage(1);
  };

  return {
    // Server data
    logs: activityLogsQuery.data || [],
    
    // Server state
    isLoading: activityLogsQuery.isLoading,
    error: activityLogsQuery.error?.message,
    
    // Activity actions
    logActivity: createActivityMutation.mutate,
    clearLogs: clearActivityMutation.mutate,
    
    // Mutation states
    isLogging: createActivityMutation.isPending,
    isClearing: clearActivityMutation.isPending,
    
    // UI state
    typeFilter,
    userFilter,
    dateRange,
    currentPage,
    itemsPerPage,
    
    // UI actions
    setTypeFilter,
    setUserFilter,
    setDateRange,
    setCurrentPage,
    setItemsPerPage,
    clearFilters,
  };
};
