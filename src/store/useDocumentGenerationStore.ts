
import { create } from 'zustand';
import { Template } from '@/types';

/**
 * UI-only state for document generation (no server data)
 */
interface DocumentGenerationUIState {
  // UI State
  selectedTemplate: Template | null;
  formData: Record<string, any>;
  showPreview: boolean;
  selectedDocumentId: string | null;
  
  // UI Actions
  setSelectedTemplate: (template: Template | null) => void;
  updateFormData: (field: string, value: any) => void;
  resetFormData: () => void;
  setShowPreview: (show: boolean) => void;
  setSelectedDocumentId: (id: string | null) => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationUIState>((set) => ({
  // Initial UI state
  selectedTemplate: null,
  formData: {},
  showPreview: false,
  selectedDocumentId: null,

  // UI Actions
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  updateFormData: (field, value) => set((state) => ({ 
    formData: { ...state.formData, [field]: value } 
  })),
  resetFormData: () => set({ formData: {} }),
  setShowPreview: (show) => set({ showPreview: show }),
  setSelectedDocumentId: (id) => set({ selectedDocumentId: id }),
}));
