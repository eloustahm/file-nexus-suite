
import { http } from '@/lib/api';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    documents: number;
    templates: number;
    storage: string;
  };
}

export interface Usage {
  documents: number;
  templates: number;
  storage: number;
  maxDocuments: number;
  maxTemplates: number;
  maxStorage: number;
}

/**
 * Payment API service
 */
export const paymentApi = {
  // Get available plans
  getPlans: async (): Promise<Plan[]> => {
    console.log('Fetching payment plans');
    return http.get<Plan[]>('/api/payment/plans');
  },

  // Get current usage
  getUsage: async (): Promise<Usage> => {
    console.log('Fetching usage data');
    return http.get<Usage>('/api/payment/usage');
  },

  // Create subscription
  createSubscription: async (planId: string) => {
    console.log('Creating subscription for plan:', planId);
    return http.post('/api/payment/subscription', { planId });
  },

  // Cancel subscription
  cancelSubscription: async () => {
    console.log('Cancelling subscription');
    return http.delete('/api/payment/subscription');
  }
};
