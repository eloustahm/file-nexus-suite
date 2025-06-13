import { Shield, Eye, Lock, Bell, Database, FileText } from 'lucide-react';

export interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
  category: 'data' | 'notifications' | 'security';
  defaultValue: boolean;
}

export const PRIVACY_SETTINGS: PrivacySetting[] = [
  {
    id: 'data-collection',
    title: 'Data Collection',
    description: 'Allow us to collect usage data to improve our services',
    icon: Database,
    category: 'data',
    defaultValue: true
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    description: 'Share anonymized data with our partners for research',
    icon: FileText,
    category: 'data',
    defaultValue: false
  },
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    description: 'Receive email notifications about your account',
    icon: Bell,
    category: 'notifications',
    defaultValue: true
  },
  {
    id: 'activity-tracking',
    title: 'Activity Tracking',
    description: 'Track your activity for personalized recommendations',
    icon: Eye,
    category: 'data',
    defaultValue: true
  },
  {
    id: 'two-factor',
    title: 'Two-Factor Authentication',
    description: 'Require two-factor authentication for login',
    icon: Lock,
    category: 'security',
    defaultValue: false
  },
  {
    id: 'data-encryption',
    title: 'Data Encryption',
    description: 'Enable end-to-end encryption for your data',
    icon: Shield,
    category: 'security',
    defaultValue: true
  }
];

export const PRIVACY_CATEGORIES = [
  {
    id: 'data',
    title: 'Data & Privacy',
    description: 'Control how your data is collected and used'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Manage your notification preferences'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Configure your security settings'
  }
]; 