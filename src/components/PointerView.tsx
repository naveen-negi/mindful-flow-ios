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
    <div 
      className="flex min-h-screen flex-col items-center justify-between p-6 pb-safe pt-safe"
      style={{
        background: '#f8f6f1',
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)'
      }}
    >
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        {/* Round indicator */}
        <div className="text-center mb-12">
          <div className="text-xs font-sans text-muted-foreground mb-1 uppercase tracking-wider">Round</div>
          <div className="text-2xl font-serif font-semibold text-primary">
            {currentRound + 1} / {totalRounds}
          </div>
        </div>

        {/* Enso circle with pointer text */}
        <div className="relative w-full max-w-sm mb-12">
          {/* Hand-drawn enso circle */}
          <div className="absolute w-full max-w-[400px] aspect-square">
            <div 
              className="w-full h-full rounded-full"
              style={{
                border: '3px solid rgba(60, 60, 60, 0.15)',
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                transform: 'rotate(-45deg)'
              }}
            />
          </div>
          
          {/* Pointer text centered in enso */}
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
            <p 
              className="text-center font-serif leading-relaxed z-10"
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
        </div>

        {/* Continue button */}
        <Button
          onClick={onContinue}
          variant="default"
          className="rounded-full w-16 h-16 p-0"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default PointerView;
