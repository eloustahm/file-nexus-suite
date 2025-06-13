
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '@/services/notifications';
import type { Notification } from '@/types';
import type { NotificationSettings } from '@/services/notifications';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useNotificationsQuery = () => {
  const queryClient = useQueryClient();

  // Get notifications query
  const notificationsQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: notificationsService.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get unread count query
  const unreadCountQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unread-count'],
    queryFn: notificationsService.getUnreadCount,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Get notification settings query
  const settingsQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_SETTINGS],
    queryFn: notificationsService.getSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => notificationsService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unread-count'] });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unread-count'] });
      toast.success('All notifications marked as read');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark all notifications as read');
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) => notificationsService.delete(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unread-count'] });
      toast.success('Notification deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete notification');
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (settings: Partial<NotificationSettings>) =>
      notificationsService.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATION_SETTINGS] });
      toast.success('Notification settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update notification settings');
    },
  });

  return {
    // Server data
    notifications: notificationsQuery.data || [],
    unreadCount: unreadCountQuery.data?.count || 0,
    settings: settingsQuery.data,
    
    // Server state
    isLoading: notificationsQuery.isLoading,
    isLoadingUnreadCount: unreadCountQuery.isLoading,
    isLoadingSettings: settingsQuery.isLoading,
    error: notificationsQuery.error,
    unreadCountError: unreadCountQuery.error,
    settingsError: settingsQuery.error,
    
    // Notification actions
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    updateSettings: updateSettingsMutation.mutate,
    refetch: notificationsQuery.refetch,
    refetchUnreadCount: unreadCountQuery.refetch,
    refetchSettings: settingsQuery.refetch,
    
    // Mutation states
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,
  };
};
