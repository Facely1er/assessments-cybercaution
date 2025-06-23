import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { toast } from '../components/ui/Toaster';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/app');
      toast.success('Login successful', 'Welcome to CyberCaution');
    } catch (error) {
      toast.error('Login failed', error instanceof Error ? error.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg dark:shadow-none dark:border dark:border-muted animate-in fade-in">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-electric-blue/10 dark:bg-dark-electric/20 flex items-center justify-center">
            <img 
              src="/favicon.png" 
              alt="CyberCaution Logo"
              className="h-12 w-12 text-[#FF6B00]" 
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">CyberCaution<sup>™</sup></h2>
          <div className="text-sm text-muted-foreground">by ERMITS </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Enterprise Risk Management Solution
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 border-border bg-background text-foreground rounded-t-md py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 border-border bg-background text-foreground rounded-b-md py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-electric-blue focus:ring-electric-blue border-border rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-electric-blue hover:text-electric-blue/80">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-3"
              variant="orange"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Demo Credentials
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-center">
            <div className="border border-border rounded-md p-2">
              <p className="font-semibold text-foreground">Admin</p>
              <p className="text-foreground">john@example.com</p>
              <p className="text-muted-foreground">(any password)</p>
            </div>
            <div className="border border-border rounded-md p-2">
              <p className="font-semibold text-foreground">Risk Manager</p>
              <p className="text-foreground">jane@example.com</p>
              <p className="text-muted-foreground">(any password)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;