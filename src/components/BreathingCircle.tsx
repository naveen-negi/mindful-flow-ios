import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BreathPhase } from '@/types/breathing';
import { cn } from '@/lib/utils';

interface BreathingCircleProps {
  phase: BreathPhase;
  timeRemaining: number;
  totalTime: number;
}

const BreathingCircle = ({ phase, timeRemaining, totalTime }: BreathingCircleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const progress = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  
  const inhaleInstructions = [
    "Inhale slowly through nose",
    "Begin by expanding the belly (diaphragmatic breathing)",
    "Then expand the ribs",
    "Finally fill the upper chest",
    "This is \"three-part breath\" or complete yogic breathing"
  ];
  
  const holdInstructions = [
    "At peak of inhalation, gently close the throat",
    "Keep chest expanded but relaxed",
    "Maintain stillness—no movement",
    "Don't \"trap\" air forcefully"
  ];
  
  const exhaleInstructions = [
    "Gently open the throat",
    "Exhale slowly through mouth",
    "Begin by releasing from upper chest",
    "Then ribs contract",
    "Finally pull navel toward spine (complete emptying)"
  ];
  
  // Calculate smooth scale based on phase
  const getCircleScale = () => {
    if (phase === 'inhale') {
      return 1.25;
    } else if (phase === 'hold') {
      return 1.25;
    } else if (phase === 'exhale') {
      return 0.75;
    }
    return 0.9;
  };
  
  const circleScale = getCircleScale();

  // Trigger fade-in animation when phase changes
  useEffect(() => {
    setIsVisible(false);
    setCurrentInstructionIndex(0);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [phase]);
  
  // Cycle through instructions during inhale, hold, and exhale phases
  useEffect(() => {
    if (phase === 'inhale' || phase === 'hold' || phase === 'exhale') {
      const instructions = 
        phase === 'inhale' ? inhaleInstructions : 
        phase === 'hold' ? holdInstructions :
        exhaleInstructions;
      
      // Longer duration per instruction so users have time to read
      const intervalDuration = Math.max((totalTime * 1000) / instructions.length, 3000);
      
      const interval = setInterval(() => {
        setCurrentInstructionIndex((prev) => (prev + 1) % instructions.length);
      }, intervalDuration);
      
      return () => clearInterval(interval);
    }
  }, [phase, totalTime]);
  
  
  const phaseConfig = {
    inhale: {
      color: 'hsl(var(--phase-inhale))',
      label: 'Breathe In (Nose)',
      scale: 'scale-110',
      glow: 'shadow-[0_0_50px_hsl(var(--phase-inhale)/0.2)]',
    },
    hold: {
      color: 'hsl(var(--phase-hold))',
      label: 'Hold',
      scale: 'scale-110',
      glow: 'shadow-[0_0_60px_hsl(var(--phase-hold)/0.25)]',
    },
    exhale: {
      color: 'hsl(var(--phase-exhale))',
      label: 'Breathe Out (Mouth)',
      scale: 'scale-95',
      glow: 'shadow-[0_0_50px_hsl(var(--phase-exhale)/0.2)]',
    },
    rest: {
      color: 'hsl(var(--muted))',
      label: 'Rest',
      scale: 'scale-95',
      glow: 'shadow-none',
    },
  };

  const config = phaseConfig[phase];
  
  const getCurrentInstruction = () => {
    if (phase === 'inhale') {
      return inhaleInstructions[currentInstructionIndex];
    } else if (phase === 'hold') {
      return holdInstructions[currentInstructionIndex];
    } else if (phase === 'exhale') {
      return exhaleInstructions[currentInstructionIndex];
    }
    return null;
  };
  
  const currentInstruction = getCurrentInstruction();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <motion.div
          className={cn(
            'absolute h-80 w-80 rounded-full',
            config.glow
          )}
          style={{
            backgroundColor: `${config.color}15`,
          }}
          animate={{
            scale: circleScale * 1.05,
          }}
          transition={{
            duration: phase === 'inhale' ? totalTime : phase === 'exhale' ? totalTime : 0.5,
            ease: "easeInOut",
          }}
        />
        
        {/* Main breathing circle */}
        <motion.div
          className="relative flex h-72 w-72 items-center justify-center rounded-full border-4"
          style={{
            backgroundColor: config.color,
            borderColor: 'hsl(0 0% 24% / 0.7)',
            boxShadow: `0 0 ${40 * circleScale}px ${config.color}40`,
          }}
          animate={{
            scale: circleScale,
          }}
          transition={{
            duration: phase === 'inhale' ? totalTime : phase === 'exhale' ? totalTime : 0.5,
            ease: "easeInOut",
          }}
        >
          <div 
            className={cn(
              "text-center transition-opacity duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-7xl font-serif font-semibold" style={{ color: '#f8f6f1' }}>
              {timeRemaining}
            </div>
            <div className="mt-3 text-sm font-sans font-medium uppercase tracking-widest" style={{ color: '#f8f6f1', opacity: 0.9 }}>
              {config.label}
            </div>
          </div>
        </motion.div>

        {/* Progress ring */}
        <svg
          className="absolute h-80 w-80 -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(0 0% 24%)"
            strokeWidth="1.5"
            opacity="0.15"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(0 0% 24%)"
            strokeWidth="1.5"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-300"
            opacity="0.6"
          />
        </svg>
      </div>
      
      {/* Instructional text below circle */}
      <div className="h-16 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {currentInstruction && (
            <motion.p
              key={`${phase}-${currentInstructionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-sm text-muted-foreground text-center font-sans max-w-md"
            >
              {currentInstruction}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BreathingCircle;
