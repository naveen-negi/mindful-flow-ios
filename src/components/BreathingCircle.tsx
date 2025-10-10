import { BreathPhase } from '@/types/breathing';
import { cn } from '@/lib/utils';

interface BreathingCircleProps {
  phase: BreathPhase;
  timeRemaining: number;
  totalTime: number;
}

const BreathingCircle = ({ phase, timeRemaining, totalTime }: BreathingCircleProps) => {
  const progress = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  
  const phaseConfig = {
    inhale: {
      color: 'hsl(var(--phase-inhale))',
      label: 'Breathe In',
      scale: 'scale-150',
      glow: 'shadow-[0_0_60px_hsl(var(--phase-inhale)/0.5)]',
    },
    hold: {
      color: 'hsl(var(--phase-hold))',
      label: 'Hold',
      scale: 'scale-150',
      glow: 'shadow-[0_0_80px_hsl(var(--phase-hold)/0.6)]',
    },
    exhale: {
      color: 'hsl(var(--phase-exhale))',
      label: 'Breathe Out',
      scale: 'scale-100',
      glow: 'shadow-[0_0_60px_hsl(var(--phase-exhale)/0.5)]',
    },
    rest: {
      color: 'hsl(var(--muted))',
      label: 'Rest',
      scale: 'scale-100',
      glow: 'shadow-none',
    },
  };

  const config = phaseConfig[phase];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          className={cn(
            'absolute h-64 w-64 rounded-full transition-all duration-1000 ease-in-out',
            config.glow
          )}
          style={{
            backgroundColor: `${config.color}20`,
            transform: phase === 'inhale' || phase === 'hold' ? 'scale(1.2)' : 'scale(1)',
          }}
        />
        
        {/* Main breathing circle */}
        <div
          className={cn(
            'relative flex h-48 w-48 items-center justify-center rounded-full transition-all duration-1000 ease-in-out',
            config.scale
          )}
          style={{
            backgroundColor: config.color,
            boxShadow: `0 0 40px ${config.color}80`,
          }}
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-white">
              {timeRemaining}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/90">
              {config.label}
            </div>
          </div>
        </div>

        {/* Progress ring */}
        <svg
          className="absolute h-56 w-56 -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-300"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default BreathingCircle;
