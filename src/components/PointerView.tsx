import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PointerViewProps {
  pointer: string;
  onContinue: () => void;
  currentRound: number;
  totalRounds: number;
}

const PointerView = ({ pointer, onContinue, currentRound, totalRounds }: PointerViewProps) => {
  return (
    <div className="zen-texture flex min-h-screen flex-col items-center justify-between p-6 pb-safe pt-safe animate-in fade-in-50 duration-700">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        {/* Round indicator */}
        <div className="text-center mb-12 animate-in fade-in-50 duration-500">
          <div className="text-xs font-sans text-muted-foreground mb-1 uppercase tracking-wider">Round</div>
          <div className="text-2xl font-serif font-semibold text-primary">
            {currentRound + 1} / {totalRounds}
          </div>
        </div>

        {/* Enso circle with pointer text */}
        <div className="relative w-full max-w-md flex items-center justify-center">
          {/* Hand-drawn enso circle */}
          <div 
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none animate-in fade-in-50 duration-700"
            style={{
              border: '3px solid rgba(60, 60, 60, 0.15)',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              transform: 'rotate(-45deg)'
            }}
          />
          
          {/* Pointer text centered */}
          <p 
            className="text-center font-serif leading-relaxed z-10 px-12 animate-in fade-in-50 duration-1000"
            style={{
              fontSize: 'clamp(1.35rem, 4vw, 1.75rem)',
              lineHeight: '1.8',
              color: '#3c3c3c',
              maxWidth: '500px'
            }}
          >
            {pointer}
          </p>
        </div>

        {/* Continue button */}
        <div className="mt-12 animate-in fade-in-50 duration-700">
          <Button
            onClick={onContinue}
            variant="default"
            className="rounded-full w-16 h-16 p-0"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PointerView;
