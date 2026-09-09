import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage } from '@/components/krama/Panels';
import { GATE_COPY, GATE_QUESTIONS } from '@/data/krama';
import { gateVerdict } from '@/lib/krama';
import { getKramaSettings, updateKramaSettings } from '@/utils/kramaStorage';
import { cn } from '@/lib/utils';

const IDS = GATE_QUESTIONS.map((q) => q.id);

/**
 * The six questions that open uḍḍīyāna.
 *
 * The check only ever closes a door. A clear run says the drill is open, not
 * that anybody is well — and a single yes leaves the other three locks exactly
 * where they were.
 */
const SafetyGate = () => {
  const navigate = useNavigate();
  const stored = getKramaSettings();
  const [answers, setAnswers] = useState<Record<string, boolean>>(stored.gateAnswers ?? {});
  const [submitted, setSubmitted] = useState(stored.gateCleared);

  const verdict = gateVerdict(answers, IDS);

  const answer = (id: string, value: boolean) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setSubmitted(false);
    const v = gateVerdict(next, IDS);
    if (v.complete) {
      updateKramaSettings({ gateAnswers: next, gateCleared: v.cleared });
      setSubmitted(true);
    } else {
      updateKramaSettings({ gateAnswers: next, gateCleared: false });
    }
  };

  const blocked = GATE_QUESTIONS.filter((q) => verdict.blockers.includes(q.id));

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow={GATE_COPY.eyebrow}
        title={GATE_COPY.title}
        subtitle={GATE_COPY.intro}
      />
      <KramaPage>
        {GATE_QUESTIONS.map((q) => {
          const value = answers[q.id];
          return (
            <Card
              key={q.id}
              className="border bg-card p-4 rounded-2xl"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <p className="font-sans text-sm font-medium leading-relaxed text-foreground">
                {q.question}
              </p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground">{q.because}</p>
              <div className="mt-3 flex gap-2">
                {([
                  { label: 'No', value: false },
                  { label: 'Yes', value: true },
                ] as const).map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => answer(q.id, option.value)}
                    className={cn(
                      'flex-1 rounded-xl border px-4 py-2 font-sans text-sm font-medium transition-colors',
                      value === option.value
                        ? option.value
                          ? 'border-destructive/40 bg-destructive/10 text-destructive'
                          : 'border-primary bg-primary/10 text-primary'
                        : 'border-foreground/10 text-muted-foreground',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}

        {submitted && verdict.complete && (
          <section
            className={cn(
              'rounded-2xl border p-4',
              verdict.cleared ? 'border-primary/30 bg-primary/5' : 'border-destructive/25 bg-destructive/5',
            )}
          >
            <p className="font-serif text-lg font-semibold text-foreground">
              {verdict.cleared ? GATE_COPY.cleared : GATE_COPY.blocked}
            </p>
            {verdict.cleared ? (
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground">
                {GATE_COPY.clearedNote}
              </p>
            ) : (
              <>
                <ul className="mt-2 space-y-1">
                  {blocked.map((q) => (
                    <li key={q.id} className="font-sans text-sm leading-relaxed text-muted-foreground">
                      — {q.question}
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-muted-foreground">
                  {GATE_COPY.blockedNote}
                </p>
              </>
            )}
          </section>
        )}

        {verdict.cleared && (
          <Button
            onClick={() => navigate('/bandha/uddiyana')}
            className="w-full rounded-xl py-6 text-base"
          >
            Uḍḍīyāna bandha
          </Button>
        )}
      </KramaPage>
    </div>
  );
};

export default SafetyGate;
