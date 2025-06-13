import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentGenerationService } from '@/services/documentGeneration';
import type { Template, GeneratedDocument, DocumentFormData } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants';

export const useDocumentGenerationQuery = () => {
  const queryClient = useQueryClient();

  // Get templates query
  const templatesQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'templates'],
    queryFn: documentGenerationService.getTemplates,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Get generated documents query
  const documentsQuery = useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'],
    queryFn: documentGenerationService.getGeneratedDocuments,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get document by ID query
  const getDocument = (documentId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents', documentId],
      queryFn: () => documentGenerationService.getDocument(documentId),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Generate document mutation
  const generateDocumentMutation = useMutation({
    mutationFn: (data: DocumentFormData) => documentGenerationService.generateDocument(data),
    onSuccess: (document) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      queryClient.setQueryData(
        [QUERY_KEYS.DOCUMENT_GENERATION, 'documents', document.id],
        document
      );
      toast.success('Document generation started');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate document');
    },
  });

  // Regenerate document mutation
  const regenerateDocumentMutation = useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: DocumentFormData }) =>
      documentGenerationService.regenerateDocument(documentId, data),
    onSuccess: (document) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      queryClient.setQueryData(
        [QUERY_KEYS.DOCUMENT_GENERATION, 'documents', document.id],
        document
      );
      toast.success('Document regeneration started');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to regenerate document');
    },
  });

  // Select document mutation
  const selectDocumentMutation = useMutation({
    mutationFn: documentGenerationService.selectDocument,
    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      queryClient.setQueryData(
        [QUERY_KEYS.DOCUMENT_GENERATION, 'documents', documentId],
        (old: GeneratedDocument) => ({ ...old, isSelected: true })
      );
      toast.success('Document selected');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to select document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: documentGenerationService.deleteDocument,
    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents'] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.DOCUMENT_GENERATION, 'documents', documentId] });
      toast.success('Document deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  // Download document mutation
  const downloadDocumentMutation = useMutation({
    mutationFn: documentGenerationService.downloadDocument,
    onError: (error: any) => {
      toast.error(error.message || 'Failed to download document');
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
    downloadDocument: downloadDocumentMutation.mutateAsync,

    // Loading states
    isGeneratingDocument: generateDocumentMutation.isPending,
    isRegeneratingDocument: regenerateDocumentMutation.isPending,
    isSelectingDocument: selectDocumentMutation.isPending,
    isDeletingDocument: deleteDocumentMutation.isPending,
    isDownloadingDocument: downloadDocumentMutation.isPending,

    // Refetch
    refetchTemplates: templatesQuery.refetch,
    refetchDocuments: documentsQuery.refetch,

    // Get document by ID
    getDocument,
  };
};
