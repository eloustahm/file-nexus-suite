import { useNotificationsQuery } from '@/hooks/queries/useNotificationsQuery';
import { useMemo, useState } from 'react';

type NotificationType = 'all' | 'info' | 'success' | 'warning' | 'error';

/**
 * Combined hook that provides both UI state and server data for notifications
 */
export const useNotifications = () => {
  const notificationsQuery = useNotificationsQuery();

  // Filter and display UI state
  const [typeFilter, setTypeFilter] = useState<NotificationType>('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [selectedNotificationIds, setSelectedNotificationIds] = useState<string[]>([]);
  
  // Modal and dialog UI state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const toggleNotificationSelection = (id: string) => {
    setSelectedNotificationIds(prev => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id];
    });
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setShowOnlyUnread(false);
  };

  const clearSelections = () => {
    setSelectedNotificationIds([]);
  };

  // Apply client-side filtering based on UI state
  const filteredNotifications = useMemo(() => {
    let filtered = notificationsQuery.notifications;

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === typeFilter);
    }

    // Apply unread filter
    if (showOnlyUnread) {
      filtered = filtered.filter(notification => !notification.isRead);
    }

    return filtered;
  }, [notificationsQuery.notifications, typeFilter, showOnlyUnread]);

  return {
    // Server data with client-side filtering
    notifications: notificationsQuery.notifications,
    filteredNotifications,
    unreadCount: notificationsQuery.unreadCount,
    settings: notificationsQuery.settings,
    
    // Server state
    isLoading: notificationsQuery.isLoading,
    isLoadingCount: notificationsQuery.isLoadingUnreadCount,
    isLoadingSettings: notificationsQuery.isLoadingSettings,
    error: notificationsQuery.error?.message,
    countError: notificationsQuery.unreadCountError?.message,
    settingsError: notificationsQuery.settingsError?.message,
    
    // Notification actions
    markAsRead: notificationsQuery.markAsRead,
    markAllAsRead: notificationsQuery.markAllAsRead,
    deleteNotification: notificationsQuery.deleteNotification,
    updateSettings: notificationsQuery.updateSettings,
    refetch: notificationsQuery.refetch,
    refetchCount: notificationsQuery.refetchUnreadCount,
    refetchSettings: notificationsQuery.refetchSettings,
    
    // Mutation states
    isMarkingAsRead: notificationsQuery.isMarkingAsRead,
    isMarkingAllAsRead: notificationsQuery.isMarkingAllAsRead,
    isDeleting: notificationsQuery.isDeleting,
    isUpdatingSettings: notificationsQuery.isUpdatingSettings,
    
    // UI state
    typeFilter,
    showOnlyUnread,
    selectedNotificationIds,
    showDeleteConfirm,
    showSettingsModal,
    
    // UI actions
    setTypeFilter,
    setShowOnlyUnread,
    setSelectedNotifications: setSelectedNotificationIds,
    toggleNotificationSelection,
    setShowDeleteConfirm,
    setShowSettingsModal,
    clearFilters,
    clearSelections,
  };
};
