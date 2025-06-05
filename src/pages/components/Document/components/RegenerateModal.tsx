
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDocumentGenerationQuery } from '@/hooks/queries/useDocumentGenerationQuery';
import { RotateCcw, Loader2 } from 'lucide-react';

interface RegenerateModalProps {
  documentId: string | null;
  onClose: () => void;
}

export const RegenerateModal = ({ documentId, onClose }: RegenerateModalProps) => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');

  const { 
    generatedDocuments,
    regenerateDocument,
    isRegenerating 
  } = useDocumentGenerationQuery();

  const document = documentId ? generatedDocuments.find(doc => doc.id === documentId) : null;

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setPurpose(document.purpose);
      setInstructions(document.instructions || '');
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document || !title.trim() || !purpose.trim()) return;

    regenerateDocument({
      documentId: document.id,
      data: {
        title: title.trim(),
        purpose: purpose.trim(),
        instructions: instructions.trim(),
        templateId: document.templateId
      }
    });

    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={!!documentId} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Regenerate Document
          </DialogTitle>
        </DialogHeader>
        
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

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isRegenerating || !title.trim() || !purpose.trim()}
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate Document
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
