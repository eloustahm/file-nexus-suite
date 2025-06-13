import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { activityService } from '@/services/activityService';
import type { ActivityLog, ActivityFilter } from '@/types/activity';

// Query keys
export const activityKeys = {
  all: ['activities'] as const,
  lists: () => [...activityKeys.all, 'list'] as const,
  list: (filters: ActivityFilter) => [...activityKeys.lists(), filters] as const,
  details: () => [...activityKeys.all, 'detail'] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
  stats: (params: { startDate?: string; endDate?: string }) =>
    [...activityKeys.all, 'stats', params] as const,
};

// Query hooks
export const useActivityLogsQuery = (filters: ActivityFilter) => {
  return useQuery({
    queryKey: activityKeys.list(filters),
    queryFn: () => activityService.getActivities(filters),
  });
};

export const useActivityLogQuery = (id: string) => {
  return useQuery({
    queryKey: activityKeys.detail(id),
    queryFn: () => activityService.getActivity(id),
    enabled: !!id,
  });
};

export const useActivityStatsQuery = (params: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: activityKeys.stats(params),
    queryFn: () => activityService.getStats(params),
  });
};

// Mutation hooks
export const useCreateActivityLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ActivityLog>) => activityService.createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      queryClient.invalidateQueries({ queryKey: activityKeys.stats({}) });
    },
    onError: (error) => {
      toast.error('Failed to create activity log');
      console.error('Create activity log error:', error);
    },
  });
};

export const useDeleteActivityLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activityService.deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      queryClient.invalidateQueries({ queryKey: activityKeys.stats({}) });
      toast.success('Activity log deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete activity log');
      console.error('Delete activity log error:', error);
    },
  });
};

export const useClearActivityLogsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { before?: string; type?: string }) =>
      activityService.clearActivities(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      queryClient.invalidateQueries({ queryKey: activityKeys.stats({}) });
      toast.success('Activity logs cleared successfully');
    },
    onError: (error) => {
      toast.error('Failed to clear activity logs');
      console.error('Clear activity logs error:', error);
    },
  });
}; 