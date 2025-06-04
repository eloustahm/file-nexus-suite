
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

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: string;
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
    return http.get<Plan[]>('/api/payment/plans');
  },
  
  // Create subscription
  createSubscription: async (planId: string): Promise<Subscription> => {
    return http.post<Subscription>('/api/payment/subscribe', { planId });
  },
  
  // Cancel subscription
  cancelSubscription: async (): Promise<void> => {
    return http.post<void>('/api/payment/cancel');
  },
  
  // Get usage statistics
  getUsage: async (): Promise<Usage> => {
    return http.get<Usage>('/api/payment/usage');
  }
};
