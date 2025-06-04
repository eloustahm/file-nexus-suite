
import { create } from 'zustand';
import { activityApi, ActivityLog, ActivityFilters } from '@/services/activity';

interface ActivityState {
  logs: ActivityLog[];
  loading: boolean;
  error: string | null;
  filters: ActivityFilters;
  
  // Actions
  fetchLogs: (filters?: ActivityFilters) => Promise<void>;
  getDocumentActivity: (documentId: string) => Promise<void>;
  getUserActivity: (userId: string) => Promise<void>;
  logActivity: (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => Promise<void>;
  setFilters: (filters: ActivityFilters) => void;
  clearError: () => void;

  // Computed state
  filteredLogs: ActivityLog[];
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  logs: [],
  loading: false,
  error: null,
  filters: {},

  fetchLogs: async (filters?: ActivityFilters) => {
    try {
      set({ loading: true, error: null });
      const logs = await activityApi.getLogs(filters);
      set({ logs });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getDocumentActivity: async (documentId: string) => {
    try {
      set({ loading: true, error: null });
      const logs = await activityApi.getDocumentActivity(documentId);
      set({ logs });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getUserActivity: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const logs = await activityApi.getUserActivity(userId);
      set({ logs });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  logActivity: async (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => {
    try {
      await activityApi.logActivity(data);
      // Refresh logs to include the new activity
      await get().fetchLogs(get().filters);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setFilters: (filters: ActivityFilters) => {
    set({ filters });
    get().fetchLogs(filters);
  },

  clearError: () => set({ error: null }),

  get filteredLogs() {
    const state = get();
    let filtered = [...state.logs];

    if (state.filters.type) {
      filtered = filtered.filter(log => log.type === state.filters.type);
    }

    if (state.filters.userId) {
      filtered = filtered.filter(log => log.userId === state.filters.userId);
    }

    if (state.filters.startDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= new Date(state.filters.startDate!)
      );
    }

    if (state.filters.endDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) <= new Date(state.filters.endDate!)
      );
    }

    return filtered;
  }
}));
