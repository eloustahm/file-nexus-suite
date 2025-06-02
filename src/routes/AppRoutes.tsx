
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
import {Integrations} from "../pages/components/Integrations";
import {AIModules} from "../pages/components/AIModules";
import {DocumentSharing} from "../pages/components/DocumentSharing";
import {ActivityLogs} from "../pages/components/ActivityLogs";
import {TeamCollaboration} from "../pages/components/TeamCollaboration";
import {PricingPlans} from "../pages/components/PricingPlans";
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

    // Mock user for authenticated layout
    const mockUser = {
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
                // <ProtectedRoute>
                    <AuthenticatedLayout user={mockUser} />
                //</ProtectedRoute>
            }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Document />} />
                <Route path="/chat" element={<DocumentChat />} />
                <Route path="/generate" element={<DocumentGenerator />} />
                <Route path="/workflow" element={<Workflow />} />
                <Route path="/folders" element={<Folders />} />
                <Route path="/shared" element={<Shared />} />
                <Route path="/sharing" element={<DocumentSharing />} />
                <Route path="/activity" element={<ActivityLogs />} />
                <Route path="/team" element={<TeamCollaboration />} />
                <Route path="/pricing" element={<PricingPlans />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/ai-modules" element={<AIModules />} />
                <Route path="/profile" element={<UserProfile user={mockUser} />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
