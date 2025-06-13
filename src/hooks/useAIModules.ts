import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AI_MODULES, type AIModule } from '@/constants/ai-modules';

// Mock API function - replace with actual API call
const fetchAIModules = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return AI_MODULES;
};

export const useAIModules = () => {
  const queryClient = useQueryClient();

  const { data: modules, isLoading, error } = useQuery({
    queryKey: ['ai-modules'],
    queryFn: fetchAIModules
  });

  const updateModuleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: AIModule['status'] }) => {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, status };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ai-modules'], (old: any) =>
        old.map((module: AIModule) =>
          module.id === data.id ? { ...module, status: data.status } : module
        )
      );
      toast.success('Module status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update module status');
    }
  });

  const getModule = (id: string) => {
    return modules?.find(module => module.id === id);
  };

  const getActiveModules = () => {
    return modules?.filter(module => module.status === 'active') ?? [];
  };

  const getInactiveModules = () => {
    return modules?.filter(module => module.status === 'inactive') ?? [];
  };

  const getPendingModules = () => {
    return modules?.filter(module => module.status === 'pending') ?? [];
  };

  return {
    modules: modules ?? [],
    isLoading,
    error,
    updateModuleStatus,
    getModule,
    getActiveModules,
    getInactiveModules,
    getPendingModules
  };
}; 