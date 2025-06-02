
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Plus, Trash2, Sparkles, FileText } from "lucide-react";
import { DocumentTemplate, TemplateField, NewFieldData } from '../types/generatorTypes';
import { Agent } from '../types/chatTypes';

interface TemplateFieldEditorProps {
  selectedTemplate: DocumentTemplate | null;
  selectedAgent: Agent | null;
  isGenerating: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
  onFieldAdd: (field: TemplateField) => void;
  onFieldRemove: (fieldId: string) => void;
  onGenerate: () => void;
}

export const TemplateFieldEditor = ({
  selectedTemplate,
  selectedAgent,
  isGenerating,
  onFieldUpdate,
  onFieldAdd,
  onFieldRemove,
  onGenerate
}: TemplateFieldEditorProps) => {
  const [showFieldDialog, setShowFieldDialog] = useState(false);
  const [newField, setNewField] = useState<NewFieldData>({ 
    label: '', 
    type: 'text', 
    placeholder: '', 
    options: '' 
  });

  const addCustomField = () => {
    if (!selectedTemplate || !newField.label.trim()) return;
    
    const customField: TemplateField = {
      id: `custom_${Date.now()}`,
      label: newField.label,
      placeholder: newField.placeholder || `Enter ${newField.label.toLowerCase()}`,
      value: '',
      type: newField.type as 'text' | 'textarea' | 'date' | 'number' | 'select',
      options: newField.type === 'select' ? newField.options.split(',').map(opt => opt.trim()) : undefined
    };
    
    onFieldAdd(customField);
    setNewField({ label: '', type: 'text', placeholder: '', options: '' });
    setShowFieldDialog(false);
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Template Editor
            {selectedTemplate && (
              <Badge variant="secondary">{selectedTemplate.name}</Badge>
            )}
            {selectedAgent && (
              <Badge variant="outline" className={selectedAgent.color}>
                {selectedAgent.icon} {selectedAgent.name}
              </Badge>
            )}
          </div>
          {selectedTemplate && (
            <Dialog open={showFieldDialog} onOpenChange={setShowFieldDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Field</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Field Label</label>
                    <Input
                      value={newField.label}
                      onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="Enter field label"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Field Type</label>
                    <Select value={newField.type} onValueChange={(value) => setNewField(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Placeholder</label>
                    <Input
                      value={newField.placeholder}
                      onChange={(e) => setNewField(prev => ({ ...prev, placeholder: e.target.value }))}
                      placeholder="Enter placeholder text"
                    />
                  </div>
                  {newField.type === 'select' && (
                    <div>
                      <label className="text-sm font-medium">Options (comma-separated)</label>
                      <Input
                        value={newField.options}
                        onChange={(e) => setNewField(prev => ({ ...prev, options: e.target.value }))}
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={addCustomField} className="flex-1">Add Field</Button>
                    <Button variant="outline" onClick={() => setShowFieldDialog(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {!selectedTemplate ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Template</h3>
            <p className="text-gray-600">Choose a document template to start generating your document</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTemplate.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.id.startsWith('custom_') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFieldRemove(field.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {field.type === 'textarea' ? (
                  <Textarea
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => onFieldUpdate(field.id, e.target.value)}
                    className="min-h-[100px]"
                  />
                ) : field.type === 'select' && field.options ? (
                  <Select value={field.value} onValueChange={(value) => onFieldUpdate(field.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => onFieldUpdate(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
            
            <Separator className="my-6" />
            
            <div className="flex gap-3">
              <Button 
                onClick={onGenerate} 
                disabled={isGenerating || !selectedAgent}
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Document'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
