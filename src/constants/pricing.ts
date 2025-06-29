
import type { PricingPlan } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    interval: 'month',
    features: [
      { id: '1', name: '5 documents', included: true },
      { id: '2', name: '3 templates', included: true },
      { id: '3', name: 'Unlimited folders', included: true },
      { id: '4', name: '250MB storage', included: true },
      { id: '5', name: 'Limited AI features', included: false },
      { id: '6', name: 'No team collaboration', included: false }
    ],
    limitations: [
      'Limited AI features',
      'No team collaboration'
    ],
    popular: false,
    maxMembers: 1,
    maxStorage: 250,
    maxDocuments: 5,
    buttonVariant: 'outline',
    buttonText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for professionals',
    price: 19,
    interval: 'month',
    features: [
      { id: '1', name: '100 documents', included: true },
      { id: '2', name: '25 templates', included: true },
      { id: '3', name: 'Unlimited folders', included: true },
      { id: '4', name: '10GB storage', included: true },
      { id: '5', name: 'Advanced AI features', included: true },
      { id: '6', name: 'Team collaboration', included: true }
    ],
    limitations: [],
    popular: true,
    maxMembers: 5,
    maxStorage: 10240,
    maxDocuments: 100,
    buttonVariant: 'default',
    buttonText: 'Start Free Trial'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For growing teams',
    price: 49,
    interval: 'month',
    features: [
      { id: '1', name: 'Unlimited documents', included: true },
      { id: '2', name: 'Unlimited templates', included: true },
      { id: '3', name: 'Unlimited folders', included: true },
      { id: '4', name: '100GB storage', included: true },
      { id: '5', name: 'Advanced AI features', included: true },
      { id: '6', name: 'Team collaboration', included: true },
      { id: '7', name: 'Priority support', included: true }
    ],
    limitations: [],
    popular: false,
    maxMembers: 25,
    maxStorage: 102400,
    maxDocuments: -1,
    buttonVariant: 'outline',
    buttonText: 'Contact Sales'
  }
];

export type { PricingPlan, PricingFeature, PricingFAQ } from '@/types';
