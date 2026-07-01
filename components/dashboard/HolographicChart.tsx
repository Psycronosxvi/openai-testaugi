'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { XAxisProps, YAxisProps } from 'recharts';

// Initial data with zeros to prevent hydration mismatch
const initialData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 0,
}));

// Custom axis components with default parameters
const CustomXAxis = ({ stroke = "#4A4B5F", tick = { fill: "#4A4B5F" }, ...props }: XAxisProps) => (
  <XAxis stroke={stroke} tick={tick} {...props} />
);

const CustomYAxis = ({ stroke = "#4A4B5F", tick = { fill: "#4A4B5F" }, ...props }: YAxisProps) => (
  <YAxis stroke={stroke} tick={tick} {...props} />
);

export function HolographicChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData(
        Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          value: Math.floor(Math.random() * 100),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#232438] border-[#2A2B3F] p-6">
      <h3 className="text-xl font-bold text-[#00E5FF] mb-6">System Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CustomXAxis dataKey="time" />
            <CustomYAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2A2B3F',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              itemStyle={{ color: '#00E5FF' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00E5FF"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}