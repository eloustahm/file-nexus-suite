
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentGenerationService } from '@/services/documentGeneration';
import type { Template, GeneratedDocument, DocumentFormData } from '@/types';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDocumentGenerationQuery = () => {
  const queryClient = useQueryClient();

  // Get templates query
  const templatesQuery = useQuery({
    queryKey: [QUERY_KEYS.TEMPLATES],
    queryFn: documentGenerationService.getTemplates,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Get generated documents query
  const generatedDocumentsQuery = useQuery({
    queryKey: [QUERY_KEYS.GENERATED_DOCS],
    queryFn: documentGenerationService.getGeneratedDocuments,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get single document query
  const getDocument = (id: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GENERATED_DOCS, id],
      queryFn: () => documentGenerationService.getDocument(id),
      enabled: !!id,
    });
  };

  // Generate document mutation
  const generateDocumentMutation = useMutation({
    mutationFn: (data: DocumentFormData) => documentGenerationService.generateDocument(data),
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENERATED_DOCS] });
      queryClient.setQueryData([QUERY_KEYS.GENERATED_DOCS, newDocument.id], newDocument);
      toast.success('Document generated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate document');
    },
  });

  // Regenerate document mutation
  const regenerateDocumentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DocumentFormData }) =>
      documentGenerationService.regenerateDocument(id, data),
    onSuccess: (updatedDocument) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENERATED_DOCS] });
      queryClient.setQueryData([QUERY_KEYS.GENERATED_DOCS, updatedDocument.id], updatedDocument);
      toast.success('Document regenerated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to regenerate document');
    },
  });

  // Select document mutation
  const selectDocumentMutation = useMutation({
    mutationFn: (id: string) => documentGenerationService.selectDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENERATED_DOCS] });
      toast.success('Document selected successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to select document');
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: string) => documentGenerationService.deleteDocument(id),
    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GENERATED_DOCS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.GENERATED_DOCS, documentId] });
      toast.success('Document deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  // Download document mutation
  const downloadDocumentMutation = useMutation({
    mutationFn: (id: string) => documentGenerationService.downloadDocument(id),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to download document');
    },
  });

  return {
    // Server data
    templates: templatesQuery.data || [],
    generatedDocuments: generatedDocumentsQuery.data || [],
    
    // Server state
    isLoadingTemplates: templatesQuery.isLoading,
    isLoadingDocuments: generatedDocumentsQuery.isLoading,
    templatesError: templatesQuery.error,
    documentsError: generatedDocumentsQuery.error,
    
    // Document generation actions
    generateDocument: generateDocumentMutation.mutate,
    regenerateDocument: regenerateDocumentMutation.mutate,
    selectDocument: selectDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    downloadDocument: downloadDocumentMutation.mutate,
    refetchTemplates: templatesQuery.refetch,
    refetchDocuments: generatedDocumentsQuery.refetch,
    getDocument,
    
    // Mutation states
    isGeneratingDocument: generateDocumentMutation.isPending,
    isRegeneratingDocument: regenerateDocumentMutation.isPending,
    isSelectingDocument: selectDocumentMutation.isPending,
    isDeletingDocument: deleteDocumentMutation.isPending,
    isDownloadingDocument: downloadDocumentMutation.isPending,
  };
};
