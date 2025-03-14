import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertCircle, BarChart3, Box, Cpu, MessageSquare, Settings, Shield, Wrench } from 'lucide-react';
import { useState } from 'react';

export const sidebarItems = [
  { icon: Activity, label: 'Overview', href: '/' },
  { icon: MessageSquare, label: 'AUGI Chat', href: '/dashboard' },
  { icon: Box, label: '3D Shapes', href: '/shapes' },
  { icon: Wrench, label: 'Services', href: '/services' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Shield, label: 'Security', href: '/security' },
  { icon: Cpu, label: 'Performance', href: '/performance' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href: string | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Don't navigate away from dashboard if we're already there
    if (href === '/dashboard' && location.pathname === '/dashboard') {
      return;
    }
    
    // Handle navigation based on conditions
    if (!href || href === '#') {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
    } else {
      navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 bg-[#232438] border-r border-[#2A2B3F] flex flex-col items-center py-8 gap-8 fixed h-full">
        <div className="w-12 h-12 bg-[#FF1B6B] rounded-xl flex items-center justify-center">
          <Box className="w-6 h-6" />
        </div>
        <nav className="flex flex-col gap-6">
          {sidebarItems.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className={`w-12 h-12 rounded-xl flex items-center justify-center
                transition-colors duration-200 group
                ${location.pathname === item.href
                  ? 'bg-[#2A2B3F] text-[#00E5FF]' 
                  : 'hover:bg-[#2A2B3F]'
                }
                ${!item.href ? 'cursor-pointer' : ''}`}
              onClick={(e) => handleNavClick(item.href, e)}
            >
              <item.icon 
                className={`w-6 h-6 ${
                  location.pathname === item.href
                    ? 'text-[#00E5FF]'
                    : 'text-gray-100 group-hover:text-[#00E5FF]'
                }`}
              />
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        {/* Top Bar */}
        <header className="h-16 bg-[#232438] border-b border-[#2A2B3F] flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF1B6B] to-[#00E5FF] bg-clip-text text-transparent">
              A.U.G.I Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
              <span className="text-gray-100">System Online</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-[#2A2B3F] transition-colors">
              <AlertCircle className="w-5 h-5 text-[#FF1B6B]" />
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img
                src="https://picsum.photos/200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>
        {showComingSoon && (
          <div className="fixed top-4 right-4 bg-[#2A2B3F] text-[#00E5FF] px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
            Coming Soon
          </div>
        )}
        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}