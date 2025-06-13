import { useState } from 'react';

type NotificationType = 'all' | 'info' | 'success' | 'warning' | 'error';

/**
 * Hook for managing notifications UI state
 */
export const useNotificationsUI = () => {
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

  return {
    // State
    typeFilter,
    showOnlyUnread,
    selectedNotificationIds,
    showDeleteConfirm,
    showSettingsModal,

    // Actions
    setTypeFilter,
    setShowOnlyUnread,
    setSelectedNotificationIds,
    toggleNotificationSelection,
    setShowDeleteConfirm,
    setShowSettingsModal,
    clearFilters,
    clearSelections,
  };
}; 