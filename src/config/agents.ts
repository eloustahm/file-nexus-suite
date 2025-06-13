import { Agent } from '@/types';

export const agents: Agent[] = [
  {
    id: 'professional',
    name: 'Professional Assistant',
    type: 'assistant',
    description: 'Formal, detailed responses with professional language',
    capabilities: ['Document Analysis', 'Professional Writing', 'Business Insights'],
    personality: 'formal',
    icon: '👔',
    color: 'bg-blue-100 text-blue-800',
    isActive: true
  },
  {
    id: 'creative',
    name: 'Creative Helper',
    type: 'creative',
    description: 'Imaginative, engaging responses with creative insights',
    capabilities: ['Creative Writing', 'Design Ideas', 'Innovation'],
    personality: 'creative',
    icon: '🎨',
    color: 'bg-purple-100 text-purple-800',
    isActive: true
  },
  {
    id: 'analytical',
    name: 'Data Analyst',
    type: 'analytical',
    description: 'Data-driven responses with charts and insights',
    capabilities: ['Data Analysis', 'Statistics', 'Reporting'],
    personality: 'analytical',
    icon: '📊',
    color: 'bg-green-100 text-green-800',
    isActive: true
  },
  {
    id: 'casual',
    name: 'Friendly Buddy',
    type: 'casual',
    description: 'Casual, conversational tone with simple explanations',
    capabilities: ['Friendly Chat', 'Simple Explanations', 'Support'],
    personality: 'casual',
    icon: '😊',
    color: 'bg-orange-100 text-orange-800',
    isActive: true
  }
]; 