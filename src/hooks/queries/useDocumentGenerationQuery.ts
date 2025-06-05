
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentGenerationApi } from '@/services/documentGeneration';
import { QUERY_KEYS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import type { DocumentFormData } from '@/services/documentGeneration';

/**
 * React Query hooks for document generation API
 */
export const useDocumentGenerationQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get templates
  const templatesQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'templates'],
    queryFn: documentGenerationApi.getTemplates,
  });

  // Get generated documents
  const generatedDocumentsQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'],
    queryFn: documentGenerationApi.getGeneratedDocuments,
  });

  // Generate document mutation
  const generateDocumentMutation = useMutation({
    mutationFn: documentGenerationApi.generateDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      toast({
        title: 'Document generated',
        description: 'Document has been generated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error generating document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Regenerate document mutation
  const regenerateDocumentMutation = useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: DocumentFormData }) =>
      documentGenerationApi.regenerateDocument(documentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      toast({
        title: 'Document regenerated',
        description: 'Document has been regenerated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error regenerating document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Select document mutation
  const selectDocumentMutation = useMutation({
    mutationFn: documentGenerationApi.selectDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      toast({
        title: 'Document selected',
        description: 'Document has been selected successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error selecting document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: documentGenerationApi.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
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

  return {
    // Data
    templates: templatesQuery.data || [],
    generatedDocuments: generatedDocumentsQuery.data || [],
    
    // Loading states
    isLoading: templatesQuery.isLoading || generatedDocumentsQuery.isLoading,
    isLoadingTemplates: templatesQuery.isLoading,
    isLoadingDocuments: generatedDocumentsQuery.isLoading,
    
    // Error states
    error: templatesQuery.error || generatedDocumentsQuery.error,
    templatesError: templatesQuery.error,
    documentsError: generatedDocumentsQuery.error,
    
    // Actions
    generateDocument: generateDocumentMutation.mutate,
    regenerateDocument: regenerateDocumentMutation.mutate,
    selectDocument: selectDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    getDocument: documentGenerationApi.getDocument,
    downloadDocument: documentGenerationApi.downloadDocument,
    
    // Refetch functions
    refetch: () => {
      templatesQuery.refetch();
      generatedDocumentsQuery.refetch();
    },
    refetchTemplates: templatesQuery.refetch,
    refetchDocuments: generatedDocumentsQuery.refetch,
    
    // Mutation states
    isGenerating: generateDocumentMutation.isPending,
    isRegenerating: regenerateDocumentMutation.isPending,
    isSelecting: selectDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
  };
};
