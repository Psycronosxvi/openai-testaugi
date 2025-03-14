import { useState, useEffect } from 'react';
import { AuthContext, User, DAILY_FREE_LIMIT } from '../lib/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    const user: User = {
      id: Math.random().toString(36).slice(2),
      email,
      plan: 'free',
      augiTimeRemaining: DAILY_FREE_LIMIT,
      lastLoginAt: new Date()
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signUp = async (email: string, password: string) => {
    // Simulate API call
    const user: User = {
      id: Math.random().toString(36).slice(2),
      email,
      plan: 'free',
      augiTimeRemaining: DAILY_FREE_LIMIT,
      lastLoginAt: new Date()
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}