import { Card } from '../ui/card';
import { Activity, Database, Signal } from 'lucide-react';

interface DataPoint {
  value: number;
  timestamp: string;
  type: string;
}

interface DataOverlayProps {
  data: DataPoint[];
}

export function DataOverlay({ data }: DataOverlayProps) {
  const latestData = data[data.length - 1];

  return (
    <Card className="absolute top-6 left-6 bg-black/50 backdrop-blur-lg border-[#00F5D4]/20 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-[#39FF14]" />
          <div>
            <p className="text-sm text-gray-400">Activity Level</p>
            <p className="text-lg font-bold text-[#39FF14]">
              {latestData?.value.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Signal className="w-5 h-5 text-[#B14EFF]" />
          <div>
            <p className="text-sm text-gray-400">Signal Strength</p>
            <p className="text-lg font-bold text-[#B14EFF]">
              {(Math.random() * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-[#00F5D4]" />
          <div>
            <p className="text-sm text-gray-400">Data Points</p>
            <p className="text-lg font-bold text-[#00F5D4]">
              {data.length}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}