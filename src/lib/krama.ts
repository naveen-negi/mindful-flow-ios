/**
 * Pure rules for the haṭha krama module. No React, no storage, no audio —
 * everything here is a function of its arguments so it can be tested directly.
 */

import { NADI } from '@/data/krama';

export interface RoundsPlan {
  rounds: number;
  hold: number;
  rest: number;
}

/**
 * Total length of a drill sitting.
 *
 * Every round is a hold followed by a rest, the last one included: the closing
 * rest is where the lock is released and the breath comes back, so it is part
 * of the practice rather than time left over after it.
 */
export const planSeconds = ({ rounds, hold, rest }: RoundsPlan): number =>
  Math.max(0, Math.round(rounds)) * (Math.max(0, hold) + Math.max(0, rest));

/** "3 min 10 s", "45 s", "2 min". Written the way the setup screen reads it out. */
export const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Math.round(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  if (mins === 0) return `${secs} s`;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} s`;
};

/** The arithmetic line above the total on the setup screen. */
export const describePlan = ({ rounds, hold, rest }: RoundsPlan): string =>
  `${rounds} round${rounds === 1 ? '' : 's'} · ${hold} s held, ${rest} s rest · in total.`;

export type DrillPhase = 'idle' | 'opening' | 'hold' | 'rest' | 'done';

/** Mahā mudrā alternates, starting with the left heel folded in. */
export const sideForRound = (round: number): 'left' | 'right' =>
  round % 2 === 1 ? 'left' : 'right';

export type BreathDirection = 'in' | 'out';

export interface NadiStep {
  /** 1-based round. */
  round: number;
  /** 0-3 within the round. */
  step: number;
  side: 'left' | 'right';
  direction: BreathDirection;
  /** The line the practice screen shows, and the ear hears. */
  cue: string;
}

const NADI_STEPS: Array<Pick<NadiStep, 'side' | 'direction'>> = [
  { side: 'left', direction: 'in' },
  { side: 'right', direction: 'out' },
  { side: 'right', direction: 'in' },
  { side: 'left', direction: 'out' },
];

/**
 * One round is four steps: in left, out right, in right, out left. The index
 * runs across the whole sitting, so step 4 is the first step of round 2.
 */
export const nadiStepAt = (index: number): NadiStep => {
  const i = Math.max(0, Math.floor(index));
  const step = i % 4;
  const { side, direction } = NADI_STEPS[step];
  const strike = direction === 'in' ? 'low strike' : 'soft strike';
  return {
    round: Math.floor(i / 4) + 1,
    step,
    side,
    direction,
    cue: `${strike}, ${side} side — breathe ${direction === 'in' ? 'in' : 'out'} through the ${side}`,
  };
};

export const nadiTotalSteps = (rounds: number): number => Math.max(0, Math.round(rounds)) * 4;

export const nadiPlanSeconds = (rounds: number, seconds: number): number =>
  nadiTotalSteps(rounds) * Math.max(0, seconds);

/**
 * Distinct days on which stage one was practised, capped at the length of the
 * course the texts ask for. Two sittings in one day count once.
 */
export const dayOfCourse = (dates: Date[], courseDays: number = NADI.courseDays): number => {
  const days = new Set(dates.map((d) => d.toISOString().slice(0, 10)));
  return Math.min(days.size, courseDays);
};

export type GateAnswers = Record<string, boolean | undefined>;

export interface GateVerdict {
  /** Every question answered. */
  complete: boolean;
  /** Answered, and every answer a no. */
  cleared: boolean;
  /** Ids of the questions answered yes. */
  blockers: string[];
}

/**
 * The safety check. A yes to any question keeps the drill closed; an
 * unanswered question is not a no.
 */
export const gateVerdict = (answers: GateAnswers, questionIds: string[]): GateVerdict => {
  const complete = questionIds.every((id) => typeof answers[id] === 'boolean');
  const blockers = questionIds.filter((id) => answers[id] === true);
  return { complete, cleared: complete && blockers.length === 0, blockers };
};

/**
 * A face-down sitting needs the vibration: the bowl alone cannot be trusted to
 * carry a cue through a pocket, a rug or a quiet room.
 */
export const canSitFaceDown = (vibration: boolean): boolean => vibration;

/** Clamp a user-entered count into the range the drill screens offer. */
export const clampCount = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
};
