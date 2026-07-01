import { useState, useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';
import { AugiVisual } from './AugiVisual';
import { AlertTriangle, Shield, Terminal, Lock, Unlock } from 'lucide-react';

const glitchAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.1 }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.1 }
  }
};

const messages = [
  { text: "⚠️ CRITICAL SECURITY BREACH DETECTED!", type: "error", delay: 1000 },
  { text: "🔓 UNAUTHORIZED ACCESS ATTEMPT AT PORT 443", type: "error", delay: 500 },
  { text: "⚡ MALICIOUS PAYLOAD DETECTED", type: "error", delay: 500 },
  { text: "🛡️ INITIATING DEFENSE PROTOCOLS...", type: "warning", delay: 800 },
  { text: "🔒 ACTIVATING QUANTUM ENCRYPTION...", type: "system", delay: 600 },
  { text: "🧠 NEURAL DEFENSE MATRIX ONLINE", type: "warning", delay: 600 },
  { text: "⚔️ COUNTERATTACK SEQUENCE INITIATED", type: "system", delay: 800 },
  { text: "✨ QUANTUM TUNNELS ESTABLISHED", type: "system", delay: 600 },
  { text: "🔥 THREAT ELIMINATION IN PROGRESS", type: "warning", delay: 800 },
  { text: "✅ NEURAL FIREWALL ACTIVATED", type: "success", delay: 600 },
  { text: "🎯 ALL THREATS NEUTRALIZED", type: "success", delay: 800 },
  { text: "🚀 INITIALIZING A.U.G.I INTERFACE...", type: "system", delay: 1000 }
];

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchText, setGlitchText] = useState('');
  const [showGlitch, setShowGlitch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hackProgress, setHackProgress] = useState(0);
  const [defenseProgress, setDefenseProgress] = useState(0);
  const [sound] = useState(() => new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2883/2883-preview.mp3'],
    volume: 0.5,
  }));
  const intervalRef = useRef<NodeJS.Timeout>();
  const glitchIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Play sound
    sound.play();

    // Initial glitch effect
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), 1000);

    // Setup glitch text animation
    glitchIntervalRef.current = setInterval(() => {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const length = Math.floor(Math.random() * 20) + 10;
      let text = '';
      for (let i = 0; i < length; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
      setGlitchText(text);
    }, 50);

    // Progress through messages
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex < messages.length) {
          if (messages[prev].type === 'error') {
            setHackProgress(p => Math.min(100, p + 25));
          } else if (messages[prev].type === 'success') {
            setDefenseProgress(p => Math.min(100, p + 40));
          }
          return newIndex;
        } else {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return prev;
        }
      });
    }, 800);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(glitchIntervalRef.current);
      sound.unload();
    };
  }, [onComplete, sound]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
    >
      <div className="max-w-2xl w-full p-8">
        {/* AUGI Avatar */}
        <div className="mb-8 h-[200px] relative">
          <AugiVisual />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        </div>

        {/* Progress Bars */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-[#FF1B6B] flex items-center">
                <Unlock className="w-4 h-4 mr-1" /> Hack Attempt
              </span>
              <span className="text-[#FF1B6B]">{hackProgress}%</span>
            </div>
            <div className="h-2 bg-[#2A2B3F] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF1B6B]"
                initial={{ width: 0 }}
                animate={{ width: `${hackProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-[#00E5FF] flex items-center">
                <Shield className="w-4 h-4 mr-1" /> Defense Systems
              </span>
              <span className="text-[#00E5FF]">{defenseProgress}%</span>
            </div>
            <div className="h-2 bg-[#2A2B3F] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00E5FF]"
                initial={{ width: 0 }}
                animate={{ width: `${defenseProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showGlitch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center text-[#00E5FF] font-mono text-sm overflow-hidden"
              style={{ mixBlendMode: 'screen' }}
            >
              {glitchText}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#0A0A0A] border border-[#2A2B3F] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#1A1A1A] p-2 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm">terminal</span>
          </div>
          
          <div className="p-4 font-mono text-sm space-y-2">
            <div className="relative z-10 space-y-2">
            {messages.slice(0, currentIndex + 1).map((message, index) => (
              <motion.div
                key={index}
                variants={glitchAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2"
              >
                {message.type === 'error' && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                {message.type === 'warning' && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                {message.type === 'success' && (
                  <Shield className="w-4 h-4 text-green-500" />
                )}
                {message.type === 'system' && (
                  <Terminal className="w-4 h-4 text-[#00E5FF]" />
                )}
                <span className={`font-bold ${
                  message.type === 'error' ? 'text-red-500' :
                  message.type === 'warning' ? 'text-yellow-500' :
                  message.type === 'success' ? 'text-green-500' :
                  message.type === 'system' ? 'text-[#00E5FF]' : ''
                }`}>
                  {message.text}
                </span>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}