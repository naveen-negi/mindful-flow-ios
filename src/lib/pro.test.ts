import { describe, it, expect } from 'vitest';
import {
  proStatus,
  isPro,
  freePointerIndices,
  yearlySavingsPercent,
  trialDays,
  describeProStatus,
  FREE_POINTER_COUNT,
  FREE_ROUNDS,
  FREE_HISTORY_DAYS,
  PRO_ENTITLEMENT,
  type EntitlementSnapshot,
} from './pro';

const now = new Date('2026-09-06T12:00:00Z');
const inTenDays = new Date('2026-09-16T12:00:00Z');
const tenDaysAgo = new Date('2026-08-27T12:00:00Z');

const snapshot = (over: Partial<EntitlementSnapshot>): EntitlementSnapshot => ({
  isActive: true,
  willRenew: true,
  periodType: 'NORMAL',
  expirationDate: inTenDays.toISOString(),
  ...over,
});

describe('proStatus', () => {
  it('is free when there is no entitlement at all', () => {
    expect(proStatus(null, now)).toEqual({ kind: 'free' });
    expect(proStatus(undefined, now)).toEqual({ kind: 'free' });
  });

  it('is a trial while the active period is a free trial', () => {
    const s = proStatus(snapshot({ periodType: 'TRIAL' }), now);
    expect(s).toEqual({ kind: 'trial', until: inTenDays, willRenew: true });
  });

  it('is active during a paid period and reports the renewal date', () => {
    const s = proStatus(snapshot({}), now);
    expect(s).toEqual({ kind: 'active', renewsAt: inTenDays, willRenew: true });
  });

  it('is still active after the user cancelled, but will not renew', () => {
    const s = proStatus(snapshot({ willRenew: false }), now);
    expect(s).toEqual({ kind: 'active', renewsAt: inTenDays, willRenew: false });
  });

  it('is expired when the entitlement is no longer active', () => {
    const s = proStatus(
      snapshot({ isActive: false, willRenew: false, expirationDate: tenDaysAgo.toISOString() }),
      now,
    );
    expect(s).toEqual({ kind: 'expired', expiredAt: tenDaysAgo });
  });

  it('treats an active entitlement whose expiry is already in the past as expired (stale cache)', () => {
    const s = proStatus(snapshot({ expirationDate: tenDaysAgo.toISOString() }), now);
    expect(s).toEqual({ kind: 'expired', expiredAt: tenDaysAgo });
  });

  it('treats an active entitlement without expiry as active (lifetime / unknown)', () => {
    const s = proStatus(snapshot({ expirationDate: null }), now);
    expect(s).toEqual({ kind: 'active', renewsAt: null, willRenew: true });
  });
});

describe('isPro', () => {
  it('is true only for trial and active', () => {
    expect(isPro({ kind: 'free' })).toBe(false);
    expect(isPro({ kind: 'expired', expiredAt: tenDaysAgo })).toBe(false);
    expect(isPro({ kind: 'trial', until: inTenDays, willRenew: true })).toBe(true);
    expect(isPro({ kind: 'active', renewsAt: inTenDays, willRenew: true })).toBe(true);
    expect(isPro({ kind: 'active', renewsAt: null, willRenew: false })).toBe(true);
  });
});

describe('freePointerIndices', () => {
  it('returns exactly FREE_POINTER_COUNT distinct indices spread across the library', () => {
    const idx = freePointerIndices(433);
    expect(idx).toHaveLength(FREE_POINTER_COUNT);
    expect(new Set(idx).size).toBe(FREE_POINTER_COUNT);
    expect(idx[0]).toBe(0);
    expect(idx[idx.length - 1]).toBeLessThan(433);
    expect(idx[idx.length - 1]).toBeGreaterThan(433 / 2);
  });

  it('is deterministic', () => {
    expect(freePointerIndices(433)).toEqual(freePointerIndices(433));
  });

  it('never exceeds the library when it is smaller than the free count', () => {
    const idx = freePointerIndices(10);
    expect(idx).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('yearlySavingsPercent', () => {
  it('rounds the yearly saving against twelve monthly payments', () => {
    expect(yearlySavingsPercent(2.99, 19.99)).toBe(44);
  });

  it('is zero when yearly is not cheaper', () => {
    expect(yearlySavingsPercent(1, 12)).toBe(0);
    expect(yearlySavingsPercent(1, 15)).toBe(0);
  });
});

describe('describeProStatus', () => {
  it('describes every status in one plain sentence', () => {
    expect(describeProStatus({ kind: 'free' })).toBe('Free plan');
    expect(describeProStatus({ kind: 'trial', until: inTenDays, willRenew: true })).toBe(
      'Free trial until 16 Sept 2026, then your plan continues',
    );
    expect(describeProStatus({ kind: 'trial', until: inTenDays, willRenew: false })).toBe(
      'Free trial until 16 Sept 2026 — will not renew',
    );
    expect(describeProStatus({ kind: 'active', renewsAt: inTenDays, willRenew: true })).toBe('Pro — renews on 16 Sept 2026');
    expect(describeProStatus({ kind: 'active', renewsAt: inTenDays, willRenew: false })).toBe(
      'Pro — active until 16 Sept 2026, will not renew',
    );
    expect(describeProStatus({ kind: 'active', renewsAt: null, willRenew: true })).toBe('Pro — active');
    expect(describeProStatus({ kind: 'expired', expiredAt: tenDaysAgo })).toBe('Pro ended on 27 Aug 2026');
  });
});

describe('trialDays', () => {
  it('converts a free introductory period into days', () => {
    expect(trialDays({ price: 0, periodUnit: 'DAY', periodNumberOfUnits: 14 })).toBe(14);
    expect(trialDays({ price: 0, periodUnit: 'WEEK', periodNumberOfUnits: 2 })).toBe(14);
    expect(trialDays({ price: 0, periodUnit: 'MONTH', periodNumberOfUnits: 1 })).toBe(30);
  });

  it('is null when there is no intro offer or the intro is not free', () => {
    expect(trialDays(null)).toBeNull();
    expect(trialDays({ price: 0.99, periodUnit: 'WEEK', periodNumberOfUnits: 1 })).toBeNull();
  });
});

describe('constants', () => {
  it('match the approved free tier', () => {
    expect(FREE_ROUNDS).toBe(10);
    expect(FREE_HISTORY_DAYS).toBe(7);
    expect(FREE_POINTER_COUNT).toBe(40);
    expect(PRO_ENTITLEMENT).toBe('pro');
  });
});
