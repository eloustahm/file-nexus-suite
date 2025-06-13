import { useDocumentsQuery } from '@/hooks/queries/useDocumentsQuery';
import { useDocumentsUI } from '@/hooks/useDocumentsUI';
import { useMemo } from 'react';

/**
 * Combined hook that provides both UI state and server data for documents
 */
export const useDocuments = () => {
  const documentsQuery = useDocumentsQuery();
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

    // Apply tag filters
    if (documentsUI.filterTags.length > 0) {
      filtered = filtered.filter(doc =>
        documentsUI.filterTags.some(tag => doc.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (documentsUI.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        default:
          return 0;
      }

      if (documentsUI.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [documentsQuery.documents, documentsUI.searchQuery, documentsUI.filterTags, documentsUI.sortBy, documentsUI.sortOrder]);

  return {
    // Server data with client-side filtering
    documents: documentsQuery.documents,
    filteredDocuments,
    
    // Server state
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error?.message,
    
    // Document actions
    createDocument: documentsQuery.createDocument,
    uploadDocument: documentsQuery.uploadDocument,
    updateDocument: documentsQuery.updateDocument,
    deleteDocument: documentsQuery.deleteDocument,
    shareDocument: documentsQuery.shareDocument,
    refetch: documentsQuery.refetch,
    
    // Mutation states
    isCreating: documentsQuery.isCreating,
    isUploading: documentsQuery.isUploading,
    isUpdating: documentsQuery.isUpdating,
    isDeleting: documentsQuery.isDeleting,
    isSharing: documentsQuery.isSharing,
    
    // UI state
    searchQuery: documentsUI.searchQuery,
    selectedDocumentIds: documentsUI.selectedDocumentIds,
    viewMode: documentsUI.viewMode,
    sortBy: documentsUI.sortBy,
    sortOrder: documentsUI.sortOrder,
    filterTags: documentsUI.filterTags,
    showUploadModal: documentsUI.showUploadModal,
    showDeleteConfirm: documentsUI.showDeleteConfirm,
    
    // UI actions
    setSearchQuery: documentsUI.setSearchQuery,
    setSelectedDocuments: documentsUI.setSelectedDocumentIds,
    toggleDocumentSelection: documentsUI.toggleDocumentSelection,
    setViewMode: documentsUI.setViewMode,
    setSorting: documentsUI.setSorting,
    setFilterTags: documentsUI.setFilterTags,
    setShowUploadModal: documentsUI.setShowUploadModal,
    setShowDeleteConfirm: documentsUI.setShowDeleteConfirm,
    clearFilters: documentsUI.clearFilters,
  };
};
