
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { activityApi, ActivityLog, ActivityFilters } from '@/services/activity';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface ActivityContextState extends BaseContextState {
  logs: ActivityLog[];
  filters: ActivityFilters;
  filteredLogs: ActivityLog[];
}

interface ActivityContextActions extends BaseContextActions {
  fetchLogs: (filters?: ActivityFilters) => Promise<void>;
  getDocumentActivity: (documentId: string) => Promise<void>;
  getUserActivity: (userId: string) => Promise<void>;
  logActivity: (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => Promise<void>;
  setFilters: (filters: ActivityFilters) => void;
}

interface ActivityContextValue extends ActivityContextState, ActivityContextActions {}

const ActivityContext = createContext<ActivityContextValue | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ActivityFilters>({});

  const baseActions = createBaseActions(setLoading, setError);

  const fetchLogs = async (filterParams?: ActivityFilters) => {
    await handleAsyncAction(
      async () => {
        const logsData = await activityApi.getLogs(filterParams);
        setLogs(logsData);
      },
      setLoading,
      setError
    );
  };

  const getDocumentActivity = async (documentId: string) => {
    await handleAsyncAction(
      async () => {
        const logsData = await activityApi.getDocumentActivity(documentId);
        setLogs(logsData);
      },
      setLoading,
      setError
    );
  };

  const getUserActivity = async (userId: string) => {
    await handleAsyncAction(
      async () => {
        const logsData = await activityApi.getUserActivity(userId);
        setLogs(logsData);
      },
      setLoading,
      setError
    );
  };

  const logActivity = async (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => {
    try {
      await activityApi.logActivity(data);
      await fetchLogs(filters);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const setFiltersAndFetch = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
    fetchLogs(newFilters);
  };

  const filteredLogs = useMemo(() => {
    let filtered = [...logs];

    if (filters.type) {
      filtered = filtered.filter(log => log.type === filters.type);
    }

    if (filters.userId) {
      filtered = filtered.filter(log => log.userId === filters.userId);
    }

    if (filters.startDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) <= new Date(filters.endDate!)
      );
    }

    return filtered;
  }, [logs, filters]);

  const value: ActivityContextValue = {
    logs,
    loading,
    error,
    filters,
    filteredLogs,
    fetchLogs,
    getDocumentActivity,
    getUserActivity,
    logActivity,
    setFilters: setFiltersAndFetch,
    ...baseActions,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
