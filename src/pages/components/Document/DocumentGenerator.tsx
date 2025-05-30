
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wand2, 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Trash2,
  Copy
} from "lucide-react";

interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type: 'text' | 'textarea' | 'date' | 'number';
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
}

export const DocumentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const templates: DocumentTemplate[] = [
    {
      id: '1',
      name: 'Business Contract',
      description: 'Professional service agreement template',
      type: 'Contract',
      fields: [
        { id: 'client_name', label: 'Client Name', placeholder: 'Enter client name', value: '', type: 'text' },
        { id: 'service_description', label: 'Service Description', placeholder: 'Describe the services', value: '', type: 'textarea' },
        { id: 'contract_date', label: 'Contract Date', placeholder: 'Select date', value: '', type: 'date' },
        { id: 'amount', label: 'Contract Amount', placeholder: 'Enter amount', value: '', type: 'number' },
      ]
    },
    {
      id: '2',
      name: 'Project Report',
      description: 'Comprehensive project status report',
      type: 'Report',
      fields: [
        { id: 'project_name', label: 'Project Name', placeholder: 'Enter project name', value: '', type: 'text' },
        { id: 'project_manager', label: 'Project Manager', placeholder: 'Enter manager name', value: '', type: 'text' },
        { id: 'status_summary', label: 'Status Summary', placeholder: 'Describe current status', value: '', type: 'textarea' },
        { id: 'completion_percentage', label: 'Completion %', placeholder: 'Enter percentage', value: '', type: 'number' },
      ]
    },
    {
      id: '3',
      name: 'Meeting Minutes',
      description: 'Professional meeting notes template',
      type: 'Minutes',
      fields: [
        { id: 'meeting_title', label: 'Meeting Title', placeholder: 'Enter meeting title', value: '', type: 'text' },
        { id: 'attendees', label: 'Attendees', placeholder: 'List attendees', value: '', type: 'textarea' },
        { id: 'meeting_date', label: 'Meeting Date', placeholder: 'Select date', value: '', type: 'date' },
        { id: 'action_items', label: 'Action Items', placeholder: 'List action items', value: '', type: 'textarea' },
      ]
    }
  ];

  const updateFieldValue = (fieldId: string, value: string) => {
    if (!selectedTemplate) return;
    
    const updatedTemplate = {
      ...selectedTemplate,
      fields: selectedTemplate.fields.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    };
    setSelectedTemplate(updatedTemplate);
  };

  const generateDocument = () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      let content = `# ${selectedTemplate.name}\n\n`;
      
      selectedTemplate.fields.forEach(field => {
        if (field.value) {
          content += `**${field.label}:** ${field.value}\n\n`;
        }
      });
      
      content += `\n---\n\nGenerated on: ${new Date().toLocaleDateString()}\n`;
      content += `Template: ${selectedTemplate.name}\n`;
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const addCustomField = () => {
    if (!selectedTemplate) return;
    
    const newField: TemplateField = {
      id: `custom_${Date.now()}`,
      label: 'Custom Field',
      placeholder: 'Enter value',
      value: '',
      type: 'text'
    };
    
    setSelectedTemplate({
      ...selectedTemplate,
      fields: [...selectedTemplate.fields, newField]
    });
  };

  const removeField = (fieldId: string) => {
    if (!selectedTemplate) return;
    
    setSelectedTemplate({
      ...selectedTemplate,
      fields: selectedTemplate.fields.filter(field => field.id !== fieldId)
    });
  };

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Template Selection */}
      <div className="w-80">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Document Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate?.id === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTemplate({ ...template, fields: template.fields.map(f => ({ ...f, value: '' })) })}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{template.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {template.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Template Editor */}
      <div className="flex-1 flex gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Template Editor
                {selectedTemplate && (
                  <Badge variant="secondary">{selectedTemplate.name}</Badge>
                )}
              </div>
              {selectedTemplate && (
                <Button variant="outline" size="sm" onClick={addCustomField}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
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
                          onClick={() => removeField(field.id)}
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
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                
                <Separator className="my-6" />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={generateDocument} 
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Document'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Panel */}
        {generatedContent && (
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="bg-white border rounded-lg p-4 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-900">
                  {generatedContent}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
