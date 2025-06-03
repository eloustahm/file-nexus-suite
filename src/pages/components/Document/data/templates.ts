
import { Agent, DocumentTemplate } from '../types/generatorTypes';

export const agents: Agent[] = [
  {
    id: 'formal',
    name: 'Professional Writer',
    type: 'assistant',
    description: 'Creates formal, structured documents with professional tone',
    capabilities: ['Formal Writing', 'Business Documents', 'Professional Communication'],
    personality: 'formal',
    icon: '👔',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'creative',
    name: 'Creative Storyteller',
    type: 'creative',
    description: 'Generates engaging, creative content with flair',
    capabilities: ['Creative Writing', 'Storytelling', 'Marketing Copy'],
    personality: 'creative',
    icon: '🎨',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'technical',
    name: 'Technical Expert',
    type: 'technical',
    description: 'Produces detailed technical documentation',
    capabilities: ['Technical Writing', 'Documentation', 'Specifications'],
    personality: 'technical',
    icon: '⚙️',
    color: 'bg-gray-100 text-gray-800'
  },
  {
    id: 'persuasive',
    name: 'Sales Champion',
    type: 'sales',
    description: 'Crafts compelling, persuasive content',
    capabilities: ['Sales Copy', 'Persuasive Writing', 'Marketing'],
    personality: 'persuasive',
    icon: '📈',
    color: 'bg-green-100 text-green-800'
  }
];

export const templates: DocumentTemplate[] = [
  {
    id: 'business-proposal',
    name: 'Business Proposal',
    description: 'Comprehensive business proposal template',
    type: 'business',
    fields: [
      {
        id: 'company-name',
        label: 'Company Name',
        placeholder: 'Enter your company name',
        value: '',
        type: 'text'
      },
      {
        id: 'project-title',
        label: 'Project Title',
        placeholder: 'Enter project title',
        value: '',
        type: 'text'
      },
      {
        id: 'executive-summary',
        label: 'Executive Summary',
        placeholder: 'Brief overview of the proposal',
        value: '',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structured meeting notes template',
    type: 'meeting',
    fields: [
      {
        id: 'meeting-title',
        label: 'Meeting Title',
        placeholder: 'Enter meeting title',
        value: '',
        type: 'text'
      },
      {
        id: 'date',
        label: 'Date',
        placeholder: 'Select date',
        value: '',
        type: 'date'
      },
      {
        id: 'attendees',
        label: 'Attendees',
        placeholder: 'List attendees',
        value: '',
        type: 'textarea'
      }
    ]
  }
];
