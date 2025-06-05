
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '@/services/documents';
import { QUERY_KEYS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import type { Document, CreateDocumentData, ShareDocumentData } from '@/services/documents';

/**
 * React Query hooks for documents API
 */
export const useDocumentsQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get all documents
  const documentsQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENTS],
    queryFn: documentsApi.getAll,
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: documentsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: 'Document created',
        description: 'Document has been created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: documentsApi.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: 'Document uploaded',
        description: 'Document has been uploaded successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error uploading document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Document> }) =>
      documentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: 'Document updated',
        description: 'Document has been updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: documentsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENTS] });
      toast({
        title: 'Document deleted',
        description: 'Document has been deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error deleting document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Share document mutation
  const shareDocumentMutation = useMutation({
    mutationFn: ({ id, shareData }: { id: string; shareData: ShareDocumentData }) =>
      documentsApi.share(id, shareData),
    onSuccess: () => {
      toast({
        title: 'Document shared',
        description: 'Document has been shared successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error sharing document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    // Data
    documents: documentsQuery.data || [],
    
    // States
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error,
    
    // Actions
    createDocument: createDocumentMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    updateDocument: updateDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    shareDocument: shareDocumentMutation.mutate,
    refetch: documentsQuery.refetch,
    
    // Mutation states
    isCreating: createDocumentMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
    isUpdating: updateDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
    isSharing: shareDocumentMutation.isPending,
  };
};
