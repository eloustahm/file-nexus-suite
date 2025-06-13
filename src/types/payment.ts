export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limitations: string[];
  maxMembers: number;
  maxStorage: number;
  maxDocuments: number;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethodId: string;
}

export interface Usage {
  documents: {
    total: number;
    limit: number;
    used: number;
  };
  storage: {
    total: number;
    limit: number;
    used: number;
  };
  members: {
    total: number;
    limit: number;
    used: number;
  };
} 