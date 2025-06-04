
import { Template } from '@/types';

export const documentTemplates: Template[] = [
  {
    id: '1',
    name: 'Business Proposal',
    description: 'Professional business proposal template',
    category: 'Business',
    fields: [
      {
        name: 'companyName',
        type: 'text',
        label: 'Company Name',
        required: true
      },
      {
        name: 'proposalTitle',
        type: 'text',
        label: 'Proposal Title',
        required: true
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Project Description',
        required: true
      },
      {
        name: 'timeline',
        type: 'text',
        label: 'Project Timeline',
        required: false
      }
    ]
  },
  {
    id: '2',
    name: 'Meeting Minutes',
    description: 'Template for recording meeting minutes',
    category: 'Administrative',
    fields: [
      {
        name: 'meetingTitle',
        type: 'text',
        label: 'Meeting Title',
        required: true
      },
      {
        name: 'date',
        type: 'date',
        label: 'Meeting Date',
        required: true
      },
      {
        name: 'attendees',
        type: 'textarea',
        label: 'Attendees',
        required: true
      },
      {
        name: 'agenda',
        type: 'textarea',
        label: 'Agenda Items',
        required: true
      }
    ]
  }
];
