'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { AUTH_REQUIRED_ROUTES } from '@/lib/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      setIsValidating(true);
      
      const currentPath = pathname?.slice(1) || '';
      const requiresAuth = AUTH_REQUIRED_ROUTES.includes(currentPath);
      const savedUser = localStorage.getItem('user');
      
      if (requiresAuth) {
        if (!savedUser) {
          router.push('/sign-in');
          setIsValidating(false);
          return;
        }

        try {
          const parsedUser = JSON.parse(savedUser);
          const sessionExpiry = new Date(parsedUser.sessionExpiry);
          
          if (Date.now() > sessionExpiry.getTime()) {
            localStorage.removeItem('user');
            router.push('/sign-in');
            setIsValidating(false);
            return;
          }
        } catch (error) {
          console.error('Error validating session:', error);
          localStorage.removeItem('user');
          router.push('/sign-in');
          setIsValidating(false);
          return;
        }
      }
      
      setIsValidating(false);
    };

    if (!isLoading) {
      validateSession();
    }
  }, [isLoading, pathname, router]);

  if (isLoading || isValidating) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex items-center justify-center">
        <div className="text-[#00E5FF] animate-pulse">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}