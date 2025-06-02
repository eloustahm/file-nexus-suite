
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Wand2, 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Trash2,
  Copy,
  Settings,
  Brain,
  Sparkles,
  Save,
  RefreshCw
} from "lucide-react";

interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  options?: string[];
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
}

interface Agent {
  id: string;
  name: string;
  personality: string;
  description: string;
  icon: string;
  color: string;
}

export const DocumentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showFieldDialog, setShowFieldDialog] = useState(false);
  const [newField, setNewField] = useState({ label: '', type: 'text', placeholder: '', options: '' });

  const agents: Agent[] = [
    {
      id: 'professional',
      name: 'Professional Writer',
      personality: 'formal',
      description: 'Creates formal, structured documents with professional language',
      icon: '👔',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'creative',
      name: 'Creative Writer',
      personality: 'creative',
      description: 'Generates engaging content with creative flair and storytelling',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'technical',
      name: 'Technical Writer',
      personality: 'technical',
      description: 'Produces detailed technical documentation with precision',
      icon: '⚙️',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'marketing',
      name: 'Marketing Expert',
      personality: 'persuasive',
      description: 'Crafts compelling marketing copy and persuasive content',
      icon: '📈',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

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
        { id: 'contract_type', label: 'Contract Type', placeholder: 'Select type', value: '', type: 'select', options: ['Fixed Price', 'Hourly Rate', 'Retainer', 'Milestone-based'] },
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
        { id: 'priority_level', label: 'Priority Level', placeholder: 'Select priority', value: '', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
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
        { id: 'meeting_type', label: 'Meeting Type', placeholder: 'Select type', value: '', type: 'select', options: ['Weekly Standup', 'Project Review', 'Board Meeting', 'Client Meeting'] },
      ]
    }
  ];

  // Initialize with default agent
  useState(() => {
    if (!selectedAgent) {
      setSelectedAgent(agents[0]);
    }
  });

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
    if (!selectedTemplate || !selectedAgent) return;
    
    setIsGenerating(true);
    
    // Simulate document generation with agent personality
    setTimeout(() => {
      let content = getAgentGeneratedContent(selectedTemplate, selectedAgent);
      
      setGeneratedContent(content);
      setEditedContent(content);
      setIsGenerating(false);
    }, 2500);
  };

  const getAgentGeneratedContent = (template: DocumentTemplate, agent: Agent) => {
    let content = '';
    
    switch (agent.personality) {
      case 'formal':
        content = `# ${template.name}\n\n## Executive Summary\n\nThis document serves as a comprehensive ${template.name.toLowerCase()} prepared in accordance with professional standards and industry best practices.\n\n`;
        break;
      case 'creative':
        content = `# 🌟 ${template.name}\n\n*Crafted with precision and care*\n\nWelcome to this thoughtfully designed ${template.name.toLowerCase()}, where every detail has been carefully considered to meet your unique needs.\n\n`;
        break;
      case 'technical':
        content = `# ${template.name}\n## Document Specification v1.0\n\n### Technical Overview\nThis ${template.name.toLowerCase()} has been systematically structured to provide comprehensive documentation with detailed specifications.\n\n`;
        break;
      case 'persuasive':
        content = `# ${template.name} 📈\n\n## Unlock Your Success\n\nThis powerful ${template.name.toLowerCase()} is designed to drive results and create maximum impact for your business objectives.\n\n`;
        break;
      default:
        content = `# ${template.name}\n\n`;
    }
    
    // Add field content
    template.fields.forEach(field => {
      if (field.value) {
        content += `**${field.label}:** ${field.value}\n\n`;
      }
    });
    
    // Add agent-specific footer
    content += `\n---\n\n`;
    content += `*Generated on: ${new Date().toLocaleDateString()}*\n`;
    content += `*Template: ${template.name}*\n`;
    content += `*Generated by: ${agent.name}*\n`;
    
    return content;
  };

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
    
    setSelectedTemplate({
      ...selectedTemplate,
      fields: [...selectedTemplate.fields, customField]
    });
    
    setNewField({ label: '', type: 'text', placeholder: '', options: '' });
    setShowFieldDialog(false);
  };

  const removeField = (fieldId: string) => {
    if (!selectedTemplate) return;
    
    setSelectedTemplate({
      ...selectedTemplate,
      fields: selectedTemplate.fields.filter(field => field.id !== fieldId)
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setGeneratedContent(editedContent);
    }
    setIsEditing(!isEditing);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleRefreshContent = () => {
    if (selectedTemplate && selectedAgent) {
      generateDocument();
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6">
      {/* Template Selection */}
      <div className="w-80 space-y-4">
        {/* Agent Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Writing Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedAgent?.id} onValueChange={(agentId) => setSelectedAgent(agents.find(a => a.id === agentId) || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a writing agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.icon}</span>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedAgent && (
              <div className={`p-3 rounded-lg ${selectedAgent.color}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedAgent.icon}</span>
                  <div>
                    <div className="font-medium">{selectedAgent.name}</div>
                    <div className="text-xs">{selectedAgent.description}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Template Selection */}
        <Card className="flex-1">
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
                    ) : field.type === 'select' && field.options ? (
                      <Select value={field.value} onValueChange={(value) => updateFieldValue(field.id, value)}>
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
                        onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                
                <Separator className="my-6" />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={generateDocument} 
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

        {/* Preview & Edit Panel */}
        {generatedContent && (
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {isEditing ? 'Edit Document' : 'Preview'}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyContent}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRefreshContent}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="bg-white border rounded-lg p-4 max-h-[500px] overflow-y-auto">
                {isEditing ? (
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm resize-none border-none p-0 focus:ring-0"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-sm text-gray-900">
                    {generatedContent}
                  </pre>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
