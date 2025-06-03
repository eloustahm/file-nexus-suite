
import { create } from 'zustand';
import { paymentApi } from '@/services/api';

interface Plan {
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

interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: string;
}

interface Usage {
  documents: number;
  templates: number;
  storage: number;
  maxDocuments: number;
  maxTemplates: number;
  maxStorage: number;
}

interface PaymentState {
  plans: Plan[];
  subscription: Subscription | null;
  usage: Usage | null;
  loading: boolean;
  error: string | null;
  fetchPlans: () => Promise<void>;
  createSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  getUsage: () => Promise<void>;
  clearError: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  plans: [],
  subscription: null,
  usage: null,
  loading: false,
  error: null,

  fetchPlans: async () => {
    try {
      set({ loading: true, error: null });
      const plans = await paymentApi.getPlans() as Plan[];
      set({ plans });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createSubscription: async (planId: string) => {
    try {
      set({ loading: true, error: null });
      const subscription = await paymentApi.createSubscription(planId) as Subscription;
      set({ subscription });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  cancelSubscription: async () => {
    try {
      set({ loading: true, error: null });
      await paymentApi.cancelSubscription();
      set({ subscription: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getUsage: async () => {
    try {
      set({ loading: true, error: null });
      const usage = await paymentApi.getUsage() as Usage;
      set({ usage });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
