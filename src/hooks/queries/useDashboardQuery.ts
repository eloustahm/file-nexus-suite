
import { useQuery } from '@tanstack/react-query';
import { documentsService } from '@/services/documents';
import { activityService } from '@/services/activity';
import { teamService } from '@/services/team';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDashboardQuery = () => {
  // Get dashboard stats
  const dashboardStatsQuery = useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY_STATS, 'dashboard'],
    queryFn: async () => {
      // Fetch various metrics for dashboard
      const [documents, members, activities] = await Promise.all([
        documentsService.getAll(),
        teamService.getMembers().catch(() => []),
        activityService.getActivities({ limit: 10 }).catch(() => ({ activities: [], total: 0 }))
      ]);

      return {
        totalDocuments: documents.length,
        totalMembers: members.length,
        recentActivities: activities.activities,
        storageUsed: documents.reduce((acc, doc) => acc + doc.size, 0),
        activeWorkflows: 0, // Placeholder until workflows are implemented
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    stats: dashboardStatsQuery.data,
    isLoading: dashboardStatsQuery.isLoading,
    error: dashboardStatsQuery.error,
    refetch: dashboardStatsQuery.refetch,
  };
};
