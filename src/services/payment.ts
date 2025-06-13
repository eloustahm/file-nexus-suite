import { http } from '@/lib/api';
import type { Plan, Subscription, Usage } from '@/types/payment';

export const paymentService = {
  // Plans
  async getPlans(): Promise<Plan[]> {
    const response = await http.get<{ plans: Plan[] }>('/payment/plans');
    return response.plans;
  },

  // Subscription
  async getSubscription(): Promise<Subscription> {
    const response = await http.get<{ subscription: Subscription }>('/payment/subscription');
    return response.subscription;
  },

  async createSubscription(planId: string): Promise<Subscription> {
    const response = await http.post<{ subscription: Subscription }>('/payment/subscription', { planId });
    return response.subscription;
  },

  async cancelSubscription(): Promise<void> {
    await http.delete<void>('/payment/subscription');
  },

  async updatePaymentMethod(paymentMethodId: string): Promise<Subscription> {
    const response = await http.patch<{ subscription: Subscription }>('/payment/subscription/payment-method', { paymentMethodId });
    return response.subscription;
  },

  // Usage
  async getUsage(): Promise<Usage> {
    const response = await http.get<{ usage: Usage }>('/payment/usage');
    return response.usage;
  }
};
