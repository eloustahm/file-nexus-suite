
import { Routes, Route } from "react-router-dom";
import {Dashboard} from "../pages/components/Dashboard";
import {DocumentChat} from "../pages/components/Document/DocumentChat";
import {DocumentGenerator} from "../pages/components/Document/DocumentGenerator";
import {Document} from "../pages/components/Document/Document";
import {Folders} from "../pages/components/Folders";
import {Shared} from "../pages/components/Shared";
import {Settings} from "../pages/components/Settings";
import {UserProfile} from "../pages/components/UserProfile";
import NotFound from "../pages/NotFound";
import {AuthenticatedLayout} from "@/pages/layouts/AuthenticatedLayout.tsx";
import {GuestLayout} from "@/pages/layouts/GuestLayout.tsx";
import {LandingPage} from "@/pages/LandingPage.tsx";
import {LoginPage} from "@/pages/auth/LoginPage.tsx";
import {RegisterPage} from "@/pages/auth/RegisterPage.tsx";
import {ForgotPasswordPage} from "@/pages/auth/ForgotPasswordPage.tsx";
import {ResetPasswordPage} from "@/pages/auth/ResetPasswordPage.tsx";

export const AppRoutes = ({ user }) => (
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
        <Route element={<AuthenticatedLayout user={user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Document />} />
            <Route path="/chat" element={<DocumentChat />} />
            <Route path="/generate" element={<DocumentGenerator />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/folders" element={<Folders />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<UserProfile user={user} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
