import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsService, type Document, type CreateDocumentData, type ShareDocumentData } from '@/services/documents';
import { toast } from '@/hooks/use-toast';
import { QUERY_KEYS } from '@/constants';

export const useDocumentsQuery = () => {
  const queryClient = useQueryClient();

  // Get all documents query
  const documentsQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENTS],
    queryFn: documentsService.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentData) => documentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: "Success",
        description: "Document created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || 'Failed to create document',
        variant: "destructive",
      });
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return documentsService.upload(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || 'Failed to upload document',
        variant: "destructive",
      });
    },
  });

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) => 
      documentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: "Success",
        description: "Document updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || 'Failed to update document',
        variant: "destructive",
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: string) => documentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || 'Failed to delete document',
        variant: "destructive",
      });
    },
  });

  // Share document mutation
  const shareDocumentMutation = useMutation({
    mutationFn: ({ id, shareData }: { id: string; shareData: ShareDocumentData }) => 
      documentsService.share(id, shareData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: "Success",
        description: "Document shared successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || 'Failed to share document',
        variant: "destructive",
      });
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
