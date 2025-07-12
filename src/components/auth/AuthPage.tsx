import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from '../ui/Toaster';

type AuthMode = 'login' | 'signup' | 'forgotPassword';

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success('Login successful', 'Welcome back!');
        navigate('/dashboard');
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast.error('Error', 'Passwords do not match');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        toast.success('Account created', 'Please check your email to verify your account');
        setMode('login');
      } else if (mode === 'forgotPassword') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;

        toast.success('Reset link sent', 'Please check your email to reset your password');
        setMode('login');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error('Authentication failed', error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-background py-12">
      <div className="m-auto max-w-md w-full px-4">
        <Link to="/" className="inline-flex items-center mb-8 text-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border dark:border-muted">
          <CardHeader>
            <div className="flex justify-center mb-6">
              <img src="/cybercaution.png" alt="CyberCaution Logo" className="h-16 w-16" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-center">
              {mode === 'login' 
                ? 'Sign in to your CyberCaution account' 
                : mode === 'signup' 
                  ? 'Join CyberCaution and enhance your security' 
                  : 'Enter your email to receive a reset link'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full rounded-md border border-input bg-background py-2 px-3"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {mode !== 'forgotPassword' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full rounded-md border border-input bg-background py-2 px-3 pr-10"
                      placeholder="••••••••"
                      required={mode !== 'forgotPassword'}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 w-full rounded-md border border-input bg-background py-2 px-3 pr-10"
                      placeholder="••••••••"
                      required={mode === 'signup'}
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                variant="orange"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Processing...'
                ) : mode === 'login' ? (
                  <><LogIn className="mr-2 h-4 w-4" /> Sign In</>
                ) : mode === 'signup' ? (
                  <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>
                ) : (
                  'Send Reset Link'
                )}
              </Button>

              {mode === 'login' && (
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setMode('forgotPassword')}
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="text-center text-sm">
                {mode === 'login' ? (
                  <div>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-primary hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;