import { useCallback, useEffect, useRef, useState } from 'react';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { OPENING_SECONDS, playBreathStrike, playOpening, playCue, unlockAudio, type CueSettings } from '@/lib/bowl';
import { nadiStepAt, nadiTotalSteps, type NadiStep } from '@/lib/krama';

export interface NadiTimerOptions {
  rounds: number;
  /** Equal in and out — one count each way. */
  seconds: number;
  settings: CueSettings;
  onFinish?: (result: { roundsCompleted: number; seconds: number; stoppedEarly: boolean }) => void;
}

export interface NadiTimer {
  phase: 'idle' | 'opening' | 'running' | 'done';
  step: NadiStep;
  /** Whole seconds left on the current breath. */
  remaining: number;
  elapsed: number;
  start: () => void;
  stop: () => void;
}

/**
 * Stage one: four breaths to a round, equal in and out, nothing held. The side
 * is carried by the strike and the buzz so the eyes can stay shut.
 */
export const useNadiTimer = ({ rounds, seconds, settings, onFinish }: NadiTimerOptions): NadiTimer => {
  const [phase, setPhase] = useState<NadiTimer['phase']>('idle');
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const endsAt = useRef(0);
  const startedAt = useRef(0);
  const indexRef = useRef(0);
  const phaseRef = useRef<NadiTimer['phase']>('idle');
  const finished = useRef(false);

  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  const total = nadiTotalSteps(rounds);

  const finish = useCallback(
    (stoppedEarly: boolean) => {
      if (finished.current) return;
      finished.current = true;
      phaseRef.current = 'done';
      setPhase('done');
      KeepAwake.allowSleep().catch(() => undefined);
      finishRef.current?.({
        roundsCompleted: stoppedEarly ? Math.floor(indexRef.current / 4) : rounds,
        seconds: startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
        stoppedEarly,
      });
    },
    [rounds],
  );

  const start = useCallback(() => {
    finished.current = false;
    startedAt.current = Date.now();
    indexRef.current = 0;
    setIndex(0);
    setElapsed(0);
    KeepAwake.keepAwake().catch(() => undefined);
    void unlockAudio().then(() => playOpening(settingsRef.current));
    phaseRef.current = 'opening';
    setPhase('opening');
    endsAt.current = Date.now() + OPENING_SECONDS * 1000;
    setRemaining(OPENING_SECONDS);
  }, []);

  const stop = useCallback(() => {
    playCue('stop', settingsRef.current);
    finish(true);
  }, [finish]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return undefined;

    const tick = () => {
      const now = Date.now();
      const left = (endsAt.current - now) / 1000;
      setRemaining(Math.max(0, Math.ceil(left)));
      if (startedAt.current) setElapsed(Math.round((now - startedAt.current) / 1000));
      if (left > 0) return;

      if (phaseRef.current === 'opening') {
        phaseRef.current = 'running';
        setPhase('running');
        indexRef.current = 0;
        setIndex(0);
        playBreathStrike(nadiStepAt(0).direction, settingsRef.current);
        endsAt.current = Date.now() + seconds * 1000;
        return;
      }

      const next = indexRef.current + 1;
      if (next >= total) {
        finish(false);
        return;
      }
      indexRef.current = next;
      setIndex(next);
      playBreathStrike(nadiStepAt(next).direction, settingsRef.current);
      endsAt.current = Date.now() + seconds * 1000;
    };

    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [phase, seconds, total, finish]);

  useEffect(() => () => {
    KeepAwake.allowSleep().catch(() => undefined);
  }, []);

  return { phase, step: nadiStepAt(index), remaining, elapsed, start, stop };
};
