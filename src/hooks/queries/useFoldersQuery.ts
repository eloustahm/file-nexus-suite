
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foldersApi } from '@/services/folders';
import { toast } from 'sonner';

export const useFoldersQuery = () => {
  const queryClient = useQueryClient();

  // Get all folders query
  const foldersQuery = useQuery({
    queryKey: ['folders'],
    queryFn: foldersApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create folder mutation
  const createFolderMutation = useMutation({
    mutationFn: (data: { name: string; parentId?: string; description?: string }) => 
      foldersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create folder');
    },
  });

  // Update folder mutation
  const updateFolderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      foldersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update folder');
    },
  });

  // Delete folder mutation
  const deleteFolderMutation = useMutation({
    mutationFn: (id: string) => foldersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete folder');
    },
  });

  return {
    folders: foldersQuery.data || [],
    isLoading: foldersQuery.isLoading,
    error: foldersQuery.error,

    // Mutations
    createFolder: createFolderMutation.mutateAsync,
    updateFolder: updateFolderMutation.mutateAsync,
    deleteFolder: deleteFolderMutation.mutateAsync,

    // Loading states
    isCreating: createFolderMutation.isPending,
    isUpdating: updateFolderMutation.isPending,
    isDeleting: deleteFolderMutation.isPending,

    // Refetch
    refetch: foldersQuery.refetch,
  };
};
