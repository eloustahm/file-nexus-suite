
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wand2, Loader2 } from 'lucide-react';
import { useDocumentGenerationQuery } from '@/hooks/queries/useDocumentGenerationQuery';
import { useDocumentGenerationStore } from '@/store/useDocumentGenerationStore';

export const GenerateDocumentForm = () => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');

  const { generateDocument, isGenerating } = useDocumentGenerationQuery();
  const { selectedTemplate, formData, resetFormData } = useDocumentGenerationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !purpose.trim()) return;

    generateDocument({
      title: title.trim(),
      purpose: purpose.trim(),
      instructions: instructions.trim(),
      templateId: selectedTemplate?.id,
      formData
    });

    // Clear form on success
    setTitle('');
    setPurpose('');
    setInstructions('');
    resetFormData();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Generate New Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose/Intent *</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What is this document for?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Provide specific instructions or requirements..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isGenerating || !title.trim() || !purpose.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Document...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
