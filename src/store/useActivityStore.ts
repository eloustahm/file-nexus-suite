
import { create } from 'zustand';
import { activityApi } from '@/services/api';

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  type: 'document' | 'team' | 'system' | 'chat';
  metadata?: any;
}

interface ActivityState {
  logs: ActivityLog[];
  loading: boolean;
  error: string | null;
  fetchLogs: (filters?: any) => Promise<void>;
  getDocumentActivity: (documentId: string) => Promise<void>;
  clearError: () => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  logs: [],
  loading: false,
  error: null,

  fetchLogs: async (filters?: any) => {
    try {
      set({ loading: true, error: null });
      const logs = await activityApi.getLogs(filters) as ActivityLog[];
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
      const logs = await activityApi.getDocumentActivity(documentId) as ActivityLog[];
      set({ logs });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
