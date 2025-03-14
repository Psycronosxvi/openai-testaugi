'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BrainVisualization } from '@/components/visualization/BrainVisualization';
import { EgyptianGodCard } from '@/components/visualization/EgyptianGodCard';

const egyptianGods = [
  {
    name: 'Ra',
    title: 'God of Creation',
    description: 'Associated with creation and life force, representing the Cortex\'s role in higher consciousness and perception.',
    image: '/images/gods/ra.jpg',
    brainRegion: 'Cortex',
    color: '#FFD700'
  },
  {
    name: 'Thoth',
    title: 'God of Knowledge',
    description: 'Associated with intellect and cognition, symbolizing the Prefrontal Cortex\'s role in decision-making and planning.',
    image: '/images/gods/thoth.jpg',
    brainRegion: 'Prefrontal Cortex',
    color: '#4B0082'
  },
  {
    name: 'Isis',
    title: 'Goddess of Memory',
    description: 'Symbolizing the Hippocampus\'s role in memory formation and spatial navigation.',
    image: '/images/gods/isis.jpg',
    brainRegion: 'Hippocampus',
    color: '#00CED1'
  },
  {
    name: 'Sekhmet',
    title: 'Goddess of Power',
    description: 'Representing the Amygdala\'s role in processing emotions and fear responses.',
    image: '/images/gods/sekhmet.jpg',
    brainRegion: 'Amygdala',
    color: '#FF4500'
  },
  {
    name: 'Horus',
    title: 'God of Balance',
    description: 'Symbolizing the Cerebellum\'s role in coordination and motor control.',
    image: '/images/gods/horus.jpg',
    brainRegion: 'Cerebellum',
    color: '#32CD32'
  },
  {
    name: 'Anubis',
    title: 'Guide of Signals',
    description: 'Representing the Thalamus\'s role as a relay station for sensory information.',
    image: '/images/gods/anubis.jpg',
    brainRegion: 'Thalamus',
    color: '#9370DB'
  },
  {
    name: 'Osiris',
    title: 'Lord of Life',
    description: 'Symbolizing the Medulla Oblongata\'s control of vital functions.',
    image: '/images/gods/osiris.jpg',
    brainRegion: 'Medulla Oblongata',
    color: '#CD853F'
  },
  {
    name: 'Bastet',
    title: 'Guardian of Habits',
    description: 'Representing the Basal Ganglia\'s role in habit formation and motor control.',
    image: '/images/gods/bastet.jpg',
    brainRegion: 'Basal Ganglia',
    color: '#8B008B'
  },
  {
    name: 'Ptah',
    title: 'Crafter of Vision',
    description: 'Symbolizing the Optic Nerve\'s role in visual processing.',
    image: '/images/gods/ptah.jpg',
    brainRegion: 'Optic Nerve',
    color: '#4682B4'
  },
  {
    name: 'Amun',
    title: 'Bridge of Thought',
    description: 'Representing the Corpus Callosum\'s role in connecting brain hemispheres.',
    image: '/images/gods/amun.jpg',
    brainRegion: 'Corpus Callosum',
    color: '#BA55D3'
  }
];

export default function BrainPage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold text-[#00E5FF]">Neural Pantheon</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 min-h-[800px]">
          <Card className="bg-[#232438] border-[#2A2B3F] p-6 h-[800px] sticky top-6">
            <h2 className="text-2xl font-bold text-[#00E5FF] mb-6">Divine Neural Network</h2>
            <BrainVisualization
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />
            {selectedRegion && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 p-4 rounded-lg">
                <h3 className="text-[#00E5FF] font-bold mb-2">{selectedRegion}</h3>
                <p className="text-gray-300 text-sm">
                  Click and drag to rotate. Scroll to zoom.
                </p>
              </div>
            )}
          </Card>

          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {egyptianGods.map((god) => (
              <EgyptianGodCard
                key={god.name}
                god={god}
                isActive={selectedRegion === god.brainRegion}
                onClick={() => setSelectedRegion(god.brainRegion)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}