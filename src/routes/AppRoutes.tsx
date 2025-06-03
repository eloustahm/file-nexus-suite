
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { NotFound } from '@/pages/NotFound';

export const AppRoutes = () => {
  const { user, isAuthenticated, loading, getCurrentUser } = useAuthStore();

  useEffect(() => {
    const hasTriedAuth = sessionStorage.getItem('auth_attempted');
    if (!user && !loading && !hasTriedAuth) {
      sessionStorage.setItem('auth_attempted', 'true');
      getCurrentUser().catch(() => {
        console.log('User not authenticated');
      });
    }
  }, [user, loading, getCurrentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
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
  );
};
