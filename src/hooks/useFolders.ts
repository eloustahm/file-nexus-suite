
import { useFoldersQuery } from '@/hooks/queries/useFoldersQuery';

/**
 * Combined hook that provides server data for folders
 * Note: Folders don't need UI state management as they're simple CRUD operations
 */
export const useFolders = () => {
  const foldersQuery = useFoldersQuery();

  return {
    // Server data
    folders: foldersQuery.folders,
    
    // Server state
    isLoading: foldersQuery.isLoading,
    error: foldersQuery.error?.message,
    
    // Folder actions
    createFolder: foldersQuery.createFolder,
    updateFolder: foldersQuery.updateFolder,
    deleteFolder: foldersQuery.deleteFolder,
    refetch: foldersQuery.refetch,
    
    // Mutation states
    isCreating: foldersQuery.isCreating,
    isUpdating: foldersQuery.isUpdating,
    isDeleting: foldersQuery.isDeleting,
  };
};
