
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoutes } from './ProtectedRoutes';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const ProtectedRouteWrapper = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Only show loading spinner if we're actually loading and haven't determined auth status yet
    if (isLoading && user === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" text="Checking authentication..." />
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render protected routes
    return <ProtectedRoutes />;
};
