import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';

interface MetricsCardProps {
  title: string;
  value: number;
  change: number;
  color: string;
}

export function MetricsCard({ title, value, change, color }: MetricsCardProps) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prev) => prev + Math.random() * 2 - 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-[#232438] border-[#2A2B3F] relative overflow-hidden group">
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: `linear-gradient(45deg, transparent, ${color})`,
        }}
      />
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <div className="text-2xl font-bold mb-2">
        {currentValue.toFixed(2)}
        <span className="text-sm ml-1">units</span>
      </div>
      <div
        className={`text-sm ${
          change >= 0 ? 'text-emerald-400' : 'text-red-400'
        }`}
      >
        {change >= 0 ? '+' : ''}
        {change}% from last period
      </div>
    </Card>
  );
}