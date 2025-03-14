'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Activity, Award, BarChart3, Bell, Box, Brain, Cpu, Database, Home, LogIn, LogOut, MapPin, MessageSquare, Settings, Shield, User, UserPlus, Wrench, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AUTH_REQUIRED_ROUTES, PUBLIC_ROUTES, useAuth } from '@/lib/auth';
import { getPoints } from '@/lib/points';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

const sidebarItems = [
  { icon: MessageSquare, label: 'AUGI Chat', href: '/dashboard' },
  { icon: Brain, label: 'Neural Health', href: '/brain/health' },
  { icon: Box, label: '3D Shapes', href: '/shapes' },
  { icon: Wrench, label: 'Services', href: '/services' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Shield, label: 'Security', href: '/security' },
  { icon: Database, label: 'Storage', href: '/storage' },
  { icon: Cpu, label: 'Performance', href: '/performance' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  
  const notifications = [
    { id: 1, title: 'System Update', message: 'Neural network optimization complete', time: '2m ago' },
    { id: 2, title: 'Security Alert', message: 'Quantum encryption protocols updated', time: '5m ago' },
    { id: 3, title: 'Performance', message: 'System efficiency increased by 15%', time: '10m ago' }
  ];

  const handleNavClick = (href: string | undefined) => {
    if (!href) return;
    
    const targetPath = href === '/' ? '' : href.slice(1);
    const currentPath = pathname?.slice(1) || '';
    
    // Don't navigate if we're already on the page
    if (targetPath === currentPath) return;

    // Check if it's a valid route 
    if (![...AUTH_REQUIRED_ROUTES, ...PUBLIC_ROUTES].includes(targetPath)) {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
      return;
    }

    router.push(href);
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 bg-[#232438] border-r border-[#2A2B3F] flex flex-col items-center py-8 gap-8">
        <Button
          variant="ghost"
          className="w-12 h-12 bg-[#232438] border border-[#FF1B6B] rounded-xl relative overflow-hidden group animate-pulse p-0"
          onClick={() => router.push('/dashboard')}
        >
          <div className="absolute inset-0 bg-[#FF1B6B] opacity-10 group-hover:opacity-30 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-2 h-2 bg-[#FF1B6B] rounded-full animate-ping pointer-events-none" />
          </div>
          <Activity className="w-6 h-6 text-[#FF1B6B] relative z-10 pointer-events-none" />
        </Button>
        <nav className="flex flex-col gap-6">
          {sidebarItems.map((item, index) => (
            <Button
              variant="ghost"
              size="icon"
              key={index}
              onClick={() => item.href && handleNavClick(item.href)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center
                transition-colors duration-200 group
                ${pathname === item.href 
                  ? 'bg-[#2A2B3F] text-[#00E5FF]' 
                  : 'hover:bg-[#2A2B3F]'
                }`}
            >
              <item.icon 
                className={`w-6 h-6 ${
                  pathname === item.href
                    ? 'text-[#00E5FF]'
                    : 'text-gray-100 group-hover:text-[#00E5FF]'
                }`}
              />
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="h-16 bg-[#232438] border-b border-[#2A2B3F] flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            {pathname !== '/dashboard' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF] mr-2"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF1B6B] to-[#00E5FF] bg-clip-text text-transparent">
              A.U.G.I Dashboard
            </h1>
            <div className="h-4 w-px bg-[#2A2B3F] mx-4" />
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
              <span className="text-gray-400">System Online</span>
              {user && (
                <div className="flex items-center gap-2 ml-4">
                  <Award className="w-4 h-4 text-[#FFB800]" />
                  <span className="text-[#FFB800] font-medium">
                    {getPoints(user.id).totalPoints} Points
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Welcome back!</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    signOut();
                    router.push('/');
                  }}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#FF1B6B] flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push('/sign-up')}
                  className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
              title="Home"
            >
              <Home className="w-5 h-5" />
            </Button>
            
            <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF] relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF1B6B] rounded-full text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
            
            {showNotifications && (
              <Card className="absolute top-12 right-0 w-80 bg-[#232438] border-[#2A2B3F] p-4 z-50">
                <h3 className="text-lg font-bold mb-4 text-[#00E5FF]">Notifications</h3>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-[#2A2B3F] rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            </div>
            
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              {user ? (
                <div className="w-full h-full bg-[#2A2B3F] flex items-center justify-center group cursor-pointer"
                  onClick={() => router.push('/settings')}
                >
                  <User className="w-5 h-5 text-[#00E5FF] group-hover:scale-110 transition-transform" />
                </div>
              ) : (
                <div className="w-full h-full bg-[#2A2B3F] flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </header>

        {showComingSoon && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2A2B3F] text-[#00E5FF] px-6 py-4 rounded-lg shadow-lg animate-fade-in-out z-50 flex items-center gap-3">
            <Activity className="w-5 h-5 animate-pulse" />
            Coming Soon
          </div>
        )}

        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}