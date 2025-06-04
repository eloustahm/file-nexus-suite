
import { http } from '@/lib/api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  documentUpdates: boolean;
  teamInvites: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
}

/**
 * Notifications API service
 */
export const notificationsApi = {
  // Get all notifications
  getAll: async (): Promise<Notification[]> => {
    return http.get<Notification[]>('/api/notifications');
  },

  // Get unread notifications count
  getUnreadCount: async (): Promise<{ count: number }> => {
    return http.get<{ count: number }>('/api/notifications/unread-count');
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<void> => {
    return http.patch<void>(`/api/notifications/${notificationId}/read`);
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    return http.patch<void>('/api/notifications/mark-all-read');
  },

  // Delete notification
  delete: async (notificationId: string): Promise<void> => {
    return http.delete<void>(`/api/notifications/${notificationId}`);
  },

  // Get notification settings
  getSettings: async (): Promise<NotificationSettings> => {
    return http.get<NotificationSettings>('/api/notifications/settings');
  },

  // Update notification settings
  updateSettings: async (settings: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    return http.put<NotificationSettings>('/api/notifications/settings', settings);
  }
};
