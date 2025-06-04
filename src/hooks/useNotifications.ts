
import { useNotificationsQuery } from '@/hooks/queries/useNotificationsQuery';
import { useNotificationsUIStore } from '@/store/useNotificationsUIStore';
import { useMemo } from 'react';

/**
 * Combined hook that provides both UI state and server data for notifications
 */
export const useNotifications = () => {
  const notificationsQuery = useNotificationsQuery();
  const notificationsUI = useNotificationsUIStore();

  // Apply client-side filtering based on UI state
  const filteredNotifications = useMemo(() => {
    let filtered = notificationsQuery.notifications;

    // Apply type filter
    if (notificationsUI.typeFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === notificationsUI.typeFilter);
    }

    // Apply unread filter
    if (notificationsUI.showOnlyUnread) {
      filtered = filtered.filter(notification => !notification.isRead);
    }

    return filtered;
  }, [notificationsQuery.notifications, notificationsUI.typeFilter, notificationsUI.showOnlyUnread]);

  return {
    // Server data with client-side filtering
    notifications: notificationsQuery.notifications,
    filteredNotifications,
    unreadCount: notificationsQuery.unreadCount,
    settings: notificationsQuery.settings,
    
    // Server state
    isLoading: notificationsQuery.isLoading,
    isLoadingCount: notificationsQuery.isLoadingCount,
    isLoadingSettings: notificationsQuery.isLoadingSettings,
    error: notificationsQuery.error?.message,
    countError: notificationsQuery.countError?.message,
    settingsError: notificationsQuery.settingsError?.message,
    
    // Notification actions
    markAsRead: notificationsQuery.markAsRead,
    markAllAsRead: notificationsQuery.markAllAsRead,
    deleteNotification: notificationsQuery.deleteNotification,
    updateSettings: notificationsQuery.updateSettings,
    refetch: notificationsQuery.refetch,
    refetchCount: notificationsQuery.refetchCount,
    refetchSettings: notificationsQuery.refetchSettings,
    
    // Mutation states
    isMarkingAsRead: notificationsQuery.isMarkingAsRead,
    isMarkingAllAsRead: notificationsQuery.isMarkingAllAsRead,
    isDeleting: notificationsQuery.isDeleting,
    isUpdatingSettings: notificationsQuery.isUpdatingSettings,
    
    // UI state
    typeFilter: notificationsUI.typeFilter,
    showOnlyUnread: notificationsUI.showOnlyUnread,
    selectedNotificationIds: notificationsUI.selectedNotificationIds,
    showDeleteConfirm: notificationsUI.showDeleteConfirm,
    showSettingsModal: notificationsUI.showSettingsModal,
    
    // UI actions
    setTypeFilter: notificationsUI.setTypeFilter,
    setShowOnlyUnread: notificationsUI.setShowOnlyUnread,
    setSelectedNotifications: notificationsUI.setSelectedNotifications,
    toggleNotificationSelection: notificationsUI.toggleNotificationSelection,
    setShowDeleteConfirm: notificationsUI.setShowDeleteConfirm,
    setShowSettingsModal: notificationsUI.setShowSettingsModal,
    clearFilters: notificationsUI.clearFilters,
    clearSelections: notificationsUI.clearSelections,
  };
};
