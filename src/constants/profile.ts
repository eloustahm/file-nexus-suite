import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, Settings } from 'lucide-react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  joinDate: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  preferences: {
    notifications: boolean;
    twoFactor: boolean;
    darkMode: boolean;
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    nextBillingDate?: string;
  };
  stats: {
    filesUploaded: number;
    storageUsed: string;
    storageLimit: string;
    lastActive: string;
  };
}

export const PROFILE_SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: User,
    description: 'View and edit your profile information'
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    description: 'Manage your security settings and preferences'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Configure your notification preferences'
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    description: 'Manage your subscription and billing information'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Customize your account settings'
  }
];

export const PROFILE_FIELDS = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    icon: User,
    required: true
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    icon: Mail,
    required: true
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    icon: Phone,
    required: false
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    icon: MapPin,
    required: false
  },
  {
    id: 'joinDate',
    label: 'Join Date',
    type: 'date',
    icon: Calendar,
    required: true,
    readOnly: true
  }
];

export const SAMPLE_PROFILE: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: '2024-01-15T00:00:00Z',
  avatar: '/avatars/john.jpg',
  role: 'user',
  status: 'active',
  preferences: {
    notifications: true,
    twoFactor: true,
    darkMode: false
  },
  subscription: {
    plan: 'pro',
    status: 'active',
    nextBillingDate: '2024-04-15T00:00:00Z'
  },
  stats: {
    filesUploaded: 156,
    storageUsed: '2.5 GB',
    storageLimit: '10 GB',
    lastActive: '2024-03-15T14:30:00Z'
  }
}; 