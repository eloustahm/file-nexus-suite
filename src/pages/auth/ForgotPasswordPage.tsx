
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle, KeyRound } from 'lucide-react';
import { authApi } from '@/services/api';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authApi.resetPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50 p-8">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="h-12 border-gray-200 hover:bg-gray-50"
                    >
                      Try another email
                    </Button>
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Back to sign in
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Back link */}
          <div>
            <Link to="/login" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <KeyRound className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset password</h2>
            <p className="text-gray-600">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                  ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send reset link
                      </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};
