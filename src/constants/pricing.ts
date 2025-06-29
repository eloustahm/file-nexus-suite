
import type { PricingPlan } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '5 documents per month',
      '3 templates',
      'Unlimited folders',
      '250MB storage',
      'Basic support'
    ],
    popular: false,
    limits: {
      documents: 5,
      templates: 3,
      storage: 250 * 1024 * 1024, // 250MB in bytes
      folders: -1 // unlimited
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 9.99,
    interval: 'month',
    features: [
      '50 documents per month',
      '10 templates',
      'Unlimited folders',
      '2GB storage',
      'Email support',
      'Basic AI features'
    ],
    popular: false,
    limits: {
      documents: 50,
      templates: 10,
      storage: 2 * 1024 * 1024 * 1024, // 2GB in bytes
      folders: -1
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29.99,
    interval: 'month',
    features: [
      '200 documents per month',
      '25 templates',
      'Unlimited folders',
      '10GB storage',
      'Priority support',
      'Advanced AI features',
      'Team collaboration'
    ],
    popular: true,
    limits: {
      documents: 200,
      templates: 25,
      storage: 10 * 1024 * 1024 * 1024, // 10GB in bytes
      folders: -1
    }
  }
];

export const PRICING_FAQS = [
  {
    id: '1',
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    id: '2',
    question: 'What happens if I exceed my document limit?',
    answer: 'If you exceed your document limit, you\'ll need to upgrade your plan or wait until the next billing cycle to create new documents.'
  },
  {
    id: '3',
    question: 'Is there a free trial available?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.'
  }
];
