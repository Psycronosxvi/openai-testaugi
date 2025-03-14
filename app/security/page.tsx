'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { HolographicChart } from '@/components/dashboard/HolographicChart';
import { AlertCircle, Lock, Shield, ShieldAlert, ShieldCheck, ShieldQuestion, Siren, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dashboard')}
          className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-[#00E5FF]">Security Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Threat Level',
            value: 'Low',
            metric: '2 Alerts',
            icon: ShieldCheck,
            color: '#00E5FF',
          },
          {
            title: 'Active Attacks',
            value: '0',
            metric: '-2 last hour',
            icon: ShieldAlert,
            color: '#FF1B6B',
          },
          {
            title: 'System Health',
            value: '98%',
            metric: '+2% uptime',
            icon: Shield,
            color: '#A742FF',
          },
          {
            title: 'Vulnerabilities',
            value: '3',
            metric: '2 critical',
            icon: ShieldQuestion,
            color: '#FFB800',
          },
        ].map((metric, index) => (
          <Card
            key={index}
            className="bg-[#232438] border-[#2A2B3F] p-6 relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
              style={{
                background: `linear-gradient(45deg, transparent, ${metric.color})`,
              }}
            />
            <metric.icon
              className="w-8 h-8 mb-4"
              style={{ color: metric.color }}
            />
            <h3 className="text-gray-400 text-sm">{metric.title}</h3>
            <div className="text-2xl font-bold mt-2">{metric.value}</div>
            <div className="text-sm mt-2 text-gray-400">
              {metric.metric}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#232438] border-[#2A2B3F] p-6">
          <h3 className="text-xl font-bold text-[#00E5FF] mb-6">Attack Patterns</h3>
          <HolographicChart />
        </Card>

        <Card className="bg-[#232438] border-[#2A2B3F] p-6">
          <h3 className="text-xl font-bold text-[#00E5FF] mb-6">Security Events</h3>
          <div className="space-y-4">
            {[
              {
                title: 'Unauthorized Access Attempt',
                time: '2 minutes ago',
                severity: 'critical',
                icon: AlertCircle,
              },
              {
                title: 'Firewall Rule Updated',
                time: '15 minutes ago',
                severity: 'normal',
                icon: Lock,
              },
              {
                title: 'System Scan Completed',
                time: '1 hour ago',
                severity: 'normal',
                icon: Shield,
              },
              {
                title: 'Suspicious Activity Detected',
                time: '2 hours ago',
                severity: 'warning',
                icon: Siren,
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-[#2A2B3F] group hover:bg-[#2A2B3F]/80 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    event.severity === 'critical'
                      ? 'bg-red-500/20'
                      : event.severity === 'warning'
                      ? 'bg-yellow-500/20'
                      : 'bg-emerald-500/20'
                  }`}
                >
                  <event.icon
                    className={`w-5 h-5 ${
                      event.severity === 'critical'
                        ? 'text-red-500'
                        : event.severity === 'warning'
                        ? 'text-yellow-500'
                        : 'text-emerald-500'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}