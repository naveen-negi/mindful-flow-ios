import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import { usePro } from '@/contexts/ProProvider';
import { describeProStatus } from '@/lib/pro';
import type { Plan, PlanId } from '@/lib/purchases';
import { BookOpen, CalendarDays, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
export const PRIVACY_URL = 'https://naveen-negi.github.io/mindful-flow-ios/privacy.html';

const benefits = [
  { icon: SlidersHorizontal, title: 'Your own pace', detail: 'Custom inhale length, any number of rounds, automatic progression.' },
  { icon: BookOpen, title: 'The whole book', detail: 'All 433 pointers from Nisargadatta Maharaj between rounds, and as notifications.' },
  { icon: CalendarDays, title: 'Full history', detail: 'Every session you have ever recorded, month by month.' },
  { icon: Sparkles, title: 'Everything to come', detail: 'New techniques and ratios land in Pro first.' },
];

const periodLabel: Record<PlanId, string> = { monthly: 'month', yearly: 'year' };

const PlanCard = ({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={`w-full rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      selected ? 'border-primary bg-primary/10' : 'border-foreground/10 bg-card hover:bg-muted/30'
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold text-foreground">
            {plan.id === 'yearly' ? 'Yearly' : 'Monthly'}
          </span>
          {plan.savingsPercent ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-sans font-medium text-primary-foreground">
              Save {plan.savingsPercent}%
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm font-sans text-muted-foreground">
          {plan.trialDays ? `${plan.trialDays} days free, then ` : ''}
          {plan.priceString} / {periodLabel[plan.id]}
          {plan.id === 'yearly' ? ` · ${(plan.price / 12).toLocaleString(undefined, { style: 'currency', currency: 'EUR' })} a month` : ''}
        </p>
      </div>
      <span
        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
          selected ? 'border-primary bg-primary text-primary-foreground' : 'border-foreground/20'
        }`}
        aria-hidden
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
    </div>
  </button>
);

const Pro = () => {
  const navigate = useNavigate();
  const { status, isPro, plans, storeAvailable, loading, error, purchase, restore, manageUrl } = usePro();
  const [selectedId, setSelectedId] = useState<PlanId>('yearly');
  const [busy, setBusy] = useState(false);

  const selected = plans.find((p) => p.id === selectedId) ?? plans[0];

  const handlePurchase = async () => {
    if (!selected || !storeAvailable) return;
    setBusy(true);
    try {
      const outcome = await purchase(selected);
      if (outcome === 'purchased') {
        toast.success('Welcome to Pranayama Pro');
        navigate('/');
      }
    } catch {
      // error text is shown inline by the provider
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async () => {
    if (!storeAvailable) return;
    setBusy(true);
    try {
      const restored = await restore();
      if (restored) {
        toast.success('Pro restored');
        navigate('/');
      } else {
        toast('No previous purchase found for this Apple Account');
      }
    } catch {
      // inline error
    } finally {
      setBusy(false);
    }
  };

  const cta = !storeAvailable
    ? 'Available in the iOS app'
    : selected?.trialDays
      ? `Start ${selected.trialDays} days free`
      : 'Subscribe';

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/" backLabel="Home" eyebrow="Pranayama" title="Pro" subtitle="Go deeper, at your own pace" />

      <div className="container max-w-4xl mx-auto px-4 space-y-6">
        <ul className="space-y-4">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
              <div>
                <p className="font-sans font-medium text-foreground">{title}</p>
                <p className="text-sm font-sans text-muted-foreground">{detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {isPro ? (
          <Card className="border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <p className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Your plan</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">You're on Pro</p>
            <p className="mt-1 text-sm font-sans text-muted-foreground">{describeProStatus(status)}</p>
            <a
              href={manageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-sans font-medium text-primary underline-offset-4 hover:underline"
            >
              Manage subscription
            </a>
          </Card>
        ) : (
          <>
            <div className="space-y-3">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} selected={plan.id === selected?.id} onSelect={() => setSelectedId(plan.id)} />
              ))}
            </div>

            {status.kind === 'expired' && (
              <p className="text-sm font-sans text-muted-foreground">
                Your subscription ended on {format(status.expiredAt, 'd MMM yyyy')}. Everything you recorded is still here.
              </p>
            )}

            {error && <p className="text-sm font-sans text-destructive">{error}</p>}

            <Button
              onClick={handlePurchase}
              disabled={!storeAvailable || loading || busy || !selected}
              className="w-full py-6 text-lg font-medium rounded-xl"
            >
              {busy ? 'Contacting the App Store…' : cta}
            </Button>

            {selected && storeAvailable && (
              <p className="text-xs font-sans leading-relaxed text-muted-foreground">
                {selected.trialDays ? `After the ${selected.trialDays}-day free trial, ` : ''}
                {selected.priceString} per {periodLabel[selected.id]} is charged to your Apple Account and renews automatically
                until cancelled. Cancel any time in Settings › Apple Account › Subscriptions, at least 24 hours before the
                current period ends.
              </p>
            )}
          </>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-sans text-muted-foreground">
          {!isPro && (
            <button
              type="button"
              onClick={handleRestore}
              disabled={!storeAvailable || busy}
              className="underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
            >
              Restore purchases
            </button>
          )}
          <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">
            Terms of Use
          </a>
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pro;
