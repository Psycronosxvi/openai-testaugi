'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account');
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
          <h1 className="text-3xl font-bold text-[#00E5FF]">Create Account</h1>
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

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-[#2A2B3F] border-[#3A3B4F]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/80 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </Button>

          <div className="text-center">
            <span className="text-gray-400">Already have an account?</span>{' '}
            <Button
              type="button"
              variant="link"
              onClick={() => router.push('/sign-in')}
              className="text-[#00E5FF] hover:text-[#00E5FF]/80"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}