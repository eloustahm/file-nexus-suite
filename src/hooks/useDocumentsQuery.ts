
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi, Document, CreateDocumentData } from '@/services/documents';
import { useDocumentsStore } from '@/store/useDocumentsStore';
import { toast } from 'sonner';

export const useDocumentsQuery = () => {
  const queryClient = useQueryClient();
  const { setSelectedDocument, searchQuery, filterTags, sortBy, sortOrder } = useDocumentsStore();

  // Fetch documents with TanStack Query
  const {
    data: documents = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentData) => documentsApi.create(data),
    onSuccess: (newDocument) => {
      queryClient.setQueryData(['documents'], (old: Document[] = []) => [newDocument, ...old]);
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
    onSuccess: (newDocument) => {
      queryClient.setQueryData(['documents'], (old: Document[] = []) => [newDocument, ...old]);
      toast.success('Document uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: string) => documentsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['documents'], (old: Document[] = []) => 
        old.filter(doc => doc.id !== deletedId)
      );
      setSelectedDocument(null);
      toast.success('Document deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  return {
    // Data
    documents,
    isLoading,
    error,
    
    // Actions
    createDocument: createDocumentMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    refetch,
    
    // Loading states
    isCreating: createDocumentMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
    
    // UI state from Zustand
    searchQuery,
    filterTags,
    sortBy,
    sortOrder,
    setSelectedDocument,
  };
};
