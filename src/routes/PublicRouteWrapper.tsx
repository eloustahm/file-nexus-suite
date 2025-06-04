
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PublicRoutes } from './PublicRoutes';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const PublicRouteWrapper = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Show loading only during initial auth check
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" text="Loading..." />
            </div>
        );
    }

    // If authenticated, redirect to dashboard
    if (isAuthenticated && user) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render public routes (including landing page)
    return <PublicRoutes isAuthenticated={isAuthenticated} />;
};
