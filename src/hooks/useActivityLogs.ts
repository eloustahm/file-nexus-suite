
import { useQuery } from '@tanstack/react-query';
import { activityService } from '@/services/activity';
import type { ActivityLog } from '@/types';

export const useActivityLogs = (params?: { page?: number; limit?: number; filter?: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['activityLogs', params],
    queryFn: () => activityService.getActivities(params),
  });

  // Handle both array and paginated response formats
  const activities = Array.isArray(data) ? data : data?.activities || [];
  const total = Array.isArray(data) ? data.length : data?.total || 0;

  return {
    activities,
    total,
    isLoading,
    error: error?.message,
  };
};
