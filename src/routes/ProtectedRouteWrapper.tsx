
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoutes } from './ProtectedRoutes';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const ProtectedRouteWrapper = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Show loading only during initial auth check
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" text="Checking authentication..." />
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Render protected routes
    return <ProtectedRoutes />;
};
