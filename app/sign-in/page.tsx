'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6 flex items-center justify-center">
      <Card className="bg-[#232438] border-[#2A2B3F] p-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-[#00E5FF]">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#2A2B3F] border-[#3A3B4F]"
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-[#2A2B3F] border-[#3A3B4F]"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="rounded border-[#3A3B4F] bg-[#2A2B3F]"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>

            <Button
              type="button"
              variant="link"
              onClick={() => router.push('/reset-password')}
              className="text-[#00E5FF] hover:text-[#00E5FF]/80"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Button
              type="button"
              variant="link"
              onClick={() => router.push('/sign-up')}
              className="text-[#00E5FF] hover:text-[#00E5FF]/80"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}