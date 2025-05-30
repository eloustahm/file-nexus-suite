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

export const AppRoutes = ({ user }) => (
    console.log(1, user),
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Document />} />
        <Route path="/chat" element={<DocumentChat />} />
        <Route path="/generate" element={<DocumentGenerator />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);
