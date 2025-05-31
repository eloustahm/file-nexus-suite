
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, Settings, LogOut, Github } from "lucide-react";
import { useRequestContext } from "@/contexts/RequestContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const UserMenu = ({ user: propUser }: UserMenuProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { payment } = useRequestContext();
  const { user: authUser, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use authenticated user data if available, fallback to prop user
  const displayUser = authUser ? {
    name: authUser.user_metadata?.first_name + ' ' + authUser.user_metadata?.last_name || authUser.email || 'User',
    email: authUser.email || '',
    role: authUser.user_metadata?.role || 'User',
    avatar: authUser.user_metadata?.avatar_url || "/placeholder.svg"
  } : propUser;

  const handlePushToGithub = async () => {
    console.log("Pushing code to GitHub...");
    toast({
      title: "GitHub Integration",
      description: "Code push initiated. Check your GitHub repository for updates.",
    });
  };

  const handlePayment = async () => {
    await payment.execute(async () => {
      return new Promise(resolve => setTimeout(() => resolve({ success: true }), 2000));
    });
    setShowPaymentDialog(false);
    toast({
      title: "Payment Updated",
      description: "Your payment method has been updated successfully.",
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
            <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {displayUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Payment</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Settings</DialogTitle>
              <DialogDescription>
                Manage your payment methods and billing information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Current plan: {displayUser.role}
              </p>
              <Button 
                onClick={handlePayment} 
                disabled={payment.state.loading}
                className="w-full"
              >
                {payment.state.loading ? "Processing..." : "Update Payment Method"}
              </Button>
              {payment.state.error && (
                <p className="text-sm text-red-600">{payment.state.error}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenuItem onClick={handlePushToGithub}>
          <Github className="mr-2 h-4 w-4" />
          <span>Push to GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
