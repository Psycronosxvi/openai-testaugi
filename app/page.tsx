'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, UserPlus, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { addPoints, POINTS_CONFIG } from '@/lib/points';
import { AugiVisual } from '@/components/AugiVisual';
import { IntroSequence } from '@/components/IntroSequence';
import { PointsDisplay } from '@/components/PointsDisplay';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowLanding(true);
    setShowIntro(false);
  }, []);

  const handleLaunch = () => {
    try {
      // Award points for starting to use AUGI
      addPoints(POINTS_CONFIG.FEATURE_EXPLORATION, 'Started using AUGI');
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error launching interface:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-black fixed inset-0 overflow-hidden relative">
      {isLoaded && (showLanding ? (
        <div className="relative w-full h-full">
          {/* Auth Buttons */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-6 left-6 z-30 flex gap-4"
            >
              <Button
                onClick={() => router.push('/sign-in')}
                className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/sign-up')}
                className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </motion.div>
          )}

          <div className="absolute inset-0 z-0 bg-black">
            <AugiVisual />
          </div>
          
          <div className="relative z-20 min-h-screen flex flex-col items-center py-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center relative z-10"
            >
              <h1 className="text-7xl font-bold bg-gradient-to-r from-[#FF1B6B] to-[#00E5FF] bg-clip-text text-transparent cyber-glow mx-auto max-w-4xl mb-4">
                A.U.G.I System
              </h1>
              <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
                Artificial Universal General Intelligence
              </p>
            </motion.div>

            <div className="flex-1" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 space-y-6 mb-12"
            >
              <Button
                onClick={handleLaunch}
                className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 text-white px-16 py-8 text-2xl rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,27,107,0.3)] relative z-20"
              >
                Launch Interface <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[400px] grid-floor opacity-40" />
        </div>
      ) : (
        <motion.div 
          className="w-full h-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="fixed inset-0 z-0 bg-black">
            <AugiVisual />
          </div>
          {showIntro && (
            <IntroSequence onComplete={handleIntroComplete} />
          )}
          <PointsDisplay />
        </motion.div>
      ))}
    </div>
  );
}