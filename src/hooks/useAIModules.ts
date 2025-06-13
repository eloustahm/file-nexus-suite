import { useAIModulesQuery, useUpdateAIModuleMutation, useTestAIModuleMutation } from '@/hooks/queries/useAIModules';
import type { AIModule } from '@/types/ai-module';

/**
 * Combined hook that provides both UI state and server data for AI modules
 */
export const useAIModules = () => {
  // Queries
  const { data: modules = [], isLoading, error } = useAIModulesQuery();

  // Mutations
  const updateModuleMutation = useUpdateAIModuleMutation();
  const testModuleMutation = useTestAIModuleMutation();

  const getModule = (id: string) => {
    return modules.find(module => module.id === id);
  };

  const getActiveModules = () => {
    return modules.filter(module => module.status === 'active');
  };

  const getInactiveModules = () => {
    return modules.filter(module => module.status === 'inactive');
  };

  const getPendingModules = () => {
    return modules.filter(module => module.status === 'pending');
  };

  const updateModuleStatus = (id: string, status: AIModule['status']) => {
    updateModuleMutation.mutate({ id, data: { status } });
  };

  const testModuleConnection = (id: string) => {
    testModuleMutation.mutate(id);
  };

  return {
    // Data
    modules,
    
    // Loading states
    isLoading,
    isUpdating: updateModuleMutation.isPending,
    isTesting: testModuleMutation.isPending,
    
    // Errors
    error: error?.message,
    updateError: updateModuleMutation.error?.message,
    testError: testModuleMutation.error?.message,
    
    // Actions
    getModule,
    getActiveModules,
    getInactiveModules,
    getPendingModules,
    updateModuleStatus,
    testModuleConnection,
  };
}; 