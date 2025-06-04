
import { create } from 'zustand';

/**
 * Activity UI Store - Manages only UI state for activity logs interface
 */
interface ActivityUIState {
  // Filter UI state
  typeFilter: 'all' | 'document' | 'team' | 'system' | 'chat';
  userFilter: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  
  // Pagination and display
  currentPage: number;
  itemsPerPage: number;
  
  // Actions
  setTypeFilter: (filter: 'all' | 'document' | 'team' | 'system' | 'chat') => void;
  setUserFilter: (filter: string) => void;
  setDateRange: (range: { startDate: string | null; endDate: string | null }) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  clearFilters: () => void;
}

export const useActivityUIStore = create<ActivityUIState>((set) => ({
  typeFilter: 'all',
  userFilter: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
  currentPage: 1,
  itemsPerPage: 20,

  setTypeFilter: (filter) => set({ typeFilter: filter, currentPage: 1 }),
  setUserFilter: (filter) => set({ userFilter: filter, currentPage: 1 }),
  setDateRange: (range) => set({ dateRange: range, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
  clearFilters: () => set({ 
    typeFilter: 'all', 
    userFilter: '', 
    dateRange: { startDate: null, endDate: null },
    currentPage: 1 
  }),
}));
