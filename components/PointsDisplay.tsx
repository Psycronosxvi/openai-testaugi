'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Star, TrendingUp } from 'lucide-react';
import { getPoints, PointsState, POINTS_CONFIG } from '@/lib/points';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function PointsDisplay() {
  const { user } = useAuth();
  const router = useRouter();
  const [points, setPoints] = useState<PointsState>({ totalPoints: 0, transactions: [] });
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [shouldShowPrompt, setShouldShowPrompt] = useState(false);

  useEffect(() => {
    const updatePoints = () => {
      const currentPoints = getPoints(user?.id || null);
      setPoints(currentPoints);
    };

    updatePoints();
    const interval = setInterval(updatePoints, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    // Only show prompt after 5 minutes if user has points and is not logged in
    if (!user || user.email === 'guest@example.com' && points.totalPoints > 50) {
      const timer = setTimeout(() => {
        setShouldShowPrompt(true);
        setShowSavePrompt(true);
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(timer);
    };
  }, [user, points.totalPoints]);

  if (!shouldShowPrompt && points.totalPoints === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      <AnimatePresence>
        {showSavePrompt && shouldShowPrompt && points.totalPoints >= 50 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#232438] border-[#2A2B3F] p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-[#FFB800]" />
                <p className="text-sm text-white">
                  {user?.email === 'guest@example.com' 
                    ? `Save your ${points.totalPoints} points!` 
                    : `You've earned ${points.totalPoints} points!`}
                </p>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Create an account to save your progress and unlock exclusive features.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push('/sign-up')}
                  className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-sm"
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowSavePrompt(false)}
                  className="text-sm"
                >
                  Later
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative group"
        >
          <Card className="bg-[#232438] border-[#2A2B3F] p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#FFB800]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{points.totalPoints}</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-gray-400">AUGI Points</p>
              </div>
            </div>
          </Card>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#232438] border border-[#2A2B3F] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h4 className="font-medium text-sm mb-2">Earn Points</h4>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Chat with AUGI: {POINTS_CONFIG.CHAT_MESSAGE} points</li>
              <li>• Voice Commands: {POINTS_CONFIG.VOICE_INTERACTION} points</li>
              <li>• Upload Files: {POINTS_CONFIG.FILE_UPLOAD} points</li>
              <li>• Long Conversations: {POINTS_CONFIG.LONG_CONVERSATION} points</li>
              <li>• Daily Login: {POINTS_CONFIG.DAILY_LOGIN} points</li>
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      {showSavePrompt && (
        <Card className="bg-[#232438] border-[#2A2B3F] p-4 shadow-lg animate-bounce">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-[#FFB800]" />
            <p className="text-sm text-white">Save your points!</p>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Create an account to keep your {points.totalPoints} points and unlock rewards.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/sign-up')}
              className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-sm"
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowSavePrompt(false)}
              className="text-sm"
            >
              Later
            </Button>
          </div>
        </Card>
      )}

      <Card className="bg-[#232438] border-[#2A2B3F] p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-[#FFB800]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{points.totalPoints}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-gray-400">AUGI Points</p>
          </div>
        </div>
      </Card>
    </div>
  );
}