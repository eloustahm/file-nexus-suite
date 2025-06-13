import { useQueryClient } from '@tanstack/react-query';

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

const ACTIVITY_UI_QUERY_KEY = 'activity-ui';

/**
 * Hook for managing activity UI state
 */
export const useActivityUI = () => {
  const queryClient = useQueryClient();

  // Get current UI state
  const getUIState = (): ActivityUIState => {
    return queryClient.getQueryData([ACTIVITY_UI_QUERY_KEY]) || {
      typeFilter: 'all',
      userFilter: '',
      dateRange: {
        startDate: null,
        endDate: null,
      },
      currentPage: 1,
      itemsPerPage: 20,
    };
  };

  // Update UI state
  const updateUIState = (updates: Partial<ActivityUIState>) => {
    const currentState = getUIState();
    queryClient.setQueryData([ACTIVITY_UI_QUERY_KEY], {
      ...currentState,
      ...updates,
    });
  };

  // Actions
  const setTypeFilter = (type: ActivityType) => {
    updateUIState({ typeFilter: type });
  };

  const setUserFilter = (user: string) => {
    updateUIState({ userFilter: user });
  };

  const setDateRange = (range: { startDate: string | null; endDate: string | null }) => {
    updateUIState({ dateRange: range });
  };

  const setCurrentPage = (page: number) => {
    updateUIState({ currentPage: page });
  };

  const setItemsPerPage = (items: number) => {
    updateUIState({ itemsPerPage: items });
  };

  const clearFilters = () => {
    updateUIState({
      typeFilter: 'all',
      userFilter: '',
      dateRange: {
        startDate: null,
        endDate: null,
      },
      currentPage: 1,
    });
  };

  return {
    // State
    ...getUIState(),

    // Actions
    setTypeFilter,
    setUserFilter,
    setDateRange,
    setCurrentPage,
    setItemsPerPage,
    clearFilters,
  };
}; 