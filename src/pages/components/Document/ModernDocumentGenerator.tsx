
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Bot, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Wand2,
  Download,
  Eye
} from "lucide-react";
import { useDocumentGenerationStore } from '@/store/useDocumentGenerationStore';
import { useChatAgents } from '@/hooks/useChatAgents';
import { useToast } from '@/hooks/use-toast';

const GENERATION_STEPS = [
  { id: 1, title: 'Choose Template', description: 'Select a document template' },
  { id: 2, title: 'Select AI Agent', description: 'Pick an AI writing assistant' },
  { id: 3, title: 'Fill Details', description: 'Provide content details' },
  { id: 4, title: 'Generate', description: 'Create your document' }
];

export const ModernDocumentGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const { agents } = useChatAgents();
  
  const {
    templates,
    selectedTemplate,
    selectedAgent,
    generatedContent,
    isGenerating,
    generationProgress,
    loading,
    error,
    fetchTemplates,
    setSelectedTemplate,
    setSelectedAgent,
    updateFieldValue,
    generateDocument,
    clearError
  } = useDocumentGenerationStore();

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleNextStep = () => {
    if (currentStep < GENERATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    await generateDocument();
    toast({
      title: "Document Generated!",
      description: "Your document has been created successfully",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedTemplate !== null;
      case 2: return selectedAgent !== null;
      case 3: return selectedTemplate?.fields.every(field => !field.required || field.value);
      case 4: return true;
      default: return false;
    }
  };

  const progressPercentage = (currentStep / GENERATION_STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Document Generator</h1>
        <p className="text-gray-600">Create professional documents with AI assistance</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-4">
        <Progress value={progressPercentage} className="w-full" />
        <div className="flex justify-between text-sm">
          {GENERATION_STEPS.map((step, index) => (
            <div 
              key={step.id}
              className={`flex items-center gap-2 ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep > step.id 
                  ? 'bg-green-500 text-white' 
                  : currentStep === step.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
              }`}>
                {currentStep > step.id ? <Check className="h-3 w-3" /> : step.id}
              </div>
              <div className="hidden sm:block">
                <div className="font-medium">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            {GENERATION_STEPS[currentStep - 1]?.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Choose Template */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select a Document Template</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading templates...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                            <Badge variant="secondary" className="mt-1">
                              {template.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Agent */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose Your AI Writing Assistant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <Card 
                    key={agent.id}
                    className={`cursor-pointer transition-all ${
                      selectedAgent?.id === agent.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{agent.icon}</div>
                        <div>
                          <h4 className="font-semibold">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.description}</p>
                          <Badge variant="secondary" className={agent.color}>
                            {agent.personality}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Fill Details */}
          {currentStep === 3 && selectedTemplate && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fill in Template Details</h3>
              <div className="space-y-4">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        value={field.value || ''}
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={field.value || ''}
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Generate */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Ready to Generate</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Template:</strong> {selectedTemplate?.name}</p>
                  <p><strong>AI Agent:</strong> {selectedAgent?.name}</p>
                  <p><strong>Fields:</strong> {selectedTemplate?.fields.length} completed</p>
                </div>
                
                {!generatedContent && !isGenerating && (
                  <Button 
                    onClick={handleGenerate}
                    size="lg"
                    className="w-full max-w-md"
                  >
                    <Wand2 className="h-5 w-5 mr-2" />
                    Generate Document
                  </Button>
                )}

                {/* Generation Progress */}
                {isGenerating && generationProgress && (
                  <div className="space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <div>
                      <p className="font-medium">{generationProgress.currentTask}</p>
                      <Progress 
                        value={(generationProgress.step / generationProgress.totalSteps) * 100} 
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Step {generationProgress.step} of {generationProgress.totalSteps}
                      </p>
                    </div>
                  </div>
                )}

                {/* Generated Content */}
                {generatedContent && !isGenerating && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Document Generated Successfully!</span>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={currentStep === 4 ? handleGenerate : handleNextStep}
          disabled={!canProceed() || isGenerating}
        >
          {currentStep === 4 ? (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
