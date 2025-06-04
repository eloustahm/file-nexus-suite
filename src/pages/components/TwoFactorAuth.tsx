
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Smartphone, Key, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const secretKey = 'JBSWY3DPEHPK3PXP'; // Mock secret key
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DocuFlow%20AI:user@example.com?secret=${secretKey}&issuer=DocuFlow%20AI`;

  const handleEnable2FA = async () => {
    setIsSetupMode(true);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const codes = Array.from({ length: 10 }, () => 
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );
      setBackupCodes(codes);
    }, 1000);
  };

  const handleVerifySetup = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      setIsEnabled(true);
      setIsSetupMode(false);
      toast.success('Two-factor authentication enabled successfully!');
    }, 1000);
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsEnabled(false);
      setBackupCodes([]);
      toast.success('Two-factor authentication disabled');
    }, 1000);
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    toast.success('Backup codes copied to clipboard');
  };

  if (isSetupMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Set Up Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Follow these steps to secure your account with 2FA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Step 1: Install an authenticator app</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Download an authenticator app like Google Authenticator, Authy, or 1Password.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Step 2: Scan the QR code</h3>
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src={qrCodeUrl} 
                  alt="2FA QR Code" 
                  className="border rounded-lg"
                />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Can't scan? Enter this code manually:
                  </p>
                  <code className="bg-muted px-2 py-1 rounded text-sm">{secretKey}</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Step 3: Enter verification code</h3>
              <div className="space-y-2">
                <Label htmlFor="verification-code">6-digit code from your app</Label>
                <Input
                  id="verification-code"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {backupCodes.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Important: Save these backup codes</p>
                  <p className="text-sm">
                    Store these codes in a safe place. You can use them to access your account if you lose your phone.
                  </p>
                  <div className="bg-muted p-3 rounded mt-2">
                    <div className="grid grid-cols-2 gap-1 text-sm font-mono">
                      {backupCodes.map((code, index) => (
                        <div key={index}>{code}</div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyBackupCodes}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Codes
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button onClick={handleVerifySetup} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Enable 2FA'}
            </Button>
            <Button variant="outline" onClick={() => setIsSetupMode(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an app to generate verification codes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEnabled && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Enabled
              </Badge>
            )}
            <Switch
              checked={isEnabled}
              onCheckedChange={isEnabled ? handleDisable2FA : handleEnable2FA}
              disabled={isLoading}
            />
          </div>
        </div>

        {isEnabled && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">Recovery Options</h4>
              <Button variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                Regenerate Backup Codes
              </Button>
              <p className="text-xs text-muted-foreground">
                Generate new backup codes and invalidate old ones
              </p>
            </div>
          </>
        )}

        {!isEnabled && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your account is not protected by two-factor authentication. 
              Enable 2FA to significantly improve your account security.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
