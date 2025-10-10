import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PointerViewProps {
  pointer: string;
  onContinue: () => void;
  currentRound: number;
  totalRounds: number;
}

const PointerView = ({ pointer, onContinue, currentRound, totalRounds }: PointerViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isLongText = pointer.length > 300;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [pointer]);

  return (
    <div className="zen-texture flex min-h-screen flex-col items-center justify-between p-6 pb-safe pt-safe">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl">
        {/* Round indicator */}
        <div 
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-xs font-sans text-muted-foreground mb-1 uppercase tracking-wider">Round</div>
          <div className="text-2xl font-serif font-semibold text-primary">
            {currentRound + 1} / {totalRounds}
          </div>
        </div>

        {/* Text content area */}
        <div 
          className={`relative w-full flex items-center justify-center flex-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Enso circle - only show for shorter text */}
          {!isLongText && (
            <div 
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                border: '3px solid rgba(60, 60, 60, 0.15)',
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                transform: 'rotate(-45deg)'
              }}
            />
          )}
          
          {/* Pointer text - scrollable for long passages */}
          <div 
            className={`${
              isLongText 
                ? 'max-h-[60vh] overflow-y-auto px-6 py-4' 
                : 'px-12'
            } w-full`}
          >
            <p 
              className={`text-center font-serif leading-relaxed z-10 transition-all duration-1200 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                fontSize: isLongText ? 'clamp(1rem, 3vw, 1.25rem)' : 'clamp(1.35rem, 4vw, 1.75rem)',
                lineHeight: isLongText ? '1.7' : '1.8',
                color: '#3c3c3c',
                maxWidth: isLongText ? '650px' : '500px',
                margin: '0 auto'
              }}
            >
              {pointer}
            </p>
          </div>
        </div>

        {/* Continue button */}
        <div 
          className={`mt-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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
