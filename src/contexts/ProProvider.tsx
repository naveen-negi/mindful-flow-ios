import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CustomerInfo } from '@revenuecat/purchases-capacitor';
import { isPro as isProStatus, proEntitlement, proStatus, type ProStatus } from '@/lib/pro';
import {
  FALLBACK_PLANS,
  configurePurchases,
  isStoreAvailable,
  loadPlans,
  onCustomerInfoChanged,
  purchasePlan,
  restorePurchases,
  MANAGE_SUBSCRIPTIONS_URL,
  type Plan,
} from '@/lib/purchases';
import { getSettings, saveSettings } from '@/utils/storage';
import { cancelAllNotifications } from '@/utils/notifications';

interface ProContextValue {
  status: ProStatus;
  isPro: boolean;
  plans: Plan[];
  /** False in a plain browser: plans are static and nothing can be bought. */
  storeAvailable: boolean;
  loading: boolean;
  error: string | null;
  purchase: (plan: Plan) => Promise<'purchased' | 'cancelled'>;
  /** Resolves true when a Pro entitlement came back. */
  restore: () => Promise<boolean>;
  manageUrl: string;
}

const ProContext = createContext<ProContextValue | null>(null);

// Browser-only switches (dev builds): localStorage.pranayama_pro_override = "1" renders the Pro state;
// localStorage.pranayama_store_preview = "1" renders the paywall as if the store were reachable (for screenshots).
const DEV_OVERRIDE_KEY = 'pranayama_pro_override';
const DEV_STORE_PREVIEW_KEY = 'pranayama_store_preview';
const devFlag = (key: string): boolean => {
  try {
    return import.meta.env.DEV && localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
};

const describeError = (err: unknown): string => {
  const message = (err as { message?: string })?.message ?? '';
  return message ? `The App Store returned an error: ${message}` : 'The App Store could not be reached. Try again.';
};

export const ProProvider = ({ children }: { children: ReactNode }) => {
  const storeAvailable = isStoreAvailable();
  const storePreview = !storeAvailable && devFlag(DEV_STORE_PREVIEW_KEY);
  const [status, setStatus] = useState<ProStatus>({ kind: 'free' });
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [loading, setLoading] = useState<boolean>(storeAvailable);
  const [error, setError] = useState<string | null>(null);
  const [manageUrl, setManageUrl] = useState<string>(MANAGE_SUBSCRIPTIONS_URL);

  const applyCustomerInfo = useCallback((info: CustomerInfo) => {
    setStatus(proStatus(proEntitlement(info)));
    if (info.managementURL) setManageUrl(info.managementURL);
  }, []);

  useEffect(() => {
    if (!storeAvailable) {
      if (devFlag(DEV_OVERRIDE_KEY)) {
        setStatus({ kind: 'active', renewsAt: null, willRenew: true });
      }
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const info = await configurePurchases();
        if (cancelled) return;
        applyCustomerInfo(info);
        await onCustomerInfoChanged((updated) => applyCustomerInfo(updated));
        const loaded = await loadPlans();
        if (!cancelled && loaded.length > 0) setPlans(loaded);
      } catch (err) {
        if (!cancelled) setError(describeError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storeAvailable, applyCustomerInfo]);

  const isPro = isProStatus(status);

  // A lapsed subscription must also stop the Pro-only pointer notifications.
  useEffect(() => {
    if (loading || isPro) return;
    const settings = getSettings();
    if (settings.notificationsEnabled) {
      saveSettings({ ...settings, notificationsEnabled: false });
      cancelAllNotifications().catch(() => undefined);
    }
  }, [loading, isPro]);

  const purchase = useCallback(
    async (plan: Plan) => {
      setError(null);
      try {
        const result = await purchasePlan(plan);
        if (result.outcome === 'purchased') applyCustomerInfo(result.customerInfo);
        return result.outcome;
      } catch (err) {
        setError(describeError(err));
        throw err;
      }
    },
    [applyCustomerInfo],
  );

  const restore = useCallback(async () => {
    setError(null);
    try {
      const info = await restorePurchases();
      applyCustomerInfo(info);
      return isProStatus(proStatus(proEntitlement(info)));
    } catch (err) {
      setError(describeError(err));
      throw err;
    }
  }, [applyCustomerInfo]);

  const value = useMemo<ProContextValue>(
    () => ({ status, isPro, plans, storeAvailable: storeAvailable || storePreview, loading, error, purchase, restore, manageUrl }),
    [status, isPro, plans, storeAvailable, storePreview, loading, error, purchase, restore, manageUrl],
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
};

export const usePro = (): ProContextValue => {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error('usePro must be used inside <ProProvider>');
  return ctx;
};
