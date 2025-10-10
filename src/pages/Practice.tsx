import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BreathingCircle from '@/components/BreathingCircle';
import PointerView from '@/components/PointerView';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';
import { BreathingRatio } from '@/types/breathing';
import { savePracticeSession, getSettings } from '@/utils/storage';
import { getRandomPointer } from '@/data/pointers';
import { Pause, Play, X } from 'lucide-react';

const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = getSettings();
  
  const { ratio, rounds } = location.state as { ratio: BreathingRatio; rounds: number } || {
    ratio: settings.defaultRatio,
    rounds: 10,
  };

  const [startTime] = useState(Date.now());
  const [isPaused, setIsPaused] = useState(false);
  const [shownPointerIndices, setShownPointerIndices] = useState<number[]>([]);
  const [currentPointer, setCurrentPointer] = useState<string>('');

  const {
    isActive,
    currentPhase,
    currentRound,
    timeRemaining,
    isComplete,
    isPausedBetweenRounds,
    start,
    pause,
    resume,
    reset,
    continueToNextRound,
  } = useBreathingTimer(ratio, rounds, settings.hapticEnabled);

  // Show pointer when paused between rounds
  useEffect(() => {
    if (isPausedBetweenRounds) {
      const { text, index } = getRandomPointer(shownPointerIndices);
      setCurrentPointer(text);
      setShownPointerIndices(prev => [...prev, index]);
    }
  }, [isPausedBetweenRounds]);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (isComplete) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const session = {
        id: Date.now().toString(),
        date: new Date(),
        ratio,
        roundsCompleted: rounds,
        roundsPlanned: rounds,
        duration,
      };
      savePracticeSession(session);
    }
  }, [isComplete, startTime, ratio, rounds]);

  const handlePause = () => {
    pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    resume();
    setIsPaused(false);
  };

  const handleEnd = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const session = {
      id: Date.now().toString(),
      date: new Date(),
      ratio,
      roundsCompleted: currentRound,
      roundsPlanned: rounds,
      duration,
    };
    savePracticeSession(session);
    navigate('/');
  };

  const totalPhaseTime = 
    currentPhase === 'inhale' ? ratio.inhale :
    currentPhase === 'hold' ? ratio.hold :
    currentPhase === 'exhale' ? ratio.exhale : 2;

  if (!location.state) {
    return null;
  }

  return (
    <div className="zen-texture flex min-h-screen flex-col items-center justify-between p-6 pb-safe pt-safe">
      {!isActive && !isComplete && !isPausedBetweenRounds && (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <Card className="border bg-card p-10 text-center max-w-md rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">Ready to Begin</h2>
            <p className="text-muted-foreground mb-8 font-sans leading-relaxed">
              Take a moment to find a comfortable position. Close your eyes when ready.
            </p>
            <div className="rounded-xl bg-muted/30 p-5 mb-8 border border-foreground/5">
              <p className="text-sm font-sans text-foreground/60 mb-3 uppercase tracking-wide">Practice Settings</p>
              <div className="text-xl font-serif font-semibold text-foreground">
                {ratio.inhale}:{ratio.hold}:{ratio.exhale} × {rounds} rounds
              </div>
            </div>
            <Button
              onClick={start}
              className="w-full py-6 text-lg font-medium rounded-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Begin Practice
            </Button>
          </Card>
        </div>
      )}

      {isPausedBetweenRounds && (
        <PointerView
          pointer={currentPointer}
          onContinue={continueToNextRound}
          currentRound={currentRound}
          totalRounds={rounds}
        />
      )}

      {isActive && !isComplete && !isPausedBetweenRounds && (
        <div className="flex flex-col items-center justify-between flex-1 w-full max-w-md">
          <div className="flex justify-between items-center w-full mb-8">
            <Button
              onClick={handleEnd}
              variant="destructive"
              size="sm"
              className="rounded-lg font-sans"
            >
              <X className="mr-1 h-4 w-4" />
              Exit Session
            </Button>
            <div className="text-center">
              <div className="text-xs font-sans text-muted-foreground mb-1 uppercase tracking-wider">Round</div>
              <div className="text-3xl font-serif font-semibold text-primary">
                {currentRound + 1} / {rounds}
              </div>
            </div>
          </div>

          <BreathingCircle
            phase={currentPhase}
            timeRemaining={timeRemaining}
            totalTime={totalPhaseTime}
          />

        </div>
      )}

      {isComplete && (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <Card className="border bg-card p-10 text-center max-w-md rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="mb-8">
              <div className="text-6xl mb-6">🙏</div>
              <h2 className="text-3xl font-serif font-semibold mb-3 text-foreground">
                Practice Complete
              </h2>
              <p className="text-muted-foreground font-sans">
                You completed {rounds} rounds
              </p>
            </div>

            <div className="rounded-xl bg-muted/30 p-5 mb-8 border border-foreground/5">
              <p className="text-sm font-sans text-foreground/60 mb-3 uppercase tracking-wide">Session Summary</p>
              <div className="text-xl font-serif font-semibold text-foreground">
                {ratio.inhale}:{ratio.hold}:{ratio.exhale} × {rounds} rounds
              </div>
              <div className="text-sm text-muted-foreground mt-2 font-sans">
                {Math.floor((Date.now() - startTime) / 1000 / 60)} minutes
              </div>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full py-6 text-lg font-medium rounded-xl"
            >
              Return Home
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Practice;
