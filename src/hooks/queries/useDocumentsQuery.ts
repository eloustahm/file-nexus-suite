
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi, type CreateDocumentData, type ShareDocumentData } from '@/services/documents';
import { useDocumentsUIStore } from '@/store/useDocumentsUIStore';
import { toast } from 'sonner';

export const useDocumentsQuery = () => {
  const queryClient = useQueryClient();
  const { searchQuery, sortBy, sortOrder, filterTags } = useDocumentsUIStore();

  // Get all documents query
  const documentsQuery = useQuery({
    queryKey: ['documents', { searchQuery, sortBy, sortOrder, filterTags }],
    queryFn: () => documentsApi.getAll(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentData) => documentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create document');
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return documentsApi.upload(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload document');
    },
  });

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) => 
      documentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: string) => documentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  // Share document mutation
  const shareDocumentMutation = useMutation({
    mutationFn: ({ id, shareData }: { id: string; shareData: ShareDocumentData }) => 
      documentsApi.share(id, shareData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document shared successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to share document');
    },
  });

  return {
    documents: documentsQuery.data || [],
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error,
    
    // Mutations
    createDocument: createDocumentMutation.mutateAsync,
    uploadDocument: uploadDocumentMutation.mutateAsync,
    updateDocument: updateDocumentMutation.mutateAsync,
    deleteDocument: deleteDocumentMutation.mutateAsync,
    shareDocument: shareDocumentMutation.mutateAsync,
    
    // Loading states
    isCreating: createDocumentMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
    isUpdating: updateDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
    isSharing: shareDocumentMutation.isPending,
    
    // Refetch
    refetch: documentsQuery.refetch,
  };
};
