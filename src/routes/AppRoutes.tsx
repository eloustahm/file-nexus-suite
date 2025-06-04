
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { NotFound } from '@/pages/NotFound';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const AppRoutes = () => {
  const { user, isAuthenticated, loading, getCurrentUser } = useAuthStore();

  useEffect(() => {
    // Only try to get current user if we don't have user data and we're not already loading
    if (!user && !loading) {
      const hasTriedAuth = sessionStorage.getItem('auth_attempted');
      if (!hasTriedAuth) {
        sessionStorage.setItem('auth_attempted', 'true');
        getCurrentUser().catch(() => {
          console.log('User not authenticated - redirecting to login');
        });
      }
    }
  }, [user, loading, getCurrentUser]);

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
        {/* Protected Routes - Show first if authenticated */}
        {isAuthenticated && (
          <Route path="/dashboard/*" element={<ProtectedRoutes />} />
        )}
        
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes isAuthenticated={isAuthenticated} />} />
        
        {/* Default redirect for authenticated users */}
        {isAuthenticated && (
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        )}
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};
