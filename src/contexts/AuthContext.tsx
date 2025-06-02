
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {login , csrf  , getCurrentUser , logout} from '@/services/auth.tsx'


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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await csrf();
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signIn = async (email: string, password: string) => {

    try {
      await login({ email, password }).then((r)=>console.log(r));
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err: any) {

       throw err;
    }
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
      try {
        await logout();
        setUser(null);
      } catch (err: any) {
        console.error('Logout failed:', err);
      }
    };



  const resetPassword = async (email: string) => {
    // const { error } = await supabase.auth.resetPasswordForEmail(email);
    // if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
