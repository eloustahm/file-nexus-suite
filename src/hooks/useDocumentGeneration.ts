import { useDocumentGenerationQuery } from '@/hooks/queries/useDocumentGenerationQuery';
import { useDocumentsUI } from '@/hooks/useDocumentsUI';

/**
 * Combined hook that provides server data for document generation
 */
export const useDocumentGeneration = () => {
  const docGenQuery = useDocumentGenerationQuery();
  const documentsUI = useDocumentsUI();

  return {
    // Server data
    templates: docGenQuery.templates,
    documents: docGenQuery.documents,
    
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
    isGeneratingDocument: docGenQuery.isGeneratingDocument,
    isRegeneratingDocument: docGenQuery.isRegeneratingDocument,
    isSelectingDocument: docGenQuery.isSelectingDocument,
    isDeletingDocument: docGenQuery.isDeletingDocument,
    isDownloadingDocument: docGenQuery.isDownloadingDocument,

    // UI state
    showGenerateModal: documentsUI.showGenerateModal,
    showRegenerateModal: documentsUI.showRegenerateModal,
    selectedTemplate: documentsUI.selectedTemplate,
    setShowGenerateModal: documentsUI.setShowGenerateModal,
    setShowRegenerateModal: documentsUI.setShowRegenerateModal,
    setSelectedTemplate: documentsUI.setSelectedTemplate,
    resetGenerationState: documentsUI.resetGenerationState,
  };
};
