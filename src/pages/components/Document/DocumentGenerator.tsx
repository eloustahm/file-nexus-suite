
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDocumentGenerationStore } from '@/store/useDocumentGenerationStore';
import { useChatAgents } from '@/hooks/useChatAgents';
import { AgentSelector } from "@/pages/components/Document/components/AgentSelector";
import { TemplateSelector } from "@/pages/components/Document/components/TemplateSelector";
import { DocumentPreview } from "@/pages/components/Document/components/DocumentPreview";

export const DocumentGenerator = () => {
  const { agents } = useChatAgents();
  
  const {
    templates,
    selectedTemplate,
    selectedAgent,
    generatedContent,
    isGenerating,
    isEditing,
    editedContent,
    loading,
    error,
    fetchTemplates,
    setSelectedTemplate,
    setSelectedAgent,
    updateFieldValue,
    addCustomField,
    removeField,
    generateDocument,
    setEditMode,
    updateEditedContent,
    clearError
  } = useDocumentGenerationStore();

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleGenerateDocument = async () => {
    await generateDocument();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      updateEditedContent(editedContent);
    }
    setEditMode(!isEditing);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleRefreshContent = () => {
    generateDocument();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AI Document Generator</h1>
        <p className="text-gray-500">
          Generate professional documents quickly using AI-powered templates.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select AI Agent</CardTitle>
              <CardDescription>
                Choose an AI agent specialized for your document type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgentSelector
                agents={agents}
                selectedAgent={selectedAgent}
                onAgentChange={setSelectedAgent}
              />
            </CardContent>
          </Card>

          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
          />

          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Template Fields</CardTitle>
                <CardDescription>
                  Fill in the template fields to customize your document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTemplate.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-sm font-medium">{field.label}</label>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full p-2 border rounded-md"
                        required={field.required}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={handleGenerateDocument}
            disabled={!selectedTemplate || !selectedAgent || isGenerating || loading}
            className="w-full"
          >
            {isGenerating ? 'Generating Document...' : 'Generate Document'}
          </Button>
        </div>

        <div className="lg:col-span-1">
          <DocumentPreview
            generatedContent={generatedContent}
            isEditing={isEditing}
            editedContent={editedContent}
            onEditedContentChange={updateEditedContent}
            onEditToggle={handleEditToggle}
            onCopy={handleCopyContent}
            onRefresh={handleRefreshContent}
          />
        </div>
      </div>
    </div>
  );
};
