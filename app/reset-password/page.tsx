'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Password reset logic here
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] p-6 flex items-center justify-center">
        <Card className="bg-[#232438] border-[#2A2B3F] p-8 w-full max-w-md text-center">
          <Mail className="w-12 h-12 text-[#00E5FF] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#00E5FF] mb-4">Check Your Email</h1>
          <p className="text-gray-400 mb-6">
            We've sent password reset instructions to your email address.
          </p>
          <Button
            onClick={() => router.push('/sign-in')}
            className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
          >
            Return to Sign In
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6 flex items-center justify-center">
      <Card className="bg-[#232438] border-[#2A2B3F] p-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/sign-in')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-[#00E5FF]">Reset Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <p className="text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2A2B3F] border-[#3A3B4F]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
          >
            Send Reset Instructions
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => router.push('/sign-in')}
              className="text-[#00E5FF] hover:text-[#00E5FF]/80"
            >
              Back to Sign In
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}