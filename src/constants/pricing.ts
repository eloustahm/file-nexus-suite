
import { PricingPlan, PricingFAQ } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1',
    name: 'Free',
    description: 'Perfect for individuals getting started with document management',
    price: 0,
    interval: 'month',
    popular: false,
    maxMembers: 1,
    maxStorage: 1,
    maxDocuments: 10,
    features: [
      { id: '1', name: 'Basic document storage', included: true },
      { id: '2', name: 'AI-powered search', included: true },
      { id: '3', name: 'Basic templates', included: true },
      { id: '4', name: 'Email support', included: false },
      { id: '5', name: 'Advanced AI features', included: false }
    ],
    limitations: ['Limited to 10 documents', '1GB storage', 'Basic support only'],
    buttonVariant: 'outline',
    buttonText: 'Get Started'
  },
  {
    id: '2',
    name: 'Pro',
    description: 'Ideal for professionals and small teams who need advanced features',
    price: 19,
    interval: 'month',
    popular: true,
    maxMembers: 5,
    maxStorage: 50,
    maxDocuments: 500,
    features: [
      { id: '1', name: 'Advanced document storage', included: true },
      { id: '2', name: 'AI-powered search & analysis', included: true },
      { id: '3', name: 'Premium templates', included: true },
      { id: '4', name: 'Priority email support', included: true },
      { id: '5', name: 'Advanced AI features', included: true }
    ],
    limitations: ['Limited to 500 documents', '50GB storage', 'Up to 5 team members'],
    buttonVariant: 'default',
    buttonText: 'Start Free Trial'
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For large organizations with complex document management needs',
    price: 99,
    interval: 'month',
    popular: false,
    maxMembers: 100,
    maxStorage: 1000,
    maxDocuments: 10000,
    features: [
      { id: '1', name: 'Unlimited document storage', included: true },
      { id: '2', name: 'Advanced AI & analytics', included: true },
      { id: '3', name: 'Custom templates', included: true },
      { id: '4', name: '24/7 phone & email support', included: true },
      { id: '5', name: 'Enterprise integrations', included: true }
    ],
    limitations: ['Custom limits available', 'Enterprise-grade security', 'Dedicated account manager'],
    buttonVariant: 'outline',
    buttonText: 'Contact Sales'
  }
];

export const PRICING_FAQS: PricingFAQ[] = [
  {
    id: '1',
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    id: '2',
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for our Pro and Enterprise plans. No credit card required.'
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.'
  },
  {
    id: '4',
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period.'
  }
];
