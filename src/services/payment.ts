
import { http } from '@/lib/api';

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: number;
  currency: string;
}

export const paymentService = {
  async getSubscriptions(): Promise<Subscription[]> {
    return http.get<Subscription[]>('/payments/subscriptions');
  },

  async createSubscription(data: { planId: string; paymentMethodId: string }): Promise<Subscription> {
    return http.post<Subscription>('/payments/subscriptions', data);
  },

  async cancelSubscription(subscriptionId: string): Promise<void> {
    return http.delete(`/payments/subscriptions/${subscriptionId}`);
  },

  async updatePaymentMethod(data: { paymentMethodId: string }): Promise<void> {
    return http.put('/payments/payment-method', data);
  },
};
