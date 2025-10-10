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
    <div className="flex min-h-screen flex-col items-center justify-between bg-background p-6 pb-safe pt-safe">
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
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-auto opacity-10"
            style={{ filter: 'blur(0.3px)' }}
          >
            <path
              d="M 100,20 
                 C 140,20 170,40 180,70
                 C 190,100 185,130 170,155
                 C 155,175 130,185 100,185
                 C 70,185 45,175 30,155
                 C 15,130 10,100 20,70
                 C 28,45 50,25 80,22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-foreground"
            />
          </svg>
          
          {/* Pointer text centered in enso */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <p className="text-center font-serif text-xl md:text-2xl leading-relaxed text-foreground">
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
