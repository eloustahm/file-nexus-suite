import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { Wand2, Loader2 } from 'lucide-react';

export const GenerateDocumentForm = () => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const { 
    templates, 
    isGenerating, 
    generateDocument,
    documentsError 
  } = useDocumentGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !purpose.trim()) return;

    await generateDocument({
      title: title.trim(),
      purpose: purpose.trim(),
      instructions: instructions.trim(),
      templateId: selectedTemplate || undefined
    });

    // Clear form on success
    if (!documentsError) {
      setTitle('');
      setPurpose('');
      setInstructions('');
      setSelectedTemplate('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Generate New Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What is the purpose of this document?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter any specific instructions or requirements"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
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
