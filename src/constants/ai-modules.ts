import { Brain, MessageSquare, Search, FileText, FileCheck, Workflow } from 'lucide-react';

export interface AIModule {
  id: string;
  name: string;
  description: string;
  icon: typeof Brain;
  usage: {
    current: number;
    limit: number;
    unit: 'documents' | 'queries' | 'hours';
  };
  status: 'active' | 'inactive' | 'pending';
  features: string[];
}

export const AI_MODULES: AIModule[] = [
  {
    id: 'document-analysis',
    name: 'Document Analysis',
    description: 'AI-powered document analysis and classification',
    icon: FileText,
    usage: {
      current: 150,
      limit: 1000,
      unit: 'documents'
    },
    status: 'active',
    features: [
      'Automatic document classification',
      'Key information extraction',
      'Sentiment analysis',
      'Language detection'
    ]
  },
  {
    id: 'ai-chat',
    name: 'AI Chat Assistant',
    description: 'Intelligent chat assistant for document queries',
    icon: MessageSquare,
    usage: {
      current: 75,
      limit: 500,
      unit: 'queries'
    },
    status: 'active',
    features: [
      'Natural language queries',
      'Context-aware responses',
      'Document summarization',
      'Multi-language support'
    ]
  },
  {
    id: 'smart-search',
    name: 'Smart Search',
    description: 'Advanced semantic search capabilities',
    icon: Search,
    usage: {
      current: 200,
      limit: 1000,
      unit: 'queries'
    },
    status: 'active',
    features: [
      'Semantic search',
      'Fuzzy matching',
      'Relevance ranking',
      'Search analytics'
    ]
  },
  {
    id: 'data-extraction',
    name: 'Data Extraction',
    description: 'Automated data extraction from documents',
    icon: FileCheck,
    usage: {
      current: 50,
      limit: 500,
      unit: 'documents'
    },
    status: 'inactive',
    features: [
      'Table extraction',
      'Form field detection',
      'Data validation',
      'Export to multiple formats'
    ]
  },
  {
    id: 'summary-generation',
    name: 'Summary Generation',
    description: 'AI-powered document summarization',
    icon: Brain,
    usage: {
      current: 25,
      limit: 200,
      unit: 'documents'
    },
    status: 'pending',
    features: [
      'Executive summaries',
      'Key points extraction',
      'Custom summary length',
      'Multi-document summarization'
    ]
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Intelligent document workflow automation',
    icon: Workflow,
    usage: {
      current: 10,
      limit: 100,
      unit: 'hours'
    },
    status: 'inactive',
    features: [
      'Automated routing',
      'Approval workflows',
      'Task assignment',
      'Process analytics'
    ]
  }
]; 