import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth';
import { AUTH_REQUIRED_ROUTES } from '../lib/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const requiresAuth = AUTH_REQUIRED_ROUTES.includes(pathname || '');
      
      if (requiresAuth && !user) { 
        router.push('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex items-center justify-center">
        <div className="text-[#00E5FF] animate-pulse">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}