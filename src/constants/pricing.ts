
import type { PricingPlan } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    interval: 'month',
    features: [
      '5 documents',
      '3 templates',
      'Unlimited folders',
      '250MB storage'
    ],
    limitations: [
      'Limited AI features',
      'No team collaboration'
    ],
    popular: false,
    maxMembers: 1,
    maxStorage: 250,
    maxDocuments: 5,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for professionals',
    price: 19,
    interval: 'month',
    features: [
      '100 documents',
      '25 templates',
      'Unlimited folders',
      '10GB storage',
      'Advanced AI features',
      'Team collaboration'
    ],
    limitations: [],
    popular: true,
    maxMembers: 5,
    maxStorage: 10240,
    maxDocuments: 100,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For growing teams',
    price: 49,
    interval: 'month',
    features: [
      'Unlimited documents',
      'Unlimited templates',
      'Unlimited folders',
      '100GB storage',
      'Advanced AI features',
      'Team collaboration',
      'Priority support'
    ],
    limitations: [],
    popular: false,
    maxMembers: 25,
    maxStorage: 102400,
    maxDocuments: -1,
  }
];

export type { PricingPlan } from '@/types';
