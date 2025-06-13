import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { aiModuleService } from '@/services/aiModuleService';
import type { AIModule, AIModuleUpdateData } from '@/types/ai-module';

// Query keys
export const aiModuleKeys = {
  all: ['ai-modules'] as const,
  lists: () => [...aiModuleKeys.all, 'list'] as const,
  list: () => [...aiModuleKeys.lists()] as const,
  details: () => [...aiModuleKeys.all, 'detail'] as const,
  detail: (id: string) => [...aiModuleKeys.details(), id] as const,
  stats: (id: string) => [...aiModuleKeys.detail(id), 'stats'] as const,
  features: (id: string) => [...aiModuleKeys.detail(id), 'features'] as const,
  logs: (id: string) => [...aiModuleKeys.detail(id), 'logs'] as const,
};

// Query hooks
export const useAIModulesQuery = () => {
  return useQuery({
    queryKey: aiModuleKeys.list(),
    queryFn: () => aiModuleService.getModules(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAIModuleQuery = (id: string) => {
  return useQuery({
    queryKey: aiModuleKeys.detail(id),
    queryFn: () => aiModuleService.getModule(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!id,
  });
};

export const useAIModuleStatsQuery = (id: string) => {
  return useQuery({
    queryKey: aiModuleKeys.stats(id),
    queryFn: () => aiModuleService.getModuleStats(id),
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!id,
  });
};

export const useAIModuleFeaturesQuery = (id: string) => {
  return useQuery({
    queryKey: aiModuleKeys.features(id),
    queryFn: () => aiModuleService.getModuleFeatures(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

export const useAIModuleLogsQuery = (id: string, params: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: [...aiModuleKeys.logs(id), params],
    queryFn: () => aiModuleService.getModuleLogs(id, params),
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!id,
  });
};

// Mutation hooks
export const useUpdateAIModuleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AIModuleUpdateData }) =>
      aiModuleService.updateModule(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: aiModuleKeys.all });
      queryClient.setQueryData(aiModuleKeys.detail(id), response.module);
      toast.success('AI module updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update AI module');
    },
  });
};

export const useTestAIModuleMutation = () => {
  return useMutation({
    mutationFn: (id: string) => aiModuleService.testModuleConnection(id),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Connection test successful');
      } else {
        toast.error(response.message || 'Connection test failed');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to test connection');
    },
  });
}; 