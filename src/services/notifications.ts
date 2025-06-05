
import { http } from '@/lib/api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  userId: string;
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
    console.log('Fetching all notifications');
    return http.get<Notification[]>('/api/notifications');
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ count: number }> => {
    console.log('Fetching unread notifications count');
    return http.get<{ count: number }>('/api/notifications/unread-count');
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    console.log('Marking notification as read:', notificationId);
    return http.put(`/api/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    console.log('Marking all notifications as read');
    return http.put('/api/notifications/mark-all-read');
  },

  // Delete notification
  delete: async (notificationId: string) => {
    console.log('Deleting notification:', notificationId);
    return http.delete(`/api/notifications/${notificationId}`);
  },

  // Get notification settings
  getSettings: async (): Promise<NotificationSettings> => {
    console.log('Fetching notification settings');
    return http.get<NotificationSettings>('/api/notifications/settings');
  },

  // Update notification settings
  updateSettings: async (settings: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    console.log('Updating notification settings:', settings);
    return http.put<NotificationSettings>('/api/notifications/settings', settings);
  }
};
