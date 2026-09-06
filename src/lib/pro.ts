/**
 * Pranayama Pro — the rules of the free tier and how a RevenueCat entitlement
 * maps onto a status the UI can show. Pure functions only; nothing here talks
 * to the store. See design/plans/2026-09-06-pro-subscription-design.md.
 */

export const PRO_ENTITLEMENT = 'pro';

/** Free tier: the full practice with the preset durations and this many rounds. */
export const FREE_ROUNDS = 10;
/** Free tier: Progress shows this many days back. */
export const FREE_HISTORY_DAYS = 7;
/** Free tier: this many pointers, spread evenly across the whole library. */
export const FREE_POINTER_COUNT = 40;

/** RevenueCat's PERIOD_TYPE values that matter here. */
export type PeriodType = 'TRIAL' | 'INTRO' | 'NORMAL' | 'PREPAID' | (string & {});

/** The few fields of a RevenueCat entitlement that decide Pro status. */
export interface EntitlementSnapshot {
  isActive: boolean;
  willRenew: boolean;
  periodType: PeriodType;
  expirationDate: string | null;
}

/** Structural view of RevenueCat's CustomerInfo — `all` includes lapsed entitlements. */
export interface CustomerInfoLike {
  entitlements: { all: Record<string, EntitlementSnapshot | undefined> };
}

export type ProStatus =
  | { kind: 'free' }
  | { kind: 'trial'; until: Date; willRenew: boolean }
  | { kind: 'active'; renewsAt: Date | null; willRenew: boolean }
  | { kind: 'expired'; expiredAt: Date };

export const proEntitlement = (info: CustomerInfoLike | null | undefined): EntitlementSnapshot | null =>
  info?.entitlements?.all?.[PRO_ENTITLEMENT] ?? null;

export const proStatus = (
  entitlement: EntitlementSnapshot | null | undefined,
  now: Date = new Date(),
): ProStatus => {
  if (!entitlement) return { kind: 'free' };

  const expiry = entitlement.expirationDate ? new Date(entitlement.expirationDate) : null;
  const lapsed = !entitlement.isActive || (expiry !== null && expiry.getTime() <= now.getTime());
  if (lapsed) {
    return expiry ? { kind: 'expired', expiredAt: expiry } : { kind: 'free' };
  }

  if (entitlement.periodType === 'TRIAL' && expiry) {
    return { kind: 'trial', until: expiry, willRenew: entitlement.willRenew };
  }
  return { kind: 'active', renewsAt: expiry, willRenew: entitlement.willRenew };
};

export const isPro = (status: ProStatus): boolean =>
  status.kind === 'trial' || status.kind === 'active';

const shortDate = (d: Date): string =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** One plain sentence for the Settings row and the paywall header. */
export const describeProStatus = (status: ProStatus): string => {
  switch (status.kind) {
    case 'free':
      return 'Free plan';
    case 'trial':
      return status.willRenew
        ? `Free trial until ${shortDate(status.until)}, then your plan continues`
        : `Free trial until ${shortDate(status.until)} — will not renew`;
    case 'active':
      if (!status.renewsAt) return 'Pro — active';
      return status.willRenew
        ? `Pro — renews on ${shortDate(status.renewsAt)}`
        : `Pro — active until ${shortDate(status.renewsAt)}, will not renew`;
    case 'expired':
      return `Pro ended on ${shortDate(status.expiredAt)}`;
  }
};

/**
 * Indices of the pointers available on the free tier: evenly spaced through the
 * library so the free set samples the whole book, and stable across launches.
 */
export const freePointerIndices = (total: number, count: number = FREE_POINTER_COUNT): number[] => {
  if (total <= count) return Array.from({ length: total }, (_, i) => i);
  return Array.from({ length: count }, (_, i) => Math.floor((i * total) / count));
};

/** The fields of a store intro offer needed to describe a free trial. */
export interface IntroOfferLike {
  price: number;
  periodUnit: string; // DAY | WEEK | MONTH | YEAR
  periodNumberOfUnits: number;
}

const DAYS_PER_UNIT: Record<string, number> = { DAY: 1, WEEK: 7, MONTH: 30, YEAR: 365 };

/** Length of a free trial in days, or null when the intro offer is missing or not free. */
export const trialDays = (intro: IntroOfferLike | null | undefined): number | null => {
  if (!intro || intro.price !== 0) return null;
  const perUnit = DAYS_PER_UNIT[intro.periodUnit.toUpperCase()];
  return perUnit ? perUnit * intro.periodNumberOfUnits : null;
};

/** Whole-percent saving of the yearly price against twelve monthly payments; 0 if none. */
export const yearlySavingsPercent = (monthlyPrice: number, yearlyPrice: number): number => {
  const twelveMonths = monthlyPrice * 12;
  if (yearlyPrice >= twelveMonths) return 0;
  return Math.round(((twelveMonths - yearlyPrice) / twelveMonths) * 100);
};
