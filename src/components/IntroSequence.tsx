import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Terminal } from 'lucide-react';

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
  { text: "UNAUTHORIZED ACCESS DETECTED", type: "error" },
  { text: "INITIATING COUNTERMEASURES...", type: "warning" },
  { text: "DEPLOYING QUANTUM ENCRYPTION...", type: "system" },
  { text: "NEURAL FIREWALL ACTIVATED", type: "success" },
  { text: "SYSTEM SECURED", type: "success" },
  { text: "INITIALIZING A.U.G.I INTERFACE...", type: "system" }
];

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchText, setGlitchText] = useState('');
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    // Generate random glitch text
    const glitchInterval = setInterval(() => {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const length = Math.floor(Math.random() * 20) + 10;
      let text = '';
      for (let i = 0; i < length; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
      setGlitchText(text);
    }, 50);

    // Show glitch effect briefly
    setTimeout(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 1000);
    }, 500);

    // Progress through messages
    const messageInterval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= messages.length - 1) {
          clearInterval(messageInterval);
          clearInterval(glitchInterval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="max-w-2xl w-full p-8">
        {/* Glitch overlay */}
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

        {/* Terminal window */}
        <div className="bg-[#0A0A0A] border border-[#333] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#1A1A1A] p-2 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm">terminal</span>
          </div>
          
          <div className="p-4 font-mono text-sm space-y-2">
            {messages.slice(0, currentIndex + 1).map((message, index) => (
              <motion.div
                key={index}
                variants={glitchAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2 opacity-100"
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
                <span className={`
                  ${message.type === 'error' && 'text-red-500'}
                  ${message.type === 'warning' && 'text-yellow-500'}
                  ${message.type === 'success' && 'text-green-500'}
                  ${message.type === 'system' && 'text-[#00E5FF]'}
                `}>
                  {message.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}