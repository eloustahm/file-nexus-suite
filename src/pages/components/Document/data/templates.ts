
import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'business-letter',
    name: 'Business Letter',
    description: 'Professional business correspondence template',
    category: 'Business',
    content: 'Business letter template content...',
    fields: [
      {
        id: 'recipient_name',
        name: 'recipient_name',
        label: 'Recipient Name',
        type: 'text',
        required: true,
        value: ''
      },
      {
        id: 'recipient_company',
        name: 'recipient_company',
        label: 'Recipient Company',
        type: 'text',
        required: true,
        value: ''
      },
      {
        id: 'letter_content',
        name: 'letter_content',
        label: 'Letter Content',
        type: 'textarea',
        required: true,
        value: ''
      },
      {
        id: 'sender_title',
        name: 'sender_title',
        label: 'Your Title',
        type: 'text',
        required: false,
        value: ''
      }
    ]
  },
  {
    id: 'project-proposal',
    name: 'Project Proposal',
    description: 'Comprehensive project proposal template',
    category: 'Business',
    content: 'Project proposal template content...',
    fields: [
      {
        id: 'project_name',
        name: 'project_name',
        label: 'Project Name',
        type: 'text',
        required: true,
        value: ''
      },
      {
        id: 'project_deadline',
        name: 'project_deadline',
        label: 'Project Deadline',
        type: 'date',
        required: true,
        value: ''
      },
      {
        id: 'project_description',
        name: 'project_description',
        label: 'Project Description',
        type: 'textarea',
        required: true,
        value: ''
      },
      {
        id: 'project_objectives',
        name: 'project_objectives',
        label: 'Project Objectives',
        type: 'textarea',
        required: true,
        value: ''
      }
    ]
  }
];
