
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

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { payment } = useRequestContext();

  const handlePushToGithub = async () => {
    // Simulate pushing to GitHub
    console.log("Pushing code to GitHub...");
    // Add your GitHub integration logic here
  };

  const handlePayment = async () => {
    await payment.execute(async () => {
      // Simulate payment processing
      return new Promise(resolve => setTimeout(() => resolve({ success: true }), 2000));
    });
    setShowPaymentDialog(false);
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
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
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
                Current plan: {user.role}
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
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
