
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, Shield, Smartphone, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OTPSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const secretKey = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DocuFlow:user@example.com?secret=${secretKey}&issuer=DocuFlow`;

  const handleEnable2FA = () => {
    setStep(2);
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setStep(3);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  const handleDisable2FA = () => {
    setIsEnabled(false);
    setStep(1);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled.",
    });
  };

  if (step === 1 && !isEnabled) {
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
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Enhanced Security</h4>
                <p className="text-sm text-blue-700">
                  Protect your account with time-based one-time passwords (TOTP)
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">What you'll need:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                An authenticator app (Google Authenticator, Authy, etc.)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                Your mobile device to scan the QR code
              </li>
            </ul>
          </div>

          <Button onClick={handleEnable2FA} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Enable Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Set Up Two-Factor Authentication</CardTitle>
          <CardDescription>
            Scan the QR code with your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={qrCodeUrl} alt="QR Code" className="border rounded-lg" />
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code with your authenticator app
            </p>
          </div>

          <div className="space-y-2">
            <Label>Or enter this key manually:</Label>
            <div className="flex items-center gap-2">
              <Input value={secretKey} readOnly className="font-mono" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(secretKey)}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">
              Enter verification code from your app:
            </Label>
            <Input
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="font-mono text-center text-lg"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleVerify} disabled={verificationCode.length !== 6}>
              Verify & Enable
            </Button>
            <Button variant="outline" onClick={() => setStep(1)}>
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
          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
        </CardTitle>
        <CardDescription>
          Your account is protected with two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-green-900">2FA Active</h4>
              <p className="text-sm text-green-700">
                Your account is secured with two-factor authentication
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Recovery Options:</h4>
          <Button variant="outline" className="w-full justify-start">
            <Key className="h-4 w-4 mr-2" />
            Download Recovery Codes
          </Button>
        </div>

        <Button variant="destructive" onClick={handleDisable2FA} className="w-full">
          Disable Two-Factor Authentication
        </Button>
      </CardContent>
    </Card>
  );
};
