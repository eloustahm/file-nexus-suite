
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user:  null;
  session:  null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState< null>(null);
  const [session, setSession] = useState< null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    // Listen for auth changes
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    // return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) throw error;
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       first_name: firstName,
    //       last_name: lastName,
    //     },
    //   },
    // });
    // if (error) throw error;
  };

  const signOut = async () => {
    // const { error } = await supabase.auth.signOut();
    // if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    // const { error } = await supabase.auth.resetPasswordForEmail(email);
    // if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
