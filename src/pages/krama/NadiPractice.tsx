import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PracticeShell from '@/components/krama/PracticeShell';
import { useNadiTimer } from '@/hooks/useNadiTimer';
import { NADI } from '@/data/krama';
import { getKramaSettings, saveKramaSession } from '@/utils/kramaStorage';
import { cn } from '@/lib/utils';

/**
 * Stage one, practised. Which nostril is carried by the strike and the side of
 * the buzz; the screen only says the same thing in case the eyes are open.
 */
const NadiPractice = () => {
  const navigate = useNavigate();
  const [settings] = useState(() => getKramaSettings());
  const [result, setResult] = useState<{ rounds: number; stoppedEarly: boolean } | null>(null);

  const onFinish = useCallback(
    ({ roundsCompleted, seconds, stoppedEarly }: { roundsCompleted: number; seconds: number; stoppedEarly: boolean }) => {
      saveKramaSession({
        practice: 'nadi',
        roundsCompleted,
        roundsPlanned: NADI.rounds,
        hold: 0,
        duration: seconds,
        stoppedEarly,
      });
      setResult({ rounds: roundsCompleted, stoppedEarly });
    },
    [],
  );

  const timer = useNadiTimer({
    rounds: NADI.rounds,
    seconds: NADI.seconds,
    settings: { volume: settings.bowlVolume, vibration: settings.vibration },
    onFinish,
  });

  const { start } = timer;
  useEffect(() => {
    start();
  }, [start]);

  if (result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 zen-texture px-8 text-center pb-safe pt-safe">
        <div>
          <p className="font-serif text-3xl font-semibold text-foreground">
            {result.rounds} round{result.rounds === 1 ? '' : 's'}
          </p>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            {result.stoppedEarly ? 'Ended early. The log is kept.' : 'Stage one, done for today.'}
          </p>
        </div>
        <Button onClick={() => navigate('/krama')} className="rounded-xl px-8 py-6 text-base">
          The path
        </Button>
      </div>
    );
  }

  const { step, phase, remaining } = timer;
  const opening = phase === 'opening';

  return (
    <PracticeShell
      status={`${NADI.name} · round ${Math.min(step.round, NADI.rounds)} of ${NADI.rounds}`}
      badge="no retention"
      stopLabel="End the sitting"
      stopHint="the log is kept"
      onStop={timer.stop}
    >
      <div className="flex items-center gap-10">
        {(['left', 'right'] as const).map((side) => {
          const lit = !opening && step.side === side;
          return (
            <div key={side} className="flex flex-col items-center gap-3">
              <span
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-500',
                  lit ? 'border-primary bg-primary/15' : 'border-foreground/15',
                )}
              >
                <span
                  className={cn(
                    'font-serif text-xl transition-colors duration-500',
                    lit ? 'text-primary' : 'text-foreground/25',
                  )}
                >
                  {step.direction === 'in' && lit ? '↑' : step.direction === 'out' && lit ? '↓' : '·'}
                </span>
              </span>
              <span
                className={cn(
                  'font-sans text-xs uppercase tracking-wider transition-colors duration-500',
                  lit ? 'text-foreground/70' : 'text-foreground/25',
                )}
              >
                {side}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-10 font-serif text-4xl font-semibold text-foreground/80 tabular-nums">
        {remaining}
      </p>
      <p className="mt-6 max-w-[16rem] font-sans text-sm leading-relaxed text-muted-foreground">
        {opening ? 'three bowl strikes, then begin' : step.cue}
      </p>
    </PracticeShell>
  );
};

export default NadiPractice;
