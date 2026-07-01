'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { HolographicChart } from '@/components/dashboard/HolographicChart';
import { Database, HardDrive, Save, Server, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoragePage() {
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
        <h2 className="text-2xl font-bold text-[#00E5FF]">Storage Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Storage',
            value: '2.4TB',
            metric: '60% used',
            icon: HardDrive,
            color: '#FF1B6B',
          },
          {
            title: 'Available Space',
            value: '956.8GB',
            metric: '40% free',
            icon: Save,
            color: '#00E5FF',
          },
          {
            title: 'Database Size',
            value: '845GB',
            metric: '+2.3% growth',
            icon: Database,
            color: '#A742FF',
          },
          {
            title: 'Backup Status',
            value: 'Synced',
            metric: '2 hours ago',
            icon: Server,
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
          <h3 className="text-xl font-bold text-[#00E5FF] mb-6">Storage Usage</h3>
          <HolographicChart />
        </Card>

        <Card className="bg-[#232438] border-[#2A2B3F] p-6">
          <h3 className="text-xl font-bold text-[#00E5FF] mb-6">Storage Distribution</h3>
          <div className="space-y-4">
            {[
              { name: 'System Files', size: '512GB', percentage: 70 },
              { name: 'User Data', size: '845GB', percentage: 45 },
              { name: 'Applications', size: '256GB', percentage: 85 },
              { name: 'Media Files', size: '768GB', percentage: 30 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.name}</span>
                  <span className="font-medium">{item.size}</span>
                </div>
                <div className="h-2 bg-[#2A2B3F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E5FF] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-[#232438] border-[#2A2B3F] p-6">
        <h3 className="text-xl font-bold text-[#00E5FF] mb-6">Recent Storage Activities</h3>
        <div className="space-y-4">
          {[
            {
              name: 'System Backup',
              size: '1.2TB',
              status: 'completed',
              time: '2 hours ago',
            },
            {
              name: 'Database Optimization',
              size: '845GB',
              status: 'in_progress',
              time: 'Running...',
            },
            {
              name: 'Log Files Cleanup',
              size: '25GB',
              status: 'scheduled',
              time: 'In 30 minutes',
            },
            {
              name: 'Media Files Sync',
              size: '156GB',
              status: 'failed',
              time: '1 hour ago',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-[#2A2B3F]"
            >
              <div className="flex items-center gap-4">
                <Upload className="w-5 h-5 text-[#00E5FF]" />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-sm ${
                  item.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : item.status === 'in_progress'
                    ? 'bg-blue-500/20 text-blue-500'
                    : item.status === 'scheduled'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {item.time}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === 'completed'
                      ? 'bg-emerald-400'
                      : item.status === 'in_progress'
                      ? 'bg-blue-400'
                      : item.status === 'scheduled'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}