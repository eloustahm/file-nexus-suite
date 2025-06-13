import React, { useState, useEffect } from 'react';
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { GenerateDocumentForm } from './components/GenerateDocumentForm';
import { GeneratedDocumentsList } from './components/GeneratedDocumentsList';
import { DocumentPreviewer } from './components/DocumentPreviewer';
import { RegenerateModal } from './components/RegenerateModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, FileText } from 'lucide-react';

export const ModernGenerateDocument = () => {
  const [previewDocumentId, setPreviewDocumentId] = useState<string | null>(null);
  const [regenerateDocumentId, setRegenerateDocumentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('generate');

  const { refetchTemplates, refetchDocuments } = useDocumentGeneration();

  useEffect(() => {
    refetchTemplates();
    refetchDocuments();
  }, [refetchTemplates, refetchDocuments]);

  const handlePreviewDocument = (documentId: string) => {
    setPreviewDocumentId(documentId);
  };

  const handleClosePreview = () => {
    setPreviewDocumentId(null);
  };

  const handleRegenerate = (documentId: string) => {
    setPreviewDocumentId(null);
    setRegenerateDocumentId(documentId);
  };

  const handleCloseRegenerate = () => {
    setRegenerateDocumentId(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Document Generator</h1>
        <p className="text-gray-500">
          Create professional documents with AI assistance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Generate Document
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generated Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="mt-6">
          <GenerateDocumentForm />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <GeneratedDocumentsList onPreviewDocument={handlePreviewDocument} />
        </TabsContent>
      </Tabs>

      <DocumentPreviewer
        document={previewDocumentId}
        onClose={handleClosePreview}
        onRegenerate={handleRegenerate}
      />

      <RegenerateModal
        documentId={regenerateDocumentId}
        onClose={handleCloseRegenerate}
      />
    </div>
  );
};
