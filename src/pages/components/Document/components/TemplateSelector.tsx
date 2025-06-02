
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, FileText } from "lucide-react";
import { DocumentTemplate } from '../types/generatorTypes';

interface TemplateSelectorProps {
  templates: DocumentTemplate[];
  selectedTemplate: DocumentTemplate | null;
  onTemplateSelect: (template: DocumentTemplate) => void;
}

export const TemplateSelector = ({ templates, selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
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
            onClick={() => onTemplateSelect({ ...template, fields: template.fields.map(f => ({ ...f, value: '' })) })}
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
  );
};
