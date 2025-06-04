
import { create } from 'zustand';

/**
 * Notifications UI Store - Manages only UI state for notifications interface
 */
interface NotificationsUIState {
  // Filter and display UI state
  typeFilter: 'all' | 'info' | 'success' | 'warning' | 'error';
  showOnlyUnread: boolean;
  selectedNotificationIds: string[];
  
  // Modal and dialog UI state
  showDeleteConfirm: string | null; // notification ID to delete
  showSettingsModal: boolean;
  
  // Actions
  setTypeFilter: (filter: 'all' | 'info' | 'success' | 'warning' | 'error') => void;
  setShowOnlyUnread: (show: boolean) => void;
  setSelectedNotifications: (ids: string[]) => void;
  toggleNotificationSelection: (id: string) => void;
  setShowDeleteConfirm: (id: string | null) => void;
  setShowSettingsModal: (show: boolean) => void;
  clearFilters: () => void;
  clearSelections: () => void;
}

export const useNotificationsUIStore = create<NotificationsUIState>((set, get) => ({
  typeFilter: 'all',
  showOnlyUnread: false,
  selectedNotificationIds: [],
  showDeleteConfirm: null,
  showSettingsModal: false,

  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setShowOnlyUnread: (show) => set({ showOnlyUnread: show }),
  setSelectedNotifications: (ids) => set({ selectedNotificationIds: ids }),
  toggleNotificationSelection: (id) => {
    const { selectedNotificationIds } = get();
    const isSelected = selectedNotificationIds.includes(id);
    set({
      selectedNotificationIds: isSelected
        ? selectedNotificationIds.filter(notifId => notifId !== id)
        : [...selectedNotificationIds, id]
    });
  },
  setShowDeleteConfirm: (id) => set({ showDeleteConfirm: id }),
  setShowSettingsModal: (show) => set({ showSettingsModal: show }),
  clearFilters: () => set({ 
    typeFilter: 'all', 
    showOnlyUnread: false 
  }),
  clearSelections: () => set({ selectedNotificationIds: [] }),
}));
