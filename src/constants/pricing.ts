import { Check } from 'lucide-react';

export interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
}

export const PRICING_FEATURES: PricingFeature[] = [
  {
    id: 'storage',
    name: 'Storage Space',
    included: true
  },
  {
    id: 'users',
    name: 'Number of Users',
    included: true
  },
  {
    id: 'ai-features',
    name: 'AI Features',
    included: true
  },
  {
    id: 'api-access',
    name: 'API Access',
    included: true
  },
  {
    id: 'support',
    name: 'Support Level',
    included: true
  },
  {
    id: 'custom-domain',
    name: 'Custom Domain',
    included: true
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    included: true
  },
  {
    id: 'sso',
    name: 'Single Sign-On',
    included: true
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams and individuals',
    price: 9,
    billingPeriod: 'monthly',
    features: PRICING_FEATURES.map(feature => ({
      ...feature,
      included: ['storage', 'users', 'ai-features'].includes(feature.id)
    })),
    buttonText: 'Get Started',
    buttonVariant: 'outline'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for growing businesses',
    price: 29,
    billingPeriod: 'monthly',
    features: PRICING_FEATURES.map(feature => ({
      ...feature,
      included: ['storage', 'users', 'ai-features', 'api-access', 'support'].includes(feature.id)
    })),
    isPopular: true,
    buttonText: 'Start Free Trial',
    buttonVariant: 'default'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: 99,
    billingPeriod: 'monthly',
    features: PRICING_FEATURES.map(feature => ({
      ...feature,
      included: true
    })),
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary'
  }
];

export const PRICING_FAQS = [
  {
    id: 'billing',
    question: 'How does billing work?',
    answer: 'We offer monthly and annual billing options. Annual plans come with a 20% discount. You can upgrade, downgrade, or cancel your plan at any time.'
  },
  {
    id: 'refund',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 14-day money-back guarantee for all plans. If you re not satisfied with our service, you can request a full refund within 14 days of your purchase.'
  },
  {
    id: 'upgrade',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. When upgrading, you will be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.'
  },
  {
    id: 'support',
    question: 'What kind of support do you offer?',
    answer: 'All plans include email support. Pro and Enterprise plans include priority support with faster response times. Enterprise plans also include dedicated account management and 24/7 phone support.'
  }
]; 