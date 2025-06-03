
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Calendar } from "lucide-react";

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatar?: string;
}

interface ProfileHeaderProps {
  user: User | null;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
      <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
    </div>
  );
};

export const ProfileOverview = ({ user }: ProfileHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">Full Name</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-sm text-gray-500">Email Address</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-gray-400" />
          <div>
            <Badge className="bg-blue-100 text-blue-800">{user?.role || 'User'}</Badge>
            <p className="text-sm text-gray-500 mt-1">Account Role</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">January 2024</p>
            <p className="text-sm text-gray-500">Member Since</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
