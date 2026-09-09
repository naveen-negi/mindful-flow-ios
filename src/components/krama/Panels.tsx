/**
 * The small set of blocks every haṭha krama screen is built from.
 *
 * The important one is Claims: anything the tradition asserts is shown as a
 * claim with its citation attached, never as a statement about what will
 * happen to the reader. What the reader can check for themselves is a
 * separate block with a different heading.
 */

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KeyPoint, TextClaim } from '@/data/krama';

export const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-sans uppercase tracking-wider text-muted-foreground">{children}</p>
);

export const Lede = ({ children }: { children: ReactNode }) => (
  <p className="text-[15px] font-sans leading-relaxed text-muted-foreground">{children}</p>
);

export const Claims = ({
  claims,
  heading = 'What the texts hold out',
}: {
  claims: TextClaim[];
  heading?: string;
}) => (
  <section className="space-y-3">
    <Kicker>{heading}</Kicker>
    {claims.map((claim) => (
      <Card
        key={claim.heading}
        className="border bg-card p-4 rounded-2xl"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <h2 className="font-serif text-lg font-semibold text-foreground">{claim.heading}</h2>
        <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{claim.body}</p>
        <p className="mt-2.5 text-xs font-sans italic text-muted-foreground/80">{claim.citation}</p>
      </Card>
    ))}
  </section>
);

/** What the practitioner can verify, or the conditions they must meet. */
export const Notice = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
    <p className="text-xs font-sans uppercase tracking-wider text-foreground/60">{heading}</p>
    <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{children}</p>
  </section>
);

export const KeyPointsList = ({ points }: { points: KeyPoint[] }) => (
  <ul className="space-y-2.5">
    {points.map((point, i) => (
      <li key={point.label} className="flex gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 text-[11px] font-sans font-semibold text-primary">
          {i + 1}
        </span>
        <span className="text-sm font-sans leading-relaxed">
          <span className="font-medium text-foreground">{point.label}</span>
          <span className="text-muted-foreground"> — {point.note}</span>
        </span>
      </li>
    ))}
  </ul>
);

/**
 * The steps, with one of them lit at a time so the figure beside them has
 * something to keep time with. The loop stops on hover-free, motion-reduced
 * devices because the numbers are enough on their own.
 */
export const StepList = ({ steps, loop = false }: { steps: string[]; loop?: boolean }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!loop || steps.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), 2600);
    return () => window.clearInterval(id);
  }, [loop, steps.length]);

  return (
    <ol className="space-y-2">
      {steps.map((step, i) => {
        const lit = loop && i === active;
        return (
          <li
            key={step}
            className={cn(
              'flex gap-3 rounded-xl px-2.5 py-2 transition-colors duration-500',
              lit ? 'bg-primary/10' : 'bg-transparent',
            )}
          >
            <span
              className={cn(
                'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-sans font-semibold transition-colors duration-500',
                lit ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <span className="text-sm font-sans leading-relaxed text-foreground/90">{step}</span>
          </li>
        );
      })}
    </ol>
  );
};

/** The common error, named plainly. */
export const WrongPanel = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section className="rounded-2xl border border-destructive/25 bg-destructive/5 p-4">
    <p className="text-xs font-sans uppercase tracking-wider text-destructive/90">{heading}</p>
    <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{children}</p>
  </section>
);

/** A quiet link at the foot of a screen — the way to the longer explanation. */
export const QuietLink = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-sm font-sans font-medium text-primary underline-offset-4 hover:underline"
  >
    {children}
  </button>
);

/** The page body every krama screen shares: one column, generous bottom room. */
export const KramaPage = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('mx-auto w-full max-w-md space-y-5 px-4 pb-10', className)}>{children}</div>
);
