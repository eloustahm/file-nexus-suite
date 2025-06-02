
import { useState, useEffect } from "react";
import { AgentSelector } from "./components/AgentSelector";
import { TemplateSelector } from "./components/TemplateSelector";
import { TemplateFieldEditor } from "./components/TemplateFieldEditor";
import { DocumentPreview } from "./components/DocumentPreview";
import { useDocumentGeneration } from "./hooks/useDocumentGeneration";
import { agents, templates } from "./data/templates";

export const DocumentGenerator = () => {
  const {
    selectedTemplate,
    setSelectedTemplate,
    selectedAgent,
    setSelectedAgent,
    isGenerating,
    generatedContent,
    isEditing,
    editedContent,
    setEditedContent,
    updateFieldValue,
    addCustomField,
    removeField,
    generateDocument,
    handleEditToggle,
    handleCopyContent,
    handleRefreshContent
  } = useDocumentGeneration();

  // Initialize with default agent
  useEffect(() => {
    if (!selectedAgent) {
      setSelectedAgent(agents[0]);
    }
  }, [selectedAgent, setSelectedAgent]);

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Template Selection */}
      <div className="w-80 space-y-4">
        <AgentSelector
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
        />

        <TemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateSelect={setSelectedTemplate}
        />
      </div>

      {/* Template Editor */}
      <div className="flex-1 flex gap-6">
        <TemplateFieldEditor
          selectedTemplate={selectedTemplate}
          selectedAgent={selectedAgent}
          isGenerating={isGenerating}
          onFieldUpdate={updateFieldValue}
          onFieldAdd={addCustomField}
          onFieldRemove={removeField}
          onGenerate={generateDocument}
        />

        {/* Preview & Edit Panel */}
        <DocumentPreview
          generatedContent={generatedContent}
          isEditing={isEditing}
          editedContent={editedContent}
          onEditedContentChange={setEditedContent}
          onEditToggle={handleEditToggle}
          onCopy={handleCopyContent}
          onRefresh={handleRefreshContent}
        />
      </div>
    </div>
  );
};
