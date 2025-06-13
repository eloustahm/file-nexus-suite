import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ActivityLog, SAMPLE_ACTIVITIES } from '@/constants/activity';

// Mock API function to fetch activity logs
const fetchActivityLogs = async (): Promise<ActivityLog[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return SAMPLE_ACTIVITIES;
};

// Mock API function to clear activity logs
const clearActivityLogs = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};

export function useActivityLogs() {
  const queryClient = useQueryClient();

  const {
    data: activities = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['activityLogs'],
    queryFn: fetchActivityLogs
  });

  const clearMutation = useMutation({
    mutationFn: clearActivityLogs,
    onSuccess: () => {
      queryClient.setQueryData(['activityLogs'], []);
      toast.success('Activity logs cleared successfully');
    },
    onError: (error) => {
      toast.error('Failed to clear activity logs');
      console.error('Error clearing activity logs:', error);
    }
  });

  const getActivityById = (id: string) => {
    return activities.find(activity => activity.id === id);
  };

  const getActivitiesByType = (type: ActivityLog['type']) => {
    return activities.filter(activity => activity.type === type);
  };

  const getRecentActivities = (limit: number = 5) => {
    return [...activities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  };

  const getActivitiesByUser = (email: string) => {
    return activities.filter(activity => activity.user.email === email);
  };

  return {
    activities,
    isLoading,
    error,
    clearActivityLogs: clearMutation.mutate,
    getActivityById,
    getActivitiesByType,
    getRecentActivities,
    getActivitiesByUser
  };
} 