import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foldersService } from '@/services/folders';
import type { Folder } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useFoldersQuery = () => {
  const queryClient = useQueryClient();

  // Get all folders query
  const foldersQuery = useQuery({
    queryKey: [QUERY_KEYS.FOLDERS],
    queryFn: foldersService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create folder mutation
  const createFolderMutation = useMutation({
    mutationFn: foldersService.create,
    onSuccess: (newFolder) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLDERS] });
      queryClient.setQueryData([QUERY_KEYS.FOLDERS, newFolder.id], newFolder);
      toast.success('Folder created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create folder');
    },
  });

  // Update folder mutation
  const updateFolderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Folder> }) =>
      foldersService.update(id, data),
    onSuccess: (updatedFolder) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLDERS] });
      queryClient.setQueryData([QUERY_KEYS.FOLDERS, updatedFolder.id], updatedFolder);
      toast.success('Folder updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update folder');
    },
  });

  // Delete folder mutation
  const deleteFolderMutation = useMutation({
    mutationFn: foldersService.delete,
    onSuccess: (_, folderId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLDERS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.FOLDERS, folderId] });
      toast.success('Folder deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete folder');
    },
  });

  // Get folder documents query
  const getFolderDocuments = (folderId: string) => {
    return useQuery({
      queryKey: ['folders', folderId, 'documents'],
      queryFn: () => foldersService.getDocuments(folderId),
    });
  };

  return {
    // Server data
    folders: foldersQuery.data || [],
    
    // Server state
    isLoading: foldersQuery.isLoading,
    error: foldersQuery.error?.message,
    
    // Folder actions
    createFolder: createFolderMutation.mutate,
    updateFolder: updateFolderMutation.mutate,
    deleteFolder: deleteFolderMutation.mutate,
    refetch: foldersQuery.refetch,
    
    // Mutation states
    isCreating: createFolderMutation.isPending,
    isUpdating: updateFolderMutation.isPending,
    isDeleting: deleteFolderMutation.isPending,

    // Queries
    getFolderDocuments,
  };
};
