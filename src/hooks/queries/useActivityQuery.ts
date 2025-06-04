
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityApi, type ActivityFilters } from '@/services/activity';
import { toast } from 'sonner';

export const useActivityQuery = (filters?: ActivityFilters) => {
  const queryClient = useQueryClient();

  // Get activity logs query
  const logsQuery = useQuery({
    queryKey: ['activity', filters],
    queryFn: () => activityApi.getLogs(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Log activity mutation
  const logActivityMutation = useMutation({
    mutationFn: (data: { action: string; description: string; type: string; metadata?: Record<string, any> }) => 
      activityApi.logActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to log activity');
    },
  });

  return {
    logs: logsQuery.data || [],
    isLoading: logsQuery.isLoading,
    error: logsQuery.error,

    // Mutations
    logActivity: logActivityMutation.mutateAsync,

    // Loading states
    isLogging: logActivityMutation.isPending,

    // Refetch
    refetch: logsQuery.refetch,

    // Helper functions
    getDocumentActivity: (documentId: string) => 
      activityApi.getDocumentActivity(documentId),
    getUserActivity: (userId: string) => 
      activityApi.getUserActivity(userId),
  };
};
