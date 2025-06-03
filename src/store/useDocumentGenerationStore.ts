import { create } from 'zustand';
import { aiApi } from '@/services/api';

interface GeneratedDocument {
  id: string;
  title: string;
  content: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentGenerationState {
  generatedDocuments: GeneratedDocument[];
  isGenerating: boolean;
  error: string | null;
  generateDocument: (templateId: string, data: Record<string, any>) => Promise<GeneratedDocument | undefined>;
  clearError: () => void;
}

export const useDocumentGenerationStore = create<DocumentGenerationState>((set, get) => ({
  generatedDocuments: [],
  isGenerating: false,
  error: null,

  generateDocument: async (templateId: string, data: Record<string, any>) => {
    try {
      set({ isGenerating: true, error: null });
      
      const response = await aiApi.generateDocument(templateId, data);
      
      const newDocument = {
        id: Date.now().toString(),
        title: `Generated Document - ${new Date().toLocaleDateString()}`,
        content: response?.content || 'Document generation failed',
        templateId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      set((state) => ({
        generatedDocuments: [...state.generatedDocuments, newDocument],
        isGenerating: false
      }));

      return newDocument;
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to generate document';
      set({ error: errorMessage, isGenerating: false });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null })
}));
