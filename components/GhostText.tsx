'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

interface GhostTextProps {
  text: string;
  speed?: number; // milliseconds per character
  glowColor?: string;
  className?: string;
  onComplete?: () => void;
  soundEnabled?: boolean;
}

export function GhostText({
  text,
  speed = 50,
  glowColor = '#00E5FF',
  className = '',
  onComplete,
  soundEnabled = true
}: GhostTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState<Howl | null>(null);
  const [isGlowing, setIsGlowing] = useState(true);

  useEffect(() => {
    if (soundEnabled) {
      const typingSound = new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2883/2883-preview.mp3'],
        volume: 0.15,
        rate: 2.5,
      });
      setSound(typingSound);
    }

    // Add glow effect interval
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1000);

    return () => {
      if (sound) {
        sound.unload();
      }
      clearInterval(glowInterval);
    };
  }, [soundEnabled]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        if (sound) {
          sound.play();
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, sound, onComplete]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0, 1, 0.8],
              y: 0,
              filter: isGlowing 
                ? [
                    `drop-shadow(0 0 2px ${glowColor}) drop-shadow(0 0 4px ${glowColor})`,
                    `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 12px ${glowColor})`,
                    `drop-shadow(0 0 2px ${glowColor}) drop-shadow(0 0 4px ${glowColor})`
                  ]
                : `drop-shadow(0 0 2px ${glowColor})`
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block relative"
            style={{
              animationDelay: `${index * 0.1}s`,
              textShadow: `0 0 ${isGlowing ? '8px' : '4px'} ${glowColor}`
            }}
          >
            {char}
            <span 
              className="absolute inset-0 animate-pulse"
              style={{
                opacity: isGlowing ? 0.4 : 0.2,
                filter: `blur(4px)`,
                color: glowColor
              }}
            >
              {char}
            </span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}