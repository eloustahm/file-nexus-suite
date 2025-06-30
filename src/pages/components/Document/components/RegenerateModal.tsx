import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDocumentGeneration } from '@/hooks/useDocumentGeneration';
import { RotateCcw, Loader2 } from 'lucide-react';

interface RegenerateModalProps {
  documentId: string | null;
  onClose: () => void;
}

export const RegenerateModal = ({ documentId, onClose }: RegenerateModalProps) => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const { 
    documents,
    templates, 
    isRegenerating, 
    regenerateDocument,
    documentsError 
  } = useDocumentGeneration();

  const document = documentId ? documents.find(doc => doc.id === documentId) : null;

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setPurpose(document.purpose);
      setInstructions(document.instructions || '');
      setSelectedTemplate(document.templateId || '');
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document || !title.trim() || !purpose.trim()) return;

    await regenerateDocument(document.id, {
      title: title.trim(),
      purpose: purpose.trim(),
      instructions: instructions.trim(),
      templateId: selectedTemplate || undefined
    });

    if (!documentsError) {
      onClose();
    }
  };

  if (!document) return null;

  return (
    <Dialog open={!!documentId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Regenerate Document
          </DialogTitle>
        </DialogHeader>
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isRegenerating}>
              {isRegenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
