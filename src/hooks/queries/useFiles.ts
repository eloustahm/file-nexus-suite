import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fileService } from '@/services/fileService';
import type { File, FileQueryParams, FileUpdateData } from '@/types/file';

// Query keys
export const fileKeys = {
  all: ['files'] as const,
  lists: () => [...fileKeys.all, 'list'] as const,
  list: (params: FileQueryParams) => [...fileKeys.lists(), params] as const,
  details: () => [...fileKeys.all, 'detail'] as const,
  detail: (id: string) => [...fileKeys.details(), id] as const,
  download: (id: string) => [...fileKeys.detail(id), 'download'] as const,
  preview: (id: string) => [...fileKeys.detail(id), 'preview'] as const,
  metadata: (id: string) => [...fileKeys.detail(id), 'metadata'] as const,
  versions: (id: string) => [...fileKeys.detail(id), 'versions'] as const,
};

// Query hooks
export const useFilesQuery = (params: FileQueryParams) => {
  return useQuery({
    queryKey: fileKeys.list(params),
    queryFn: () => fileService.getFiles(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFileQuery = (id: string) => {
  return useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getFile(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!id,
  });
};

export const useFileDownloadUrlQuery = (id: string) => {
  return useQuery({
    queryKey: fileKeys.download(id),
    queryFn: () => fileService.getDownloadUrl(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

export const useFilePreviewUrlQuery = (id: string) => {
  return useQuery({
    queryKey: fileKeys.preview(id),
    queryFn: () => fileService.getPreviewUrl(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

export const useFileMetadataQuery = (id: string) => {
  return useQuery({
    queryKey: fileKeys.metadata(id),
    queryFn: () => fileService.getFileMetadata(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

export const useFileVersionsQuery = (id: string) => {
  return useQuery({
    queryKey: fileKeys.versions(id),
    queryFn: () => fileService.getFileVersions(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

// Mutation hooks
export const useUpdateFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FileUpdateData }) =>
      fileService.updateFile(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
      queryClient.setQueryData(fileKeys.detail(id), response.file);
      toast.success('File updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update file');
    },
  });
};

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fileService.deleteFile(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
      queryClient.removeQueries({ queryKey: fileKeys.detail(id) });
      toast.success('File deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete file');
    },
  });
};

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, data }: { file: File; data: Partial<File> }) =>
      fileService.uploadFile(file, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
      toast.success('File uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload file');
    },
  });
};

export const useRestoreVersionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, versionId }: { id: string; versionId: string }) =>
      fileService.restoreVersion(id, versionId),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
      queryClient.setQueryData(fileKeys.detail(id), response.file);
      toast.success('Version restored successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to restore version');
    },
  });
};

// Utility functions
export const useFileUtils = (files: File[] = []) => {
  const getFileById = (id: string) => {
    return files.find(file => file.id === id);
  };

  const getFilesByType = (type: File['type']) => {
    return files.filter(file => file.type === type);
  };

  const getActiveFiles = () => {
    return files.filter(file => file.status === 'active');
  };

  const getArchivedFiles = () => {
    return files.filter(file => file.status === 'archived');
  };

  const getFilesByTag = (tag: string) => {
    return files.filter(file => file.tags?.includes(tag));
  };

  const getFilesByParent = (parentId: string) => {
    return files.filter(file => file.parentId === parentId);
  };

  return {
    getFileById,
    getFilesByType,
    getActiveFiles,
    getArchivedFiles,
    getFilesByTag,
    getFilesByParent,
  };
}; 