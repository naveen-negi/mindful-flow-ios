import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, QuietLink } from '@/components/krama/Panels';
import { MAHA_MUDRA, drillById, type PracticeId, type RoundsPractice } from '@/data/krama';
import { canSitFaceDown, clampCount, describePlan, formatDuration, planSeconds } from '@/lib/krama';
import { getKramaSettings, getPlan, savePlan } from '@/utils/kramaStorage';

interface StepperProps {
  label: string;
  hint: string;
  value: number;
  suffix?: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const Stepper = ({ label, hint, value, suffix, min, max, step = 1, onChange }: StepperProps) => (
  <div className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-card/60 px-4 py-3">
    <div className="flex-1">
      <p className="font-sans text-sm font-medium text-foreground">{label}</p>
      <p className="font-sans text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label={`Fewer ${label.toLowerCase()}`}
        onClick={() => onChange(clampCount(value - step, min, max))}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 active:bg-muted"
      >
        <Minus className="h-4 w-4" strokeWidth={2} />
      </button>
      <span className="w-12 text-center font-serif text-lg font-semibold tabular-nums text-foreground">
        {value}
        {suffix}
      </span>
      <button
        type="button"
        aria-label={`More ${label.toLowerCase()}`}
        onClick={() => onChange(clampCount(value + step, min, max))}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 active:bg-muted"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  </div>
);

/**
 * One setup screen, reused by every drill that counts rounds. The counts are
 * set here, with the eyes open, because nothing should have to be decided once
 * the phone is face down.
 */
const DrillSetup = () => {
  const { drill: id } = useParams();
  const navigate = useNavigate();

  const isMaha = id === 'maha-mudra';
  const drill = isMaha ? null : drillById(id ?? '');
  const practice: RoundsPractice | null = isMaha
    ? MAHA_MUDRA.practice
    : drill && drill.practice.kind === 'rounds'
      ? drill.practice
      : null;
  const practiceId = (isMaha ? 'maha-mudra' : drill?.id) as PracticeId | undefined;

  const [plan, setPlan] = useState(() =>
    practice && practiceId
      ? getPlan(practiceId, { rounds: practice.rounds, hold: practice.hold, rest: practice.rest })
      : { rounds: 0, hold: 0, rest: 0 },
  );
  const [settings] = useState(() => getKramaSettings());

  if (!practice || !practiceId) return <Navigate to="/bandha" replace />;

  const name = isMaha ? MAHA_MUDRA.name : drill!.name;
  const shortName = isMaha ? MAHA_MUDRA.shortName : drill!.shortName;
  const backTo = isMaha ? '/bandha/maha-mudra' : `/bandha/${drill!.id}/how`;
  const summary = isMaha ? MAHA_MUDRA.summary : drill!.summary;
  const faceDown = canSitFaceDown(settings.vibration);

  const begin = () => {
    savePlan(practiceId, plan);
    navigate(isMaha ? '/bandha/maha-mudra/run' : `/bandha/${drill!.id}/run`, { state: { plan } });
  };

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo={backTo}
        backLabel={shortName}
        eyebrow="Drill · set the count"
        title={name}
        subtitle={summary}
      />
      <KramaPage>
        <Stepper
          label="Rounds"
          hint={practice.roundsHint}
          value={plan.rounds}
          min={1}
          max={10}
          onChange={(rounds) => setPlan({ ...plan, rounds })}
        />
        <Stepper
          label="Hold"
          hint={practice.holdHint}
          value={plan.hold}
          suffix="s"
          min={3}
          max={60}
          onChange={(hold) => setPlan({ ...plan, hold })}
        />
        <Stepper
          label="Rest"
          hint={practice.restHint}
          value={plan.rest}
          suffix="s"
          min={5}
          max={90}
          step={5}
          onChange={(rest) => setPlan({ ...plan, rest })}
        />

        <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          <p className="font-sans text-xs uppercase tracking-wider text-foreground/60">This sitting</p>
          <p className="mt-1.5 font-sans text-sm text-muted-foreground">
            {describePlan(plan)}{' '}
            <span className="font-serif text-base font-semibold text-foreground">
              {formatDuration(planSeconds(plan))}
            </span>
          </p>
        </section>

        <p className="text-sm font-sans leading-relaxed text-muted-foreground">{practice.restRule}</p>

        {faceDown ? (
          <p className="font-sans text-xs text-muted-foreground">
            Bowl and haptics on — the phone can go face down.
          </p>
        ) : (
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
            <p className="font-sans text-sm leading-relaxed text-foreground/80">
              Vibration is off, so a face-down sitting will not start. Keep the screen up, or turn the
              vibration back on.
            </p>
            <div className="mt-2">
              <QuietLink onClick={() => navigate('/bandha/sounds')}>The bowl and the buzz</QuietLink>
            </div>
          </div>
        )}

        <Button onClick={begin} className="w-full rounded-xl py-6 text-base">
          {faceDown ? 'Begin' : 'Begin — keep the screen up'}
        </Button>
      </KramaPage>
    </div>
  );
};

export default DrillSetup;
