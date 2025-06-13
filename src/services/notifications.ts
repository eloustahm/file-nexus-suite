import { http } from '@/lib/api';
import type { Notification } from '@/types';

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
export const notificationsService = {
  // Get all notifications
  async getAll(): Promise<Notification[]> {
    return http.get<Notification[]>('/notifications');
  },

  // Get unread notifications count
  async getUnreadCount(): Promise<{ count: number }> {
    return http.get<{ count: number }>('/notifications/unread-count');
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await http.patch<void>(`/notifications/${notificationId}/read`);
  },

  // Mark all as read
  async markAllAsRead(): Promise<void> {
    await http.patch<void>('/notifications/mark-all-read');
  },

  // Delete notification
  async delete(notificationId: string): Promise<void> {
    await http.delete<void>(`/notifications/${notificationId}`);
  },

  // Get notification settings
  async getSettings(): Promise<NotificationSettings> {
    return http.get<NotificationSettings>('/notifications/settings');
  },

  // Update notification settings
  async updateSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return http.patch<NotificationSettings>('/notifications/settings', settings);
  }
};
