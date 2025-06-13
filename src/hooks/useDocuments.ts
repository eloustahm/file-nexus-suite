
import { useDocumentsQuery } from '@/hooks/queries/useDocumentsQuery';
import { useDocumentsUI } from '@/hooks/useDocumentsUI';
import { useMemo } from 'react';

interface UseDocumentsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  folderId?: string;
}

/**
 * Combined hook that provides both UI state and server data for documents
 */
export const useDocuments = (params: UseDocumentsParams = {}) => {
  const documentsQuery = useDocumentsQuery(params);
  const documentsUI = useDocumentsUI();

  // Apply client-side filtering based on UI state
  const filteredDocuments = useMemo(() => {
    let filtered = documentsQuery.documents;

    // Apply search filter
    if (documentsUI.searchQuery) {
      const query = documentsUI.searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (documentsUI.statusFilter.length > 0) {
      filtered = filtered.filter(doc => documentsUI.statusFilter.includes(doc.status));
    }

    // Apply type filter
    if (documentsUI.typeFilter.length > 0) {
      filtered = filtered.filter(doc => documentsUI.typeFilter.includes(doc.type));
    }

    return filtered;
  }, [documentsQuery.documents, documentsUI.searchQuery, documentsUI.statusFilter, documentsUI.typeFilter]);

  return {
    // Server data with client-side filtering
    documents: documentsQuery.documents,
    filteredDocuments,
    total: documentsQuery.total,
    page: documentsQuery.page,
    totalPages: documentsQuery.totalPages,
    
    // Server state
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error?.message,
    
    // Document actions
    createDocument: documentsQuery.createDocument,
    uploadDocument: documentsQuery.uploadDocument,
    updateDocument: documentsQuery.updateDocument,
    deleteDocument: documentsQuery.deleteDocument,
    shareDocument: documentsQuery.shareDocument,
    downloadDocument: documentsQuery.downloadDocument,
    refetch: documentsQuery.refetch,
    getDocument: documentsQuery.getDocument,
    
    // Mutation states
    isCreating: documentsQuery.isCreating,
    isUploading: documentsQuery.isUploading,
    isUpdating: documentsQuery.isUpdating,
    isDeleting: documentsQuery.isDeleting,
    isSharing: documentsQuery.isSharing,
    isDownloading: documentsQuery.isDownloading,
    
    // Errors
    createError: documentsQuery.createError?.message,
    uploadError: documentsQuery.uploadError?.message,
    updateError: documentsQuery.updateError?.message,
    deleteError: documentsQuery.deleteError?.message,
    shareError: documentsQuery.shareError?.message,
    downloadError: documentsQuery.downloadError?.message,
    
    // UI state
    searchQuery: documentsUI.searchQuery,
    viewMode: documentsUI.viewMode,
    selectedDocumentIds: documentsUI.selectedDocumentIds,
    statusFilter: documentsUI.statusFilter,
    typeFilter: documentsUI.typeFilter,
    sortBy: documentsUI.sortBy,
    sortOrder: documentsUI.sortOrder,
    showUploadModal: documentsUI.showUploadModal,
    showShareModal: documentsUI.showShareModal,
    showDeleteConfirm: documentsUI.showDeleteConfirm,
    
    // UI actions
    setSearchQuery: documentsUI.setSearchQuery,
    setViewMode: documentsUI.setViewMode,
    setSelectedDocumentIds: documentsUI.setSelectedDocumentIds,
    toggleDocumentSelection: documentsUI.toggleDocumentSelection,
    setStatusFilter: documentsUI.setStatusFilter,
    setTypeFilter: documentsUI.setTypeFilter,
    setSorting: documentsUI.setSorting,
    setShowUploadModal: documentsUI.setShowUploadModal,
    setShowShareModal: documentsUI.setShowShareModal,
    setShowDeleteConfirm: documentsUI.setShowDeleteConfirm,
    clearFilters: documentsUI.clearFilters,
    clearSelections: documentsUI.clearSelections,
  };
};
