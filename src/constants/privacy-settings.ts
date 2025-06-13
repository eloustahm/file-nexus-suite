import { Shield, Eye, Lock, FileText, Database, Users } from 'lucide-react';

export interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
  category: 'data' | 'access' | 'sharing';
  options: {
    id: string;
    label: string;
    description: string;
    default: boolean;
  }[];
}

export const PRIVACY_SETTINGS: PrivacySetting[] = [
  {
    id: 'data-retention',
    title: 'Data Retention',
    description: 'Configure how long we keep your data',
    icon: Database,
    category: 'data',
    options: [
      {
        id: 'auto-delete',
        label: 'Auto-delete after 30 days',
        description: 'Automatically delete unused data after 30 days',
        default: false
      },
      {
        id: 'keep-forever',
        label: 'Keep indefinitely',
        description: 'Keep all data until manually deleted',
        default: true
      }
    ]
  },
  {
    id: 'access-control',
    title: 'Access Control',
    description: 'Manage who can access your documents',
    icon: Lock,
    category: 'access',
    options: [
      {
        id: 'strict',
        label: 'Strict access control',
        description: 'Require explicit permission for each access',
        default: true
      },
      {
        id: 'relaxed',
        label: 'Relaxed access control',
        description: 'Allow team members to access shared documents',
        default: false
      }
    ]
  },
  {
    id: 'sharing-settings',
    title: 'Sharing Settings',
    description: 'Control how documents can be shared',
    icon: Users,
    category: 'sharing',
    options: [
      {
        id: 'restricted',
        label: 'Restricted sharing',
        description: 'Only allow sharing with verified users',
        default: true
      },
      {
        id: 'open',
        label: 'Open sharing',
        description: 'Allow sharing with any user',
        default: false
      }
    ]
  },
  {
    id: 'audit-logs',
    title: 'Audit Logs',
    description: 'Configure audit logging settings',
    icon: FileText,
    category: 'data',
    options: [
      {
        id: 'detailed',
        label: 'Detailed logging',
        description: 'Log all document access and changes',
        default: true
      },
      {
        id: 'minimal',
        label: 'Minimal logging',
        description: 'Only log critical changes',
        default: false
      }
    ]
  },
  {
    id: 'visibility',
    title: 'Document Visibility',
    description: 'Control document visibility settings',
    icon: Eye,
    category: 'access',
    options: [
      {
        id: 'private',
        label: 'Private by default',
        description: 'New documents are private by default',
        default: true
      },
      {
        id: 'shared',
        label: 'Shared by default',
        description: 'New documents are shared with team by default',
        default: false
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Settings',
    description: 'Configure security preferences',
    icon: Shield,
    category: 'access',
    options: [
      {
        id: '2fa',
        label: 'Two-factor authentication',
        description: 'Require 2FA for all users',
        default: true
      },
      {
        id: 'password',
        label: 'Password protection',
        description: 'Require password for shared documents',
        default: false
      }
    ]
  }
]; 