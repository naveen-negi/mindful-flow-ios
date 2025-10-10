import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BreathingCircle from '@/components/BreathingCircle';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';
import { BreathingRatio } from '@/types/breathing';
import { savePracticeSession, getSettings } from '@/utils/storage';
import { Pause, Play, X, RotateCcw } from 'lucide-react';

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

  const {
    isActive,
    currentPhase,
    currentRound,
    timeRemaining,
    isComplete,
    start,
    pause,
    resume,
    reset,
  } = useBreathingTimer(ratio, rounds, settings.hapticEnabled);

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
      feeling: 'stopped_early' as const,
    };
    savePracticeSession(session);
    navigate('/session-complete', { state: { session } });
  };

  const totalPhaseTime = 
    currentPhase === 'inhale' ? ratio.inhale :
    currentPhase === 'hold' ? ratio.hold :
    currentPhase === 'exhale' ? ratio.exhale : 2;

  if (!location.state) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-background via-card to-background p-6">
      {!isActive && !isComplete && (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <Card className="border-primary/20 bg-card/50 p-8 backdrop-blur-sm text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Begin</h2>
            <p className="text-muted-foreground mb-6">
              Take a moment to find a comfortable position. Close your eyes when ready.
            </p>
            <div className="rounded-lg bg-primary/10 p-4 mb-6">
              <p className="text-sm text-foreground mb-2">Practice Settings</p>
              <div className="text-lg font-semibold">
                {ratio.inhale}:{ratio.hold}:{ratio.exhale} × {rounds} rounds
              </div>
            </div>
            <Button
              onClick={start}
              className="w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-semibold shadow-lg shadow-primary/50 transition-all hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Begin Practice
            </Button>
          </Card>
        </div>
      )}

      {isActive && !isComplete && (
        <div className="flex flex-col items-center justify-between flex-1 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Round</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {currentRound + 1} / {rounds}
            </div>
          </div>

          <BreathingCircle
            phase={currentPhase}
            timeRemaining={timeRemaining}
            totalTime={totalPhaseTime}
          />

          <div className="w-full space-y-3 mt-8">
            <Button
              onClick={isPaused ? handleResume : handlePause}
              className="w-full bg-secondary py-6 text-lg font-semibold"
              variant="secondary"
            >
              {isPaused ? (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              )}
            </Button>

            <Button
              onClick={handleEnd}
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <X className="mr-2 h-4 w-4" />
              End Practice
            </Button>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <Card className="border-primary/20 bg-card/50 p-8 backdrop-blur-sm text-center max-w-md">
            <div className="mb-6">
              <div className="text-6xl mb-4">🙏</div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Practice Complete
              </h2>
              <p className="text-muted-foreground">
                You completed {rounds} rounds
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Session Summary</p>
              <div className="text-lg font-semibold text-foreground">
                {ratio.inhale}:{ratio.hold}:{ratio.exhale} × {rounds} rounds
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {Math.floor((Date.now() - startTime) / 1000 / 60)} minutes
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/session-complete', { state: { 
                  session: {
                    id: Date.now().toString(),
                    date: new Date(),
                    ratio,
                    roundsCompleted: rounds,
                    roundsPlanned: rounds,
                    duration: Math.floor((Date.now() - startTime) / 1000),
                  }
                }})}
                className="w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-semibold"
              >
                Log Feeling
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full border-primary/30"
              >
                Return Home
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Practice;
