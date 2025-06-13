import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileItem, SAMPLE_FILES } from '@/constants/files';

// Mock API function to fetch files
const fetchFiles = async (): Promise<FileItem[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return SAMPLE_FILES;
};

// Mock API function to update file
const updateFile = async (fileId: string, updates: Partial<FileItem>): Promise<FileItem> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const file = SAMPLE_FILES.find(f => f.id === fileId);
  if (!file) throw new Error('File not found');
  return { ...file, ...updates };
};

// Mock API function to delete file
const deleteFile = async (fileId: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = SAMPLE_FILES.findIndex(f => f.id === fileId);
  if (index === -1) throw new Error('File not found');
  SAMPLE_FILES.splice(index, 1);
};

export function useFiles() {
  const queryClient = useQueryClient();

  const {
    data: files = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles
  });

  const updateMutation = useMutation({
    mutationFn: ({ fileId, updates }: { fileId: string; updates: Partial<FileItem> }) =>
      updateFile(fileId, updates),
    onSuccess: (updatedFile) => {
      queryClient.setQueryData(['files'], (oldFiles: FileItem[] = []) =>
        oldFiles.map(file => file.id === updatedFile.id ? updatedFile : file)
      );
      toast.success('File updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update file');
      console.error('Error updating file:', error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: (_, fileId) => {
      queryClient.setQueryData(['files'], (oldFiles: FileItem[] = []) =>
        oldFiles.filter(file => file.id !== fileId)
      );
      toast.success('File deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete file');
      console.error('Error deleting file:', error);
    }
  });

  const getFileById = (id: string) => {
    return files.find(file => file.id === id);
  };

  const getFilesByType = (type: FileItem['type']) => {
    return files.filter(file => file.type === type);
  };

  const getStarredFiles = () => {
    return files.filter(file => file.starred);
  };

  const getSharedFiles = () => {
    return files.filter(file => file.shared);
  };

  const getFilesByTag = (tag: string) => {
    return files.filter(file => file.tags.includes(tag));
  };

  const getFilesByOwner = (email: string) => {
    return files.filter(file => file.owner.email === email);
  };

  return {
    files,
    isLoading,
    error,
    updateFile: updateMutation.mutate,
    deleteFile: deleteMutation.mutate,
    getFileById,
    getFilesByType,
    getStarredFiles,
    getSharedFiles,
    getFilesByTag,
    getFilesByOwner
  };
} 