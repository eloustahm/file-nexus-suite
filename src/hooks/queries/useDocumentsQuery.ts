
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsService } from '@/services/documents';
import type { Document, CreateDocumentData, ShareDocumentData } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface UseDocumentsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  folderId?: string;
}

export const useDocumentsQuery = (params: UseDocumentsParams = {}) => {
  const queryClient = useQueryClient();
  const { page = 1, limit = 10, sortBy = 'updatedAt', sortOrder = 'desc', folderId } = params;

  // Get all documents query
  const documentsQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENTS, { page, limit, sortBy, sortOrder, folderId }],
    queryFn: () => documentsService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get single document query
  const getDocument = (id: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.DOCUMENTS, id],
      queryFn: () => documentsService.getById(id),
      enabled: !!id,
    });
  };

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentData) => documentsService.create(data),
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      queryClient.setQueryData([QUERY_KEYS.DOCUMENTS, newDocument.id], newDocument);
      toast.success('Document created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create document');
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: (formData: FormData) => documentsService.upload(formData),
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      queryClient.setQueryData([QUERY_KEYS.DOCUMENTS, newDocument.id], newDocument);
      toast.success('Document uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload document');
    },
  });

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Document> }) =>
      documentsService.update(id, data),
    onSuccess: (updatedDocument) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      queryClient.setQueryData([QUERY_KEYS.DOCUMENTS, updatedDocument.id], updatedDocument);
      toast.success('Document updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: string) => documentsService.delete(id),
    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.DOCUMENTS, documentId] });
      toast.success('Document deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  // Share document mutation
  const shareDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ShareDocumentData }) =>
      documentsService.share(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast.success('Document shared successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to share document');
    },
  });

  // Download document mutation
  const downloadDocumentMutation = useMutation({
    mutationFn: (id: string) => documentsService.download(id),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to download document');
    },
  });

  return {
    // Server data
    documents: documentsQuery.data || [],
    total: documentsQuery.data?.length || 0,
    page,
    totalPages: Math.ceil((documentsQuery.data?.length || 0) / limit),
    
    // Server state
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error,
    
    // Document actions
    createDocument: createDocumentMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    updateDocument: updateDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    shareDocument: shareDocumentMutation.mutate,
    downloadDocument: downloadDocumentMutation.mutate,
    refetch: documentsQuery.refetch,
    getDocument,
    
    // Mutation states
    isCreating: createDocumentMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
    isUpdating: updateDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
    isSharing: shareDocumentMutation.isPending,
    isDownloading: downloadDocumentMutation.isPending,
    
    // Errors
    createError: createDocumentMutation.error,
    uploadError: uploadDocumentMutation.error,
    updateError: updateDocumentMutation.error,
    deleteError: deleteDocumentMutation.error,
    shareError: shareDocumentMutation.error,
    downloadError: downloadDocumentMutation.error,
  };
};
