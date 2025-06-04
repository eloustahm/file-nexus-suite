
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const WelcomeBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.firstName || 'there';

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Welcome Back
              </Badge>
            </div>
            <h2 className="text-2xl font-bold">
              Hello, {firstName}! 👋
            </h2>
            <p className="text-blue-100">
              Ready to manage your documents with AI assistance?
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/dashboard/documents/chat')}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Start Chatting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
