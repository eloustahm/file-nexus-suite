// src/routes/AppRoutes.tsx

import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { ProtectedRouteWrapper } from './ProtectedRouteWrapper';
import { PublicRouteWrapper } from './PublicRouteWrapper';
import { NotFound } from '@/pages/NotFound';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const AppRoutes = () => {
  const { user, loading, getCurrentUser } = useAuthStore();

  // Only call getCurrentUser once per full page load
  // const triedFetchRef = useRef(false);

  // useEffect(() => {
  //   if (!triedFetchRef.current && !user && !loading) {
  //     triedFetchRef.current = true;
  //     getCurrentUser().catch(() => {
  //       console.log('User not authenticated');
  //     });
  //   }
  // }, [user, loading, getCurrentUser]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size="lg" text="Loading application..." />
        </div>
    );
  }

  return (
      <ErrorBoundary>
        <Routes>
          {/* Protected dashboard routes - only available if authenticated */}
          <Route path="/dashboard/*" element={<ProtectedRouteWrapper />} />

          {/* All public routes: /login, /register, /forgot-password, etc. */}
          <Route path="/*" element={<PublicRouteWrapper />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
  );
};
