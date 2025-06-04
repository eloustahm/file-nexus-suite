
import { create } from 'zustand';
import { notificationsApi, Notification, NotificationSettings } from '@/services/notifications';

interface NotificationsState {
  notifications: Notification[];
  settings: NotificationSettings | null;
  unreadCount: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchNotifications: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  getUnreadCount: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
  clearError: () => void;

  // Computed state
  unreadNotifications: Notification[];
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  settings: null,
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    try {
      set({ loading: true, error: null });
      const notifications = await notificationsApi.getAll();
      set({ notifications });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSettings: async () => {
    try {
      set({ loading: true, error: null });
      const settings = await notificationsApi.getSettings();
      set({ settings });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getUnreadCount: async () => {
    try {
      const { count } = await notificationsApi.getUnreadCount();
      set({ unreadCount: count });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      await notificationsApi.markAsRead(notificationId);
      set(state => ({
        notifications: state.notifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationsApi.markAllAsRead();
      set(state => ({
        notifications: state.notifications.map(notification => ({ ...notification, isRead: true })),
        unreadCount: 0
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteNotification: async (notificationId: string) => {
    try {
      await notificationsApi.delete(notificationId);
      const notification = get().notifications.find(n => n.id === notificationId);
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadCount: notification && !notification.isRead 
          ? Math.max(0, state.unreadCount - 1) 
          : state.unreadCount
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateSettings: async (newSettings: Partial<NotificationSettings>) => {
    try {
      set({ loading: true, error: null });
      const settings = await notificationsApi.updateSettings(newSettings);
      set({ settings });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),

  get unreadNotifications() {
    return get().notifications.filter(notification => !notification.isRead);
  }
}));
