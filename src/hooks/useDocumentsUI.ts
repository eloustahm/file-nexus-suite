
import { useState } from 'react';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'type' | 'size' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

/**
 * UI-only state for documents (no server data)
 */
export const useDocumentsUI = () => {
  // Search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  
  // Modal and dialog UI state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const toggleDocumentSelection = (id: string) => {
    setSelectedDocumentIds(prev => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter(docId => docId !== id)
        : [...prev, id];
    });
  };

  const setSorting = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setTypeFilter([]);
  };

  const clearSelections = () => {
    setSelectedDocumentIds([]);
  };

  const resetGenerationState = () => {
    setShowGenerateModal(false);
    setShowRegenerateModal(false);
    setSelectedTemplate(null);
  };

  return {
    // UI state
    searchQuery,
    selectedDocumentIds,
    viewMode,
    sortBy,
    sortOrder,
    statusFilter,
    typeFilter,
    showUploadModal,
    showShareModal,
    showDeleteConfirm,
    showGenerateModal,
    showRegenerateModal,
    selectedTemplate,

    // UI actions
    setSearchQuery,
    setSelectedDocumentIds,
    toggleDocumentSelection,
    setViewMode,
    setSorting,
    setStatusFilter,
    setTypeFilter,
    setShowUploadModal,
    setShowShareModal,
    setShowDeleteConfirm,
    setShowGenerateModal,
    setShowRegenerateModal,
    setSelectedTemplate,
    clearFilters,
    clearSelections,
    resetGenerationState,
  };
};
