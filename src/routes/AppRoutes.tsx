
import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRouteWrapper } from './ProtectedRouteWrapper';
import { PublicRouteWrapper } from './PublicRouteWrapper';
import { NotFound } from '@/pages/NotFound';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const AppRoutes = () => {
  const { user, isLoading, getCurrentUser } = useAuth();
  const triedFetchRef = useRef(false);

  useEffect(() => {
    const authAttempted = sessionStorage.getItem('auth_attempted');
    if (
        !triedFetchRef.current &&
        !user &&
        !isLoading &&
        authAttempted === 'true'
    ) {
      triedFetchRef.current = true;
      getCurrentUser().catch(() => {
        console.log('User not authenticated');
      });
    }
  }, [user, isLoading, getCurrentUser]);

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size="lg" text="Loading application…" />
        </div>
    );
  }

  return (
      <Routes>
        <Route path="/dashboard/*" element={<ProtectedRouteWrapper />} />
        <Route path="/*" element={<PublicRouteWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};
