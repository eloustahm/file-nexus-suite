
import { http } from '@/lib/api';
import type { PricingPlan } from '@/types';

export const pricingService = {
  /**
   * Get all pricing plans
   */
  getPlans: async (): Promise<PricingPlan[]> => {
    return http.get<PricingPlan[]>('/pricing/plans');
  },

  /**
   * Get pricing FAQs
   */
  getFaqs: async () => {
    return http.get('/pricing/faqs');
  },

  /**
   * Get a specific plan by ID
   */
  getPlan: async (id: string): Promise<PricingPlan> => {
    return http.get<PricingPlan>(`/pricing/plans/${id}`);
  },

  /**
   * Get the popular plan
   */
  getPopularPlan: async (): Promise<PricingPlan> => {
    return http.get<PricingPlan>('/pricing/plans/popular');
  },

  /**
   * Get a specific FAQ by ID
   */
  getFaq: async (id: string) => {
    return http.get(`/pricing/faqs/${id}`);
  }
};
