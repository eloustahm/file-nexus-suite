
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/services/notifications';
import { toast } from 'sonner';

export const useNotificationsQuery = () => {
  const queryClient = useQueryClient();

  // Get all notifications query
  const notificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get unread count query
  const unreadCountQuery = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: notificationsApi.getUnreadCount,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Get notification settings query
  const settingsQuery = useQuery({
    queryKey: ['notifications', 'settings'],
    queryFn: notificationsApi.getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => notificationsApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark notification as read');
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
      toast.success('All notifications marked as read');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark all notifications as read');
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) => notificationsApi.delete(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
      toast.success('Notification deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete notification');
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (settings: any) => notificationsApi.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'settings'] });
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
    isLoadingCount: unreadCountQuery.isLoading,
    isLoadingSettings: settingsQuery.isLoading,

    // Errors
    error: notificationsQuery.error,
    countError: unreadCountQuery.error,
    settingsError: settingsQuery.error,

    // Mutations
    markAsRead: markAsReadMutation.mutateAsync,
    markAllAsRead: markAllAsReadMutation.mutateAsync,
    deleteNotification: deleteNotificationMutation.mutateAsync,
    updateSettings: updateSettingsMutation.mutateAsync,

    // Loading states
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,

    // Refetch
    refetch: notificationsQuery.refetch,
    refetchCount: unreadCountQuery.refetch,
    refetchSettings: settingsQuery.refetch,
  };
};
