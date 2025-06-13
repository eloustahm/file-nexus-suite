import { PRICING_PLANS, PRICING_FAQS, type PricingPlan } from '@/constants/pricing';
import { http } from '@/lib/api';

export const pricingService = {
  /**
   * Get all pricing plans
   */
  getPlans: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return http.get<PricingPlan[]>('/pricing/plans');
    return PRICING_PLANS;
  },

  /**
   * Get pricing FAQs
   */
  getFaqs: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return http.get('/pricing/faqs');
    return PRICING_FAQS;
  },

  /**
   * Get a specific plan by ID
   */
  getPlan: async (id: string) => {
    // TODO: Replace with actual API call when backend is ready
    // return http.get<PricingPlan>(`/pricing/plans/${id}`);
    return PRICING_PLANS.find(plan => plan.id === id);
  },

  /**
   * Get the popular plan
   */
  getPopularPlan: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return http.get<PricingPlan>('/pricing/plans/popular');
    return PRICING_PLANS.find(plan => plan.isPopular);
  },

  /**
   * Get a specific FAQ by ID
   */
  getFaq: async (id: string) => {
    // TODO: Replace with actual API call when backend is ready
    // return http.get(`/pricing/faqs/${id}`);
    return PRICING_FAQS.find(faq => faq.id === id);
  }
}; 