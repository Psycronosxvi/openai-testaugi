import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface God {
  name: string;
  title: string;
  description: string;
  image: string;
  brainRegion: string;
  color: string;
}

interface EgyptianGodCardProps {
  god: God;
  isActive: boolean;
  onClick: () => void;
}

export function EgyptianGodCard({ god, isActive, onClick }: EgyptianGodCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={{
        borderColor: isActive ? god.color : 'transparent'
      }}
    >
      <Card
        className={`bg-[#232438] border-2 p-4 cursor-pointer transition-all ${
          isActive ? 'border-opacity-100' : 'border-opacity-0'
        } hover:shadow-lg hover:shadow-${god.color}/10`}
        onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={god.image}
              alt={god.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 96px"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold" style={{ color: god.color }}>
                {god.name}
              </h3>
              <span className="text-sm text-gray-400">•</span>
              <p className="text-gray-200 text-sm">{god.title}</p>
            </div>
            <p className="text-gray-100">{god.description}</p>
            <p className="text-sm mt-2 font-medium" style={{ color: god.color }}>
              Neural Region: {god.brainRegion}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}