
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { notificationsApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

interface NotificationsContextState extends BaseContextState {
  notifications: Notification[];
  unreadCount: number;
}

interface NotificationsContextActions extends BaseContextActions {
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

interface NotificationsContextValue extends NotificationsContextState, NotificationsContextActions {}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchNotifications = async () => {
    await handleAsyncAction(
      async () => {
        const data = await notificationsApi.getAll() as Notification[];
        setNotifications(data);
      },
      setLoading,
      setError
    );
  };

  const markAsRead = async (id: string) => {
    await handleAsyncAction(
      async () => {
        await notificationsApi.markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      },
      setLoading,
      setError
    );
  };

  const markAllAsRead = async () => {
    await handleAsyncAction(
      async () => {
        await notificationsApi.markAllAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      },
      setLoading,
      setError
    );
  };

  const deleteNotification = async (id: string) => {
    await handleAsyncAction(
      async () => {
        await notificationsApi.delete(id);
        setNotifications(prev => prev.filter(n => n.id !== id));
      },
      setLoading,
      setError
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationsContextValue = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    ...baseActions,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
