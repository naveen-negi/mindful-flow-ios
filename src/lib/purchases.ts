/**
 * Thin adapter over the RevenueCat SDK. The only file that imports it.
 * In a plain browser (Vite dev server, Lovable preview) the store is
 * unavailable and every call degrades to "free tier, nothing to buy".
 */
import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor';
import type { CustomerInfo, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { trialDays, yearlySavingsPercent } from '@/lib/pro';

export type PlanId = 'monthly' | 'yearly';

export interface Plan {
  id: PlanId;
  /** Store price, e.g. "€2.99" */
  priceString: string;
  price: number;
  /** Free trial length in days, or null when the store offers none. */
  trialDays: number | null;
  /** Whole-percent saving against monthly; only set on the yearly plan. */
  savingsPercent?: number;
  /** The RevenueCat package to buy; absent for the static browser fallback. */
  pkg?: PurchasesPackage;
}

/** Shown in the browser and while the store is still loading. Must match App Store Connect. */
export const FALLBACK_PLANS: Plan[] = [
  { id: 'yearly', priceString: '€19.99', price: 19.99, trialDays: 14, savingsPercent: yearlySavingsPercent(2.99, 19.99) },
  { id: 'monthly', priceString: '€2.99', price: 2.99, trialDays: 14 },
];

// Public SDK key — safe to ship in the binary. Set in .env.production (see .env.example).
const apiKey: string | undefined = import.meta.env.VITE_REVENUECAT_IOS_KEY;

export const isStoreAvailable = (): boolean => Capacitor.isNativePlatform() && !!apiKey;

export const MANAGE_SUBSCRIPTIONS_URL = 'https://apps.apple.com/account/subscriptions';

let configured = false;

/** Configure the SDK once and return the cached customer info. */
export const configurePurchases = async (): Promise<CustomerInfo> => {
  if (!configured) {
    await Purchases.setLogLevel({ level: import.meta.env.DEV ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN });
    await Purchases.configure({ apiKey: apiKey as string });
    configured = true;
  }
  const { customerInfo } = await Purchases.getCustomerInfo();
  return customerInfo;
};

const toPlan = (id: PlanId, pkg: PurchasesPackage, monthlyPrice?: number): Plan => ({
  id,
  pkg,
  price: pkg.product.price,
  priceString: pkg.product.priceString,
  trialDays: trialDays(pkg.product.introPrice),
  savingsPercent:
    id === 'yearly' && monthlyPrice !== undefined
      ? yearlySavingsPercent(monthlyPrice, pkg.product.price)
      : undefined,
});

/** The current offering's monthly and yearly packages, yearly first. */
export const loadPlans = async (): Promise<Plan[]> => {
  const { current } = await Purchases.getOfferings();
  if (!current) return [];
  const plans: Plan[] = [];
  if (current.annual) plans.push(toPlan('yearly', current.annual, current.monthly?.product.price));
  if (current.monthly) plans.push(toPlan('monthly', current.monthly));
  return plans;
};

export type PurchaseOutcome = { outcome: 'purchased'; customerInfo: CustomerInfo } | { outcome: 'cancelled' };

const isCancellation = (err: unknown): boolean => {
  const e = err as { code?: string; userCancelled?: boolean; message?: string } | undefined;
  return (
    e?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR ||
    e?.userCancelled === true ||
    /cancel/i.test(e?.message ?? '')
  );
};

export const purchasePlan = async (plan: Plan): Promise<PurchaseOutcome> => {
  if (!plan.pkg) throw new Error('This plan can only be bought in the iOS app.');
  try {
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: plan.pkg });
    return { outcome: 'purchased', customerInfo };
  } catch (err) {
    if (isCancellation(err)) return { outcome: 'cancelled' };
    throw err;
  }
};

export const restorePurchases = async (): Promise<CustomerInfo> => {
  const { customerInfo } = await Purchases.restorePurchases();
  return customerInfo;
};

export const onCustomerInfoChanged = async (listener: (info: CustomerInfo) => void): Promise<void> => {
  await Purchases.addCustomerInfoUpdateListener(listener);
};
