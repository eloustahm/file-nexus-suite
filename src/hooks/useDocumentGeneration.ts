
import { useState } from 'react';
import { Template, GeneratedDocument, DocumentFormData } from '@/types';

// Mock templates data
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Business Proposal',
    description: 'Professional business proposal template',
    category: 'Business',
    content: 'Executive Summary\n\n[Your executive summary here]\n\nProject Overview\n\n[Project details]',
    fields: [
      { id: '1', name: 'title', label: 'Title', type: 'text', required: true, value: '' },
      { id: '2', name: 'company', label: 'Company', type: 'text', required: true, value: '' }
    ]
  },
  {
    id: '2',
    name: 'Technical Report',
    description: 'Detailed technical documentation template',
    category: 'Technical',
    content: 'Technical Overview\n\n[Technical details here]\n\nImplementation\n\n[Implementation details]',
    fields: [
      { id: '1', name: 'title', label: 'Title', type: 'text', required: true, value: '' },
      { id: '2', name: 'technology', label: 'Technology Stack', type: 'text', required: true, value: '' }
    ]
  },
  {
    id: '3',
    name: 'Marketing Plan',
    description: 'Comprehensive marketing strategy template',
    category: 'Marketing',
    content: 'Market Analysis\n\n[Market research findings]\n\nStrategy\n\n[Marketing strategy details]',
    fields: [
      { id: '1', name: 'title', label: 'Title', type: 'text', required: true, value: '' },
      { id: '2', name: 'target', label: 'Target Audience', type: 'text', required: true, value: '' }
    ]
  },
  {
    id: '4',
    name: 'Meeting Minutes',
    description: 'Professional meeting minutes template',
    category: 'Administrative',
    content: 'Meeting Details\n\nDate: [Date]\nAttendees: [List of attendees]\n\nAgenda Items\n\n[Agenda items and discussions]',
    fields: [
      { id: '1', name: 'meetingTitle', label: 'Meeting Title', type: 'text', required: true, value: '' },
      { id: '2', name: 'date', label: 'Date', type: 'date', required: true, value: '' }
    ]
  },
  {
    id: '5',
    name: 'Project Charter',
    description: 'Project initiation document template',
    category: 'Project Management',
    content: 'Project Overview\n\n[Project description]\n\nObjectives\n\n[Project objectives]\n\nScope\n\n[Project scope]',
    fields: [
      { id: '1', name: 'projectName', label: 'Project Name', type: 'text', required: true, value: '' },
      { id: '2', name: 'manager', label: 'Project Manager', type: 'text', required: true, value: '' }
    ]
  },
  {
    id: '6',
    name: 'User Story',
    description: 'Agile user story template',
    category: 'Development',
    content: 'As a [user type], I want [functionality] so that [benefit].\n\nAcceptance Criteria:\n- [Criteria 1]\n- [Criteria 2]',
    fields: [
      { id: '1', name: 'userType', label: 'User Type', type: 'text', required: true, value: '' },
      { id: '2', name: 'functionality', label: 'Functionality', type: 'textarea', required: true, value: '' }
    ]
  },
  {
    id: '7',
    name: 'Contract Agreement',
    description: 'Basic contract template',
    category: 'Legal',
    content: 'AGREEMENT\n\nThis agreement is between [Party A] and [Party B].\n\nTerms:\n\n[Contract terms]',
    fields: [
      { id: '1', name: 'partyA', label: 'Party A', type: 'text', required: true, value: '' },
      { id: '2', name: 'partyB', label: 'Party B', type: 'text', required: true, value: '' }
    ]
  },
  {
    id: '8',
    name: 'Research Paper',
    description: 'Academic research paper template',
    category: 'Academic',
    content: 'Abstract\n\n[Research abstract]\n\nIntroduction\n\n[Introduction]\n\nMethodology\n\n[Research methodology]',
    fields: [
      { id: '1', name: 'title', label: 'Paper Title', type: 'text', required: true, value: '' },
      { id: '2', name: 'author', label: 'Author', type: 'text', required: true, value: '' }
    ]
  }
];

export const useDocumentGeneration = () => {
  const [templates] = useState<Template[]>(mockTemplates);
  const [documents, setDocuments] = useState<GeneratedDocument[]>([]);
  const [isLoadingTemplates] = useState(false);
  const [isLoadingDocuments] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [templatesError] = useState('');
  const [documentsError] = useState('');

  const generateDocument = async (data: DocumentFormData) => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = templates.find(t => t.id === data.templateId);
      const newDocument: GeneratedDocument = {
        id: Date.now().toString(),
        title: data.title,
        content: template?.content || `Generated content for: ${data.title}\n\nPurpose: ${data.purpose}\n\nInstructions: ${data.instructions || 'None provided'}`,
        templateId: data.templateId,
        purpose: data.purpose,
        instructions: data.instructions,
        status: 'completed',
        createdAt: new Date().toISOString(),
        wordCount: 250
      };
      
      setDocuments(prev => [...prev, newDocument]);
      return newDocument;
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateDocument = async (documentId: string, data: DocumentFormData) => {
    setIsRegenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = templates.find(t => t.id === data.templateId);
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { 
              ...doc, 
              title: data.title,
              content: template?.content || `Regenerated content for: ${data.title}\n\nPurpose: ${data.purpose}\n\nInstructions: ${data.instructions || 'None provided'}`,
              purpose: data.purpose,
              instructions: data.instructions,
              updatedAt: new Date().toISOString()
            }
          : doc
      ));
    } finally {
      setIsRegenerating(false);
    }
  };

  const downloadDocument = async (documentId: string): Promise<Blob> => {
    const document = documents.find(d => d.id === documentId);
    if (!document) throw new Error('Document not found');
    
    return new Blob([document.content], { type: 'text/plain' });
  };

  const deleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const refetchTemplates = () => {
    // Mock refetch
    return Promise.resolve();
  };

  const refetchDocuments = () => {
    // Mock refetch
    return Promise.resolve();
  };

  const resetGenerationState = () => {
    setIsGenerating(false);
    setIsRegenerating(false);
  };

  return {
    templates,
    documents,
    isLoadingTemplates,
    isLoadingDocuments,
    isGenerating,
    isRegenerating,
    templatesError,
    documentsError,
    generateDocument,
    regenerateDocument,
    downloadDocument,
    deleteDocument,
    refetchTemplates,
    refetchDocuments,
    resetGenerationState
  };
};
