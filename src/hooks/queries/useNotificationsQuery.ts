import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '@/services/notifications';
import type { Notification, NotificationSettings } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useNotificationsQuery = () => {
  const queryClient = useQueryClient();

  // Get all notifications query
  const notificationsQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: notificationsService.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get unread count query
  const unreadCountQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unreadCount'],
    queryFn: notificationsService.getUnreadCount,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Get notification settings query
  const settingsQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS, 'settings'],
    queryFn: notificationsService.getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: (_, notificationId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unreadCount'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark notification as read');
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unreadCount'] });
      toast.success('All notifications marked as read');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark all notifications as read');
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: notificationsService.delete,
    onSuccess: (_, notificationId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unreadCount'] });
      toast.success('Notification deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete notification');
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: notificationsService.updateSettings,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS, 'settings'], updatedSettings);
      toast.success('Notification settings updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update notification settings');
    },
  });

  return {
    // Data
    notifications: notificationsQuery.data || [],
    unreadCount: unreadCountQuery.data?.count || 0,
    settings: settingsQuery.data,

    // Loading states
    isLoading: notificationsQuery.isLoading,
    isLoadingUnreadCount: unreadCountQuery.isLoading,
    isLoadingSettings: settingsQuery.isLoading,

    // Errors
    error: notificationsQuery.error,
    unreadCountError: unreadCountQuery.error,
    settingsError: settingsQuery.error,

    // Mutations
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    updateSettings: updateSettingsMutation.mutate,

    // Loading states
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,

    // Refetch
    refetch: notificationsQuery.refetch,
    refetchUnreadCount: unreadCountQuery.refetch,
    refetchSettings: settingsQuery.refetch,
  };
};
