
import { useDocumentGenerationQuery } from '@/hooks/queries/useDocumentGenerationQuery';

/**
 * Combined hook that provides server data for document generation
 */
export const useDocumentGeneration = () => {
  const docGenQuery = useDocumentGenerationQuery();

  return {
    // Server data
    templates: docGenQuery.templates,
    documents: docGenQuery.generatedDocuments,
    
    // Server state
    isLoadingTemplates: docGenQuery.isLoadingTemplates,
    isLoadingDocuments: docGenQuery.isLoadingDocuments,
    templatesError: docGenQuery.templatesError?.message,
    documentsError: docGenQuery.documentsError?.message,
    
    // Document generation actions
    generateDocument: docGenQuery.generateDocument,
    regenerateDocument: docGenQuery.regenerateDocument,
    selectDocument: docGenQuery.selectDocument,
    deleteDocument: docGenQuery.deleteDocument,
    refetchTemplates: docGenQuery.refetchTemplates,
    refetchDocuments: docGenQuery.refetchDocuments,
    getDocument: docGenQuery.getDocument,
    downloadDocument: docGenQuery.downloadDocument,
    
    // Mutation states
    isGenerating: docGenQuery.isGenerating,
    isRegenerating: docGenQuery.isRegenerating,
    isSelecting: docGenQuery.isSelecting,
    isDeleting: docGenQuery.isDeleting,
  };
};
