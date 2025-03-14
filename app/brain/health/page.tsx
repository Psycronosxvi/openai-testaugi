'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Activity, Heart, Brain, Thermometer, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

interface VitalSign {
  name: string;
  value: number;
  unit: string;
  icon: any;
  color: string;
  range: {
    min: number;
    max: number;
  };
}

export default function BrainHealthPage() {
  const router = useRouter();
  const [heartSound, setHeartSound] = useState<Howl | null>(null);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: 'Neural Activity',
      value: 98,
      unit: 'Hz',
      icon: Brain,
      color: '#00E5FF',
      range: { min: 80, max: 120 }
    },
    {
      name: 'Heart Rate',
      value: 75,
      unit: 'bpm',
      icon: Heart,
      color: '#FF1B6B',
      range: { min: 60, max: 100 }
    },
    {
      name: 'Blood Pressure',
      value: 120,
      unit: 'mmHg',
      icon: Activity,
      color: '#A742FF',
      range: { min: 90, max: 140 }
    },
    {
      name: 'Temperature',
      value: 37.2,
      unit: '°C',
      icon: Thermometer,
      color: '#FFB800',
      range: { min: 36.1, max: 37.8 }
    },
    {
      name: 'Oxygen Level',
      value: 98,
      unit: '%',
      icon: Wind,
      color: '#4DFF4D',
      range: { min: 95, max: 100 }
    }
  ]);

  useEffect(() => {
    // Initialize heartbeat sound
    const sound = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2883/2883-preview.mp3'],
      loop: true,
      volume: 0.5
    });
    setHeartSound(sound);
    sound.play();

    // Cleanup
    return () => {
      sound.stop();
      sound.unload();
    };
  }, []);

  useEffect(() => {
    // Simulate vital signs updates
    const interval = setInterval(() => {
      setVitalSigns(prev => prev.map(sign => ({
        ...sign,
        value: sign.value + (Math.random() * 2 - 1) * (sign.range.max - sign.range.min) * 0.02
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, range: { min: number; max: number }) => {
    if (value < range.min || value > range.max) return '#FF1B6B';
    return '#4DFF4D';
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/brain')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold text-[#00E5FF]">Neural Health Monitor</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {vitalSigns.map((sign, index) => (
            <AnimatePresence key={sign.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-[#232438] border-[#2A2B3F] p-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent to-[#00E5FF]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <sign.icon className="w-6 h-6" style={{ color: sign.color }} />
                      <h3 className="text-lg font-bold">{sign.name}</h3>
                    </div>
                    
                    <div className="text-3xl font-bold mb-2" style={{ color: sign.color }}>
                      {sign.value.toFixed(1)}
                      <span className="text-sm text-gray-400 ml-1">{sign.unit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: getStatusColor(sign.value, sign.range) }}
                      />
                      <span className="text-sm text-gray-400">
                        Range: {sign.range.min} - {sign.range.max} {sign.unit}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#232438] border-[#2A2B3F] p-6 h-[400px]">
            <h3 className="text-xl font-bold text-[#00E5FF] mb-4">Neural Activity</h3>
            {/* Add brain wave visualization here */}
          </Card>

          <Card className="bg-[#232438] border-[#2A2B3F] p-6 h-[400px]">
            <h3 className="text-xl font-bold text-[#00E5FF] mb-4">Heart Rate Monitor</h3>
            {/* Add heart rate visualization here */}
          </Card>
        </div>
      </div>
    </div>
  );
}