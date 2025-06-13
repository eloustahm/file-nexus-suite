import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity';
import type { ActivityLog, ActivityFilter, ActivityLogData } from '@/types';
import { toast } from 'sonner';

export const useActivityQuery = () => {
  const queryClient = useQueryClient();

  // Get activity logs query
  const activityLogsQuery = useQuery({
    queryKey: ['activity'],
    queryFn: () => activityService.getLogs(),
  });

  // Get filtered activity logs query
  const getFilteredLogs = (filters: ActivityFilter) => {
    return useQuery({
      queryKey: ['activity', 'filtered', filters],
      queryFn: () => activityService.getLogs(filters),
    });
  };

  // Get document activity query
  const getDocumentActivity = (documentId: string) => {
    return useQuery({
      queryKey: ['activity', 'document', documentId],
      queryFn: () => activityService.getDocumentActivity(documentId),
    });
  };

  // Get user activity query
  const getUserActivity = (userId: string) => {
    return useQuery({
      queryKey: ['activity', 'user', userId],
      queryFn: () => activityService.getUserActivity(userId),
    });
  };

  // Log activity mutation
  const logActivityMutation = useMutation({
    mutationFn: (data: ActivityLogData) => activityService.logActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to log activity');
    },
  });

  return {
    // Data
    activityLogs: activityLogsQuery.data || [],

    // Loading states
    isLoadingActivity: activityLogsQuery.isLoading,

    // Errors
    activityError: activityLogsQuery.error,

    // Actions
    getFilteredLogs,
    getDocumentActivity,
    getUserActivity,
    logActivity: logActivityMutation.mutate,

    // Mutation states
    isLoggingActivity: logActivityMutation.isPending,
  };
};
