import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PracticeShellProps {
  /** "Uḍḍīyāna · round 3 of 5" */
  status: string;
  /** "no retention", "holding on empty" — the one word under the status. */
  badge?: string;
  children: ReactNode;
  stopLabel: string;
  /** What to undo first — always shown next to the stop. */
  stopHint: string;
  onStop: () => void;
  /** Seconds of stillness before the screen goes dark. */
  dimAfter?: number;
  dimmable?: boolean;
}

/**
 * The screen for a sitting done with the eyes closed.
 *
 * It is only for the moment before and the moment after: once the practice is
 * running the phone goes face down, the bowl and the buzz carry the round, and
 * the screen darkens itself. A tap on the dark ends the sitting and keeps the
 * log, which is the only thing anyone reaches for a face-down phone to do.
 */
const PracticeShell = ({
  status,
  badge,
  children,
  stopLabel,
  stopHint,
  onStop,
  dimAfter = 9,
  dimmable = true,
}: PracticeShellProps) => {
  const [dim, setDim] = useState(false);
  const timer = useRef<number | null>(null);

  const wake = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setDim(false);
    if (!dimmable) return;
    timer.current = window.setTimeout(() => setDim(true), dimAfter * 1000);
  }, [dimAfter, dimmable]);

  useEffect(() => {
    wake();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [wake]);

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col px-6 pb-safe pt-safe transition-colors duration-1000',
        dim ? 'bg-[hsl(30_8%_7%)]' : 'zen-texture',
      )}
      onClick={dim ? onStop : undefined}
      role={dim ? 'button' : undefined}
      tabIndex={dim ? 0 : undefined}
      onKeyDown={dim ? (e) => e.key === 'Enter' && onStop() : undefined}
    >
      <header className="pt-8 text-center">
        <p
          className={cn(
            'font-sans text-sm transition-colors duration-1000',
            dim ? 'text-[hsl(30_10%_26%)]' : 'text-muted-foreground',
          )}
        >
          {status}
        </p>
        {badge && (
          <p
            className={cn(
              'mt-1 font-sans text-xs uppercase tracking-wider transition-colors duration-1000',
              dim ? 'text-[hsl(30_10%_20%)]' : 'text-primary',
            )}
          >
            {badge}
          </p>
        )}
      </header>

      <main
        className={cn(
          'flex flex-1 flex-col items-center justify-center text-center transition-opacity duration-1000',
          dim && 'opacity-30',
        )}
      >
        {children}
      </main>

      <footer className="pb-8 text-center">
        {dim ? (
          <p className="font-sans text-xs text-[hsl(30_10%_20%)]">tap to end · the log is kept</p>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStop();
              }}
              className="rounded-xl border border-destructive/30 px-5 py-2.5 font-sans text-sm font-medium text-destructive"
            >
              {stopLabel}
            </button>
            <p className="mt-2 font-sans text-xs text-muted-foreground">{stopHint}</p>
          </>
        )}
      </footer>
    </div>
  );
};

export default PracticeShell;
