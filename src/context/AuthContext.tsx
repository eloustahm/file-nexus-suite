
import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { authApi } from '@/services/auth';
import { BaseContextState, BaseContextActions, handleAsyncAction, createBaseActions } from './BaseContext';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthContextState extends BaseContextState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextActions extends BaseContextActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (val: boolean) => void;
}

interface AuthContextValue extends AuthContextState, AuthContextActions {}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseActions = createBaseActions(setLoading, setError);

  const signIn = async (email: string, password: string) => {
    sessionStorage.setItem('auth_attempted', 'true');

    await handleAsyncAction(
      async () => {
        await authApi.csrf();
        await authApi.login({ email, password });
        await getCurrentUser();
        sessionStorage.removeItem('auth_attempted');
      },
      setLoading,
      setError
    );
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    sessionStorage.setItem('auth_attempted', 'true');

    await handleAsyncAction(
      async () => {
        await authApi.register({ email, password, firstName, lastName });
        await getCurrentUser();
        sessionStorage.removeItem('auth_attempted');
      },
      setLoading,
      setError
    );
  };

  const signOut = async () => {
    await handleAsyncAction(
      async () => {
        await authApi.logout();
        setUser(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('auth_attempted');
      },
      setLoading,
      setError
    );
  };

  const resetPassword = async (email: string) => {
    await handleAsyncAction(
      async () => {
        await authApi.resetPassword(email);
      },
      setLoading,
      setError
    );
  };

  const getCurrentUser = async () => {
    await handleAsyncAction(
      async () => {
        const fetchedUser = await authApi.getCurrentUser();
        setUser(fetchedUser);
        setIsAuthenticated(true);
      },
      setLoading,
      (error) => {
        setUser(null);
        setIsAuthenticated(false);
        setError(error);
      }
    );
  };

  const value: AuthContextValue = {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
    getCurrentUser,
    setUser,
    setIsAuthenticated,
    ...baseActions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
