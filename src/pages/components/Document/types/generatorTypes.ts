
export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  options?: string[];
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: TemplateField[];
}

export interface NewFieldData {
  label: string;
  type: string;
  placeholder: string;
  options: string;
}
