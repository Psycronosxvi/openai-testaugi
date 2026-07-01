'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { transferTempPoints } from './points';

export interface User {
  id: string;
  email: string;
  plan: 'free' | 'premium';
  augiTimeRemaining: number;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const DAILY_FREE_LIMIT = 30; // minutes
export const PREMIUM_DAILY_LIMIT = 300; // 5 hours

export const AUTH_REQUIRED_ROUTES = [
  'analytics',
  'security',
  'storage',
  'performance',
  'settings',
  'brain',
  'brain/health'
];

export const PUBLIC_ROUTES = [
  '',
  'dashboard',
  'features',
  'contact',
  'services'
];

const createGuestUser = (): User => ({
  id: `guest-${Math.random().toString(36).slice(2)}`,
  email: 'guest@example.com',
  plan: 'free',
  augiTimeRemaining: DAILY_FREE_LIMIT,
  lastLoginAt: new Date()
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        const lastLogin = new Date(parsedUser.lastLoginAt);
        const now = new Date();
        const hoursSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
          if (AUTH_REQUIRED_ROUTES.includes(pathname?.slice(1) || '')) {
            router.push('/sign-in');
          }
        } else {
          setUser({
            ...parsedUser,
            lastLoginAt: new Date(parsedUser.lastLoginAt)
          });
          setIsAuthenticated(true);
        }
      } else {
        // Create guest user by default
        const guestUser = createGuestUser();
        setUser(guestUser);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      const guestUser = createGuestUser();
      setUser(guestUser);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [pathname, router]);

  const signIn = async (email: string, password: string) => {
    try {
      const user = {
        id: Math.random().toString(36).slice(2),
        email,
        plan: 'free' as const,
        augiTimeRemaining: DAILY_FREE_LIMIT,
        lastLoginAt: new Date(),
        sessionExpiry: new Date(Date.now() + (24 * 60 * 60 * 1000)) // 24 hours from now
      };
      setUser(user);
      transferTempPoints(user.id);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const user = {
        id: Math.random().toString(36).slice(2),
        email,
        plan: 'free' as const,
        augiTimeRemaining: DAILY_FREE_LIMIT,
        lastLoginAt: new Date(),
        sessionExpiry: new Date(Date.now() + (24 * 60 * 60 * 1000)) // 24 hours from now
      };
      setUser(user);
      transferTempPoints(user.id);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}