
import { DocumentTemplate } from '../types/generatorTypes';
import { Agent } from '../types/chatTypes';

export const agents: Agent[] = [
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

export const templates: DocumentTemplate[] = [
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
