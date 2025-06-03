
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatar?: string;
}

interface ProfileFormProps {
  user: User | null;
  loading: boolean;
  onSaveProfile: (formData: FormData) => void;
}

export const ProfileForm = ({ user, loading, onSaveProfile }: ProfileFormProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onSaveProfile(formData);
        }}>
          <div className="flex items-center gap-6">
            <img 
              src={user?.avatar || '/placeholder.svg'} 
              alt={user?.firstName || 'User'}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <Button variant="outline" size="sm" type="button">
                <Edit className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-sm text-gray-500 mt-1">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName"
                defaultValue={user?.firstName || ""} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName"
                defaultValue={user?.lastName || ""} 
                className="mt-1" 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              defaultValue={user?.email || ""} 
              className="mt-1" 
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className="mt-1" 
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
