'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { HolographicChart } from '@/components/dashboard/HolographicChart';
import { Activity, Brain, Cpu, Server, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
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
        <h2 className="text-2xl font-bold text-[#00E5FF]">System Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'CPU Usage',
            value: '78%',
            icon: Cpu,
            change: '+2.5%',
            color: '#FF1B6B',
          },
          {
            title: 'Memory Load',
            value: '6.2GB',
            icon: Brain,
            change: '-0.8%',
            color: '#00E5FF',
          },
          {
            title: 'Network Traffic',
            value: '1.2TB',
            icon: Activity,
            change: '+15.3%',
            color: '#A742FF',
          },
          {
            title: 'Server Health',
            value: '99.9%',
            icon: Server,
            change: '+0.1%',
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
            <div
              className={`text-sm mt-2 ${
                metric.change.startsWith('+')
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {metric.change} from last week
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HolographicChart />
        <HolographicChart />
      </div>
    </div>
  );
}