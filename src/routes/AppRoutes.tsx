
import { Routes, Route } from "react-router-dom";
import {Dashboard} from "../pages/components/Dashboard";
import {DocumentChat} from "../pages/components/Document/DocumentChat";
import {DocumentGenerator} from "../pages/components/Document/DocumentGenerator";
import {Document} from "../pages/components/Document/Document";
import {Folders} from "../pages/components/Folders";
import {Shared} from "../pages/components/Shared";
import {Settings} from "../pages/components/Settings";
import {UserProfile} from "../pages/components/UserProfile";
import {Workflow} from "../pages/components/Workflow";
import {PaymentPage} from "../pages/components/PaymentPage";
import NotFound from "../pages/NotFound";
import {AuthenticatedLayout} from "@/pages/layouts/AuthenticatedLayout.tsx";
import {GuestLayout} from "@/pages/layouts/GuestLayout.tsx";
import {LandingPage} from "@/pages/LandingPage.tsx";
import {LoginPage} from "@/pages/auth/LoginPage.tsx";
import {RegisterPage} from "@/pages/auth/RegisterPage.tsx";
import {ForgotPasswordPage} from "@/pages/auth/ForgotPasswordPage.tsx";
import {ResetPasswordPage} from "@/pages/auth/ResetPasswordPage.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute";
import {useAuth} from "@/contexts/AuthContext";

export const AppRoutes = () => {
    const { user } = useAuth();

    // Mock user for authenticated layout when user is logged in
    const mockUser = user ? {
        name: user.user_metadata?.first_name + ' ' + user.user_metadata?.last_name || user.email || 'User',
        email: user.email || '',
        role: user.user_metadata?.role || 'User',
        avatar: user.user_metadata?.avatar_url || "/placeholder.svg",
    } : {
        name: "John Doe",
        email: "john@example.com",
        role: "Editor",
        avatar: "/placeholder.svg",
    };


    return (
        <Routes>
            {/* Guest routes */}
            <Route element={<GuestLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Authenticated routes */}
            <Route element={
                <ProtectedRoute>
                    <AuthenticatedLayout user={mockUser} />
                </ProtectedRoute>
            }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Document />} />
                <Route path="/chat" element={<DocumentChat />} />
                <Route path="/generate" element={<DocumentGenerator />} />
                <Route path="/workflow" element={<Workflow />} />
                <Route path="/folders" element={<Folders />} />
                <Route path="/shared" element={<Shared />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<UserProfile user={mockUser} />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
