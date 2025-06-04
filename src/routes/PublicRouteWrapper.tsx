
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PublicRoutes } from './PublicRoutes';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const PublicRouteWrapper = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" text="Loading..." />
            </div>
        );
    }

    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render public routes
    return <PublicRoutes isAuthenticated={false} />;
};
