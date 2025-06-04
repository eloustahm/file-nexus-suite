
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentGenerationApi, type DocumentFormData } from '@/services/documentGeneration';
import { toast } from 'sonner';

export const useDocumentGenerationQuery = () => {
  const queryClient = useQueryClient();

  // Get templates query
  const templatesQuery = useQuery({
    queryKey: ['documentGeneration', 'templates'],
    queryFn: documentGenerationApi.getTemplates,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Get generated documents query
  const documentsQuery = useQuery({
    queryKey: ['documentGeneration', 'documents'],
    queryFn: documentGenerationApi.getGeneratedDocuments,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Generate document mutation
  const generateDocumentMutation = useMutation({
    mutationFn: (data: DocumentFormData) => documentGenerationApi.generateDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentGeneration', 'documents'] });
      toast.success('Document generation started');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate document');
    },
  });

  // Regenerate document mutation
  const regenerateDocumentMutation = useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: DocumentFormData }) => 
      documentGenerationApi.regenerateDocument(documentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentGeneration', 'documents'] });
      toast.success('Document regeneration started');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to regenerate document');
    },
  });

  // Select document mutation
  const selectDocumentMutation = useMutation({
    mutationFn: (documentId: string) => documentGenerationApi.selectDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentGeneration', 'documents'] });
      toast.success('Document selected');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to select document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (documentId: string) => documentGenerationApi.deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentGeneration', 'documents'] });
      toast.success('Document deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  return {
    // Data
    templates: templatesQuery.data || [],
    documents: documentsQuery.data || [],

    // Loading states
    isLoadingTemplates: templatesQuery.isLoading,
    isLoadingDocuments: documentsQuery.isLoading,

    // Errors
    templatesError: templatesQuery.error,
    documentsError: documentsQuery.error,

    // Mutations
    generateDocument: generateDocumentMutation.mutateAsync,
    regenerateDocument: regenerateDocumentMutation.mutateAsync,
    selectDocument: selectDocumentMutation.mutateAsync,
    deleteDocument: deleteDocumentMutation.mutateAsync,

    // Loading states
    isGenerating: generateDocumentMutation.isPending,
    isRegenerating: regenerateDocumentMutation.isPending,
    isSelecting: selectDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,

    // Refetch
    refetchTemplates: templatesQuery.refetch,
    refetchDocuments: documentsQuery.refetch,

    // Helper functions
    getDocument: (documentId: string) => documentGenerationApi.getDocument(documentId),
    downloadDocument: (documentId: string) => documentGenerationApi.downloadDocument(documentId),
  };
};
