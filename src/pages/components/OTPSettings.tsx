
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Smartphone, Shield, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OTPSettings = () => {
  const { toast } = useToast();
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes] = useState([
    "ABC123DEF", "GHI456JKL", "MNO789PQR", "STU012VWX", "YZA345BCD"
  ]);

  const handleEnableOTP = () => {
    if (!verificationCode) {
      toast({
        title: "Verification Required",
        description: "Please enter the verification code from your authenticator app.",
        variant: "destructive",
      });
      return;
    }

    setOtpEnabled(true);
    toast({
      title: "Two-Factor Authentication Enabled",
      description: "Your account is now secured with 2FA.",
    });
  };

  const handleDisableOTP = () => {
    setOtpEnabled(false);
    toast({
      title: "Two-Factor Authentication Disabled",
      description: "2FA has been removed from your account.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable 2FA</Label>
              <p className="text-sm text-gray-500">
                Require a code from your phone to sign in
              </p>
            </div>
            <Switch
              checked={otpEnabled}
              onCheckedChange={otpEnabled ? handleDisableOTP : undefined}
            />
          </div>

          {!otpEnabled && (
            <div className="space-y-4">
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  Download an authenticator app like Google Authenticator or Authy to get started.
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <QrCode className="h-12 w-12 text-gray-400" />
                  <div>
                    <h4 className="font-medium">Scan QR Code</h4>
                    <p className="text-sm text-gray-600">
                      Use your authenticator app to scan this code
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="verification">Verification Code</Label>
                  <Input
                    id="verification"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className="mt-1"
                  />
                </div>

                <Button onClick={handleEnableOTP} className="w-full">
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>
          )}

          {otpEnabled && (
            <div className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Two-factor authentication is currently enabled for your account.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Key className="h-4 w-4" />
                    Backup Codes
                  </CardTitle>
                  <CardDescription>
                    Save these codes in a safe place. You can use them to access your account if you lose your phone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded font-mono text-sm">
                        {code}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4">
                    Generate New Codes
                  </Button>
                </CardContent>
              </Card>

              <Button variant="destructive" onClick={handleDisableOTP}>
                Disable Two-Factor Authentication
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
