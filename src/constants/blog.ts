import { FileText, Code, Database, Shield, Users, Zap } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: 'development' | 'security' | 'product' | 'tutorial';
  tags: string[];
  date: string;
  readTime: string;
  icon: typeof FileText;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with File Nexus Suite',
    description: 'Learn how to set up and configure your File Nexus Suite workspace for optimal productivity.',
    content: 'Full blog post content here...',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'Product Manager'
    },
    category: 'product',
    tags: ['getting-started', 'setup', 'configuration'],
    date: '2024-03-15',
    readTime: '5 min read',
    icon: FileText
  },
  {
    id: 'api-integration',
    title: 'Integrating File Nexus API with Your Application',
    description: 'A comprehensive guide to integrating File Nexus Suite APIs into your existing applications.',
    content: 'Full blog post content here...',
    author: {
      name: 'Michael Rodriguez',
      avatar: '/avatars/michael.jpg',
      role: 'Senior Developer'
    },
    category: 'development',
    tags: ['api', 'integration', 'development'],
    date: '2024-03-10',
    readTime: '8 min read',
    icon: Code
  },
  {
    id: 'data-security',
    title: 'Best Practices for Data Security in File Nexus',
    description: 'Essential security practices to keep your documents and data safe in File Nexus Suite.',
    content: 'Full blog post content here...',
    author: {
      name: 'Alex Thompson',
      avatar: '/avatars/alex.jpg',
      role: 'Security Engineer'
    },
    category: 'security',
    tags: ['security', 'data-protection', 'best-practices'],
    date: '2024-03-05',
    readTime: '6 min read',
    icon: Shield
  },
  {
    id: 'database-optimization',
    title: 'Optimizing Database Performance',
    description: 'Tips and tricks for optimizing your database performance with File Nexus Suite.',
    content: 'Full blog post content here...',
    author: {
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      role: 'Database Engineer'
    },
    category: 'development',
    tags: ['database', 'performance', 'optimization'],
    date: '2024-03-01',
    readTime: '7 min read',
    icon: Database
  },
  {
    id: 'team-collaboration',
    title: 'Enhancing Team Collaboration',
    description: 'How to leverage File Nexus Suite features for better team collaboration.',
    content: 'Full blog post content here...',
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/emma.jpg',
      role: 'Team Lead'
    },
    category: 'product',
    tags: ['collaboration', 'team-work', 'productivity'],
    date: '2024-02-28',
    readTime: '5 min read',
    icon: Users
  },
  {
    id: 'automation-guide',
    title: 'Automating Workflows with File Nexus',
    description: 'A step-by-step guide to setting up automated workflows in File Nexus Suite.',
    content: 'Full blog post content here...',
    author: {
      name: 'James Anderson',
      avatar: '/avatars/james.jpg',
      role: 'Solutions Architect'
    },
    category: 'tutorial',
    tags: ['automation', 'workflows', 'tutorial'],
    date: '2024-02-25',
    readTime: '10 min read',
    icon: Zap
  }
];

export const BLOG_CATEGORIES = [
  { id: 'all', name: 'All Posts', icon: FileText },
  { id: 'development', name: 'Development', icon: Code },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'product', name: 'Product', icon: Users },
  { id: 'tutorial', name: 'Tutorials', icon: Zap }
]; 