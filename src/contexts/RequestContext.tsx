
import React, { createContext, useContext, ReactNode } from 'react';
import { useApiRequest, UseApiRequestReturn } from '@/hooks/useApiRequest';

interface RequestContextType {
  documents: UseApiRequestReturn;
  auth: UseApiRequestReturn;
  user: UseApiRequestReturn;
  payment: UseApiRequestReturn;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const documents = useApiRequest();
  const auth = useApiRequest();
  const user = useApiRequest();
  const payment = useApiRequest();

  return (
    <RequestContext.Provider value={{ documents, auth, user, payment }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequestContext must be used within a RequestProvider');
  }
  return context;
};
