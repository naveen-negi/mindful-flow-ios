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
      label: 'Breathe Out',
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

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          className={cn(
            'absolute h-80 w-80 rounded-full transition-all duration-1000 ease-in-out',
            config.glow
          )}
          style={{
            backgroundColor: `${config.color}15`,
            transform: phase === 'inhale' || phase === 'hold' ? 'scale(1.15)' : 'scale(1)',
          }}
        />
        
        {/* Main breathing circle */}
        <div
          className={cn(
            'relative flex h-72 w-72 items-center justify-center rounded-full transition-all duration-1000 ease-in-out border-4',
            config.scale
          )}
          style={{
            backgroundColor: config.color,
            borderColor: 'hsl(0 0% 24% / 0.7)',
            boxShadow: `0 0 40px ${config.color}40`,
          }}
        >
          <div className="text-center">
            <div className="text-7xl font-serif font-semibold" style={{ color: '#f8f6f1' }}>
              {timeRemaining}
            </div>
            <div className="mt-3 text-sm font-sans font-medium uppercase tracking-widest" style={{ color: '#f8f6f1', opacity: 0.9 }}>
              {config.label}
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default BreathingCircle;
