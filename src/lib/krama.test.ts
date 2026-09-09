import { describe, expect, it } from 'vitest';
import {
  canSitFaceDown,
  clampCount,
  dayOfCourse,
  describePlan,
  formatDuration,
  gateVerdict,
  nadiPlanSeconds,
  nadiStepAt,
  nadiTotalSteps,
  planSeconds,
  sideForRound,
} from './krama';

describe('planSeconds', () => {
  it('counts a rest after every round, the last one included', () => {
    // The setup screen quotes 3 min 10 s for five rounds of 8 s held, 30 s rest.
    expect(planSeconds({ rounds: 5, hold: 8, rest: 30 })).toBe(190);
  });

  it('is zero for no rounds', () => {
    expect(planSeconds({ rounds: 0, hold: 15, rest: 20 })).toBe(0);
  });

  it('never returns a negative length', () => {
    expect(planSeconds({ rounds: -3, hold: -5, rest: 10 })).toBe(0);
  });
});

describe('formatDuration', () => {
  it('reads out minutes and seconds', () => {
    expect(formatDuration(190)).toBe('3 min 10 s');
  });

  it('drops the minutes below one', () => {
    expect(formatDuration(45)).toBe('45 s');
  });

  it('drops the seconds when there are none', () => {
    expect(formatDuration(120)).toBe('2 min');
  });
});

describe('describePlan', () => {
  it('writes the arithmetic the way the screen reads it', () => {
    expect(describePlan({ rounds: 5, hold: 8, rest: 30 })).toBe(
      '5 rounds · 8 s held, 30 s rest · in total.',
    );
  });

  it('keeps a single round singular', () => {
    expect(describePlan({ rounds: 1, hold: 8, rest: 30 })).toContain('1 round ·');
  });
});

describe('sideForRound', () => {
  it('starts with the left heel and alternates', () => {
    expect([1, 2, 3, 4].map(sideForRound)).toEqual(['left', 'right', 'left', 'right']);
  });
});

describe('nadiStepAt', () => {
  it('runs in left, out right, in right, out left', () => {
    const steps = [0, 1, 2, 3].map(nadiStepAt);
    expect(steps.map((s) => `${s.direction} ${s.side}`)).toEqual([
      'in left',
      'out right',
      'in right',
      'out left',
    ]);
  });

  it('rolls into the next round after four steps', () => {
    expect(nadiStepAt(3).round).toBe(1);
    expect(nadiStepAt(4).round).toBe(2);
    expect(nadiStepAt(4).step).toBe(0);
  });

  it('names the strike and the side in the cue', () => {
    expect(nadiStepAt(0).cue).toBe('low strike, left side — breathe in through the left');
  });

  it('counts four steps to a round', () => {
    expect(nadiTotalSteps(12)).toBe(48);
    expect(nadiPlanSeconds(12, 4)).toBe(192);
  });
});

describe('dayOfCourse', () => {
  it('counts a day once however many sittings it held', () => {
    const dates = [
      new Date('2026-09-01T06:00:00Z'),
      new Date('2026-09-01T19:00:00Z'),
      new Date('2026-09-02T06:00:00Z'),
    ];
    expect(dayOfCourse(dates)).toBe(2);
  });

  it('stops at the length of the course', () => {
    const dates = Array.from({ length: 120 }, (_, i) => new Date(2026, 0, i + 1));
    expect(dayOfCourse(dates, 90)).toBe(90);
  });
});

describe('gateVerdict', () => {
  const ids = ['a', 'b', 'c'];

  it('needs every question answered', () => {
    expect(gateVerdict({ a: false, b: false }, ids)).toMatchObject({
      complete: false,
      cleared: false,
    });
  });

  it('clears only on a full set of noes', () => {
    expect(gateVerdict({ a: false, b: false, c: false }, ids).cleared).toBe(true);
  });

  it('names the answers that keep it closed', () => {
    const verdict = gateVerdict({ a: false, b: true, c: true }, ids);
    expect(verdict.cleared).toBe(false);
    expect(verdict.blockers).toEqual(['b', 'c']);
  });
});

describe('canSitFaceDown', () => {
  it('refuses a face-down sitting without the vibration', () => {
    expect(canSitFaceDown(false)).toBe(false);
    expect(canSitFaceDown(true)).toBe(true);
  });
});

describe('clampCount', () => {
  it('keeps a count inside the range the screen offers', () => {
    expect(clampCount(99, 1, 10)).toBe(10);
    expect(clampCount(0, 1, 10)).toBe(1);
    expect(clampCount(4.6, 1, 10)).toBe(5);
  });

  it('falls back to the minimum for an empty field', () => {
    expect(clampCount(Number.NaN, 3, 10)).toBe(3);
  });
});
