
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { paymentApi } from '@/services/api';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

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

interface PaymentContextState extends BaseContextState {
  plans: Plan[];
  subscription: Subscription | null;
  usage: Usage | null;
}

interface PaymentContextActions extends BaseContextActions {
  fetchPlans: () => Promise<void>;
  createSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  getUsage: () => Promise<void>;
}

interface PaymentContextValue extends PaymentContextState, PaymentContextActions {}

const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const fetchPlans = async () => {
    await handleAsyncAction(
      async () => {
        const data = await paymentApi.getPlans() as Plan[];
        setPlans(data);
      },
      setLoading,
      setError
    );
  };

  const createSubscription = async (planId: string) => {
    await handleAsyncAction(
      async () => {
        const sub = await paymentApi.createSubscription(planId) as Subscription;
        setSubscription(sub);
      },
      setLoading,
      setError
    );
  };

  const cancelSubscription = async () => {
    await handleAsyncAction(
      async () => {
        await paymentApi.cancelSubscription();
        setSubscription(null);
      },
      setLoading,
      setError
    );
  };

  const getUsage = async () => {
    await handleAsyncAction(
      async () => {
        const data = await paymentApi.getUsage() as Usage;
        setUsage(data);
      },
      setLoading,
      setError
    );
  };

  const value: PaymentContextValue = {
    plans,
    subscription,
    usage,
    loading,
    error,
    fetchPlans,
    createSubscription,
    cancelSubscription,
    getUsage,
    ...baseActions,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
