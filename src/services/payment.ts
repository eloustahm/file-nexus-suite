
import { http } from '@/lib/api';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

export interface Usage {
  documentsUploaded: number;
  documentsLimit: number;
  storageUsed: number;
  storageLimit: number;
  apiCalls: number;
  apiLimit: number;
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
  createSubscription: async (planId: string): Promise<{ subscriptionId: string }> => {
    console.log('Creating subscription:', planId);
    return http.post<{ subscriptionId: string }>('/api/payment/subscribe', { planId });
  },

  // Cancel subscription
  cancelSubscription: async (): Promise<void> => {
    console.log('Cancelling subscription');
    return http.post('/api/payment/cancel');
  }
};
