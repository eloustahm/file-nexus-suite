
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiModuleService } from '@/services/aiModuleService';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { toast } from 'sonner';
import type { AIModule, AIModuleStatus } from '@/types/ai-module';

export const useAIModulesQuery = () => {
  const modulesQuery = useQuery({
    queryKey: [QUERY_KEYS.AI_MODULES],
    queryFn: aiModuleService.getModules,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    modules: modulesQuery.data?.modules || [],
    isLoading: modulesQuery.isLoading,
    error: modulesQuery.error,
    refetch: modulesQuery.refetch,
  };
};

export const useUpdateModuleStatusMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AIModuleStatus }) => 
      aiModuleService.updateModule(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AI_MODULES] });
      toast.success('Module status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update module status');
    },
  });
};

export const useTestModuleMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => aiModuleService.testModuleConnection(id),
    onSuccess: () => {
      toast.success('Module connection test successful');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Module connection test failed');
    },
  });
};
