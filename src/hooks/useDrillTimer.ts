import { useCallback, useEffect, useRef, useState } from 'react';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { OPENING_SECONDS, playCue, playOpening, unlockAudio, type CueSettings } from '@/lib/bowl';
import type { DrillPhase, RoundsPlan } from '@/lib/krama';

/** Seconds of held inhale between the low strike and the two that set the lock. */
const INHALE_LEAD = 2.5;
/** How far before the next lock the warning roll goes out. */
const WARNING_LEAD = 3;
/** How often the rim is struck again to say the lock is still on. */
const RING_EVERY = 6;

export interface DrillTimerOptions {
  plan: RoundsPlan;
  /** A held inhale opens each round: one low strike before the two. */
  inhaleCue: boolean;
  settings: CueSettings;
  onFinish?: (result: { roundsCompleted: number; seconds: number; stoppedEarly: boolean }) => void;
}

export interface DrillTimer {
  phase: DrillPhase;
  /** 1-based, and 0 before the first round. */
  round: number;
  /** Whole seconds left in the current phase. */
  remaining: number;
  elapsed: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
}

/**
 * Rounds of a held lock, with a rest between them that counts as much as the
 * hold. Not the 1:4:2 ratio clock — that one runs one continuous cycle of
 * phases, this one runs reps against a wall clock and says so out loud.
 */
export const useDrillTimer = ({
  plan,
  inhaleCue,
  settings,
  onFinish,
}: DrillTimerOptions): DrillTimer => {
  const [phase, setPhase] = useState<DrillPhase>('idle');
  const [round, setRound] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const phaseEndsAt = useRef(0);
  const startedAt = useRef(0);
  const firedRings = useRef(0);
  const firedWarning = useRef(false);
  const firedInhale = useRef(false);
  const roundRef = useRef(0);
  const phaseRef = useRef<DrillPhase>('idle');
  const finished = useRef(false);

  // The callback and the settings change while a sitting runs; the loop below
  // must always see the current ones without being torn down and restarted.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;
  const planRef = useRef(plan);
  planRef.current = plan;

  const enter = useCallback((next: DrillPhase, seconds: number) => {
    phaseRef.current = next;
    setPhase(next);
    phaseEndsAt.current = Date.now() + seconds * 1000;
    setRemaining(Math.ceil(seconds));
    firedRings.current = 0;
    firedWarning.current = false;
    firedInhale.current = false;
  }, []);

  const finish = useCallback((stoppedEarly: boolean) => {
    if (finished.current) return;
    finished.current = true;
    phaseRef.current = 'done';
    setPhase('done');
    const seconds = startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : 0;
    KeepAwake.allowSleep().catch(() => undefined);
    finishRef.current?.({
      roundsCompleted: stoppedEarly ? Math.max(0, roundRef.current - 1) : planRef.current.rounds,
      seconds,
      stoppedEarly,
    });
  }, []);

  const start = useCallback(() => {
    finished.current = false;
    startedAt.current = Date.now();
    roundRef.current = 0;
    setRound(0);
    setElapsed(0);
    KeepAwake.keepAwake().catch(() => undefined);
    void unlockAudio().then(() => playOpening(settingsRef.current));
    enter('opening', OPENING_SECONDS + (inhaleCue ? INHALE_LEAD : 0));
  }, [enter, inhaleCue]);

  const stop = useCallback(() => {
    playCue('stop', settingsRef.current);
    finish(true);
  }, [finish]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return undefined;

    const tick = () => {
      const now = Date.now();
      const left = (phaseEndsAt.current - now) / 1000;
      setRemaining(Math.max(0, Math.ceil(left)));
      if (startedAt.current) setElapsed(Math.round((now - startedAt.current) / 1000));
      const current = phaseRef.current;
      const cue = settingsRef.current;

      if (current === 'opening') {
        if (inhaleCue && !firedInhale.current && left <= INHALE_LEAD) {
          firedInhale.current = true;
          playCue('breatheIn', cue);
        }
        if (left <= 0) {
          roundRef.current = 1;
          setRound(1);
          playCue('setLock', cue);
          enter('hold', planRef.current.hold);
        }
        return;
      }

      if (current === 'hold') {
        const into = planRef.current.hold - left;
        const due = Math.floor((into - 1.5) / RING_EVERY) + 1;
        if (into >= 1.5 && due > firedRings.current && left >= 3) {
          firedRings.current = due;
          playCue('stillHolding', cue);
        }
        if (left <= 0) {
          playCue('release', cue);
          enter('rest', planRef.current.rest);
        }
        return;
      }

      if (current === 'rest') {
        const isLast = roundRef.current >= planRef.current.rounds;
        if (!isLast && !firedWarning.current && left <= WARNING_LEAD) {
          firedWarning.current = true;
          playCue('release', cue);
        }
        if (!isLast && inhaleCue && !firedInhale.current && left <= INHALE_LEAD) {
          firedInhale.current = true;
          playCue('breatheIn', cue);
        }
        if (left <= 0) {
          if (isLast) {
            finish(false);
            return;
          }
          roundRef.current += 1;
          setRound(roundRef.current);
          playCue('setLock', cue);
          enter('hold', planRef.current.hold);
        }
      }
    };

    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [phase, enter, finish, inhaleCue]);

  useEffect(() => () => {
    KeepAwake.allowSleep().catch(() => undefined);
  }, []);

  return {
    phase,
    round,
    remaining,
    elapsed,
    isRunning: phase === 'opening' || phase === 'hold' || phase === 'rest',
    start,
    stop,
  };
};
