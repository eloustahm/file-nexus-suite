import type { Integration } from '@/types/integration';

export interface IntegrationDefinition extends Integration {
  description: string;
  icon: string;
  category: string;
  hasApiKey?: boolean;
}

export const DEFAULT_INTEGRATIONS: IntegrationDefinition[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Advanced AI text generation and analysis',
    icon: '🤖',
    type: 'other',
    status: 'inactive',
    config: {},
    category: 'ai',
    hasApiKey: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Cloud storage and document sync',
    icon: '📁',
    type: 'storage',
    status: 'inactive',
    config: {},
    category: 'storage',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Office applications and cloud services',
    icon: '📊',
    type: 'other',
    status: 'inactive',
    config: {},
    category: 'productivity',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and notifications',
    icon: '💬',
    type: 'other',
    status: 'inactive',
    config: {},
    category: 'communication',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Knowledge management and documentation',
    icon: '📝',
    type: 'other',
    status: 'inactive',
    config: {},
    category: 'productivity',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File storage and sharing',
    icon: '📦',
    type: 'storage',
    status: 'inactive',
    config: {},
    category: 'storage',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]; 