
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiModulesService } from '@/services/aiModules';
import { toast } from 'sonner';
import type { AIModule, AIModuleStatus, AIModuleUpdateData } from '@/types/ai-module';

export const useAIModules = () => {
  const queryClient = useQueryClient();

  const { data: modules, isLoading, error } = useQuery({
    queryKey: ['aiModules'],
    queryFn: aiModulesService.getModules,
  });

  const updateModuleMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AIModuleUpdateData }) =>
      aiModulesService.updateModule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModules'] });
      toast.success('Module updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update module');
    },
  });

  const testModuleMutation = useMutation({
    mutationFn: (id: string) => aiModulesService.testModule(id),
    onSuccess: () => {
      toast.success('Module test completed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Module test failed');
    },
  });

  const toggleModuleStatus = (id: string, status: AIModuleStatus) => {
    updateModuleMutation.mutate({ id, data: { status } });
  };

  return {
    modules: modules || [],
    isLoading,
    error: error?.message,
    updateModule: updateModuleMutation.mutate,
    testModule: testModuleMutation.mutate,
    toggleModuleStatus,
    isUpdating: updateModuleMutation.isPending,
    isTesting: testModuleMutation.isPending,
  };
};
