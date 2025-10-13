import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PointerViewProps {
  pointer: string;
  onContinue: () => void;
  currentRound: number;
  totalRounds: number;
}

const PointerView = ({ pointer, onContinue, currentRound, totalRounds }: PointerViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [pointer]);

  return (
    <div className="zen-texture flex min-h-screen flex-col items-center justify-between p-6 pb-safe pt-safe">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        {/* Exit button */}
        <div className="w-full flex justify-start mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="destructive"
            size="sm"
            className="rounded-lg font-sans"
          >
            <X className="mr-1 h-4 w-4" />
            Exit Session
          </Button>
        </div>

        {/* Round indicator */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-xs font-sans text-muted-foreground mb-1 uppercase tracking-wider">Round</div>
          <div className="text-2xl font-serif font-semibold text-primary">
            {currentRound + 1} / {totalRounds}
          </div>
        </div>

        {/* Enso circle with pointer text */}
        <div 
          className={`relative w-full max-w-md flex items-center justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Hand-drawn enso circle */}
          <div 
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              border: '3px solid rgba(60, 60, 60, 0.15)',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              transform: 'rotate(-45deg)'
            }}
          />
          
          {/* Pointer text centered */}
          <p 
            className={`text-center font-serif leading-relaxed z-10 px-12 transition-all duration-1200 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
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
        <div 
          className={`mt-12 transition-all duration-700 delay-500 ${
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
