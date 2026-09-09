import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PracticeShell from '@/components/krama/PracticeShell';
import { useDrillTimer } from '@/hooks/useDrillTimer';
import { MAHA_MUDRA, drillById, type PracticeId } from '@/data/krama';
import { canSitFaceDown, sideForRound, type RoundsPlan } from '@/lib/krama';
import { OPENING_SECONDS, playCue, playOpening, unlockAudio } from '@/lib/bowl';
import { getKramaSettings, getPlan, saveKramaSession } from '@/utils/kramaStorage';
import { KeepAwake } from '@capacitor-community/keep-awake';

interface DoneProps {
  rounds: number;
  stoppedEarly: boolean;
  onLeave: () => void;
}

const Done = ({ rounds, stoppedEarly, onLeave }: DoneProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 zen-texture px-8 text-center pb-safe pt-safe">
    <div>
      <p className="font-serif text-3xl font-semibold text-foreground">
        {rounds} round{rounds === 1 ? '' : 's'}
      </p>
      <p className="mt-2 font-sans text-sm text-muted-foreground">
        {stoppedEarly ? 'Ended early. The log is kept.' : 'Done. Sit a moment before you get up.'}
      </p>
    </div>
    <Button onClick={onLeave} className="rounded-xl px-8 py-6 text-base">
      Haṭha krama
    </Button>
  </div>
);

/** Nabho mudrā is not counted — it is simply held while the breath runs free. */
const SettleRun = ({
  name,
  shortName,
  seconds,
  holdWord,
  stopHint,
  practiceId,
}: {
  name: string;
  shortName: string;
  seconds: number;
  holdWord: string;
  stopHint: string;
  practiceId: PracticeId;
}) => {
  const navigate = useNavigate();
  const [settings] = useState(() => getKramaSettings());
  const [remaining, setRemaining] = useState(seconds + OPENING_SECONDS);
  const [done, setDone] = useState<{ stoppedEarly: boolean } | null>(null);
  // The interval below is created once, so anything it reports at the end has
  // to come from a ref rather than a captured render value.
  const startedAt = useRef(Date.now());
  const settled = useRef(false);

  const finish = useCallback(
    (stoppedEarly: boolean) => {
      if (settled.current) return;
      settled.current = true;
      KeepAwake.allowSleep().catch(() => undefined);
      saveKramaSession({
        practice: practiceId,
        roundsCompleted: stoppedEarly ? 0 : 1,
        roundsPlanned: 1,
        hold: seconds,
        duration: Math.round((Date.now() - startedAt.current) / 1000),
        stoppedEarly,
      });
      setDone({ stoppedEarly });
    },
    [practiceId, seconds],
  );

  useEffect(() => {
    KeepAwake.keepAwake().catch(() => undefined);
    startedAt.current = Date.now();
    void unlockAudio().then(() =>
      playOpening({ volume: settings.bowlVolume, vibration: settings.vibration }),
    );
    const endsAt = Date.now() + (seconds + OPENING_SECONDS) * 1000;
    const id = window.setInterval(() => {
      const left = Math.ceil((endsAt - Date.now()) / 1000);
      setRemaining(Math.max(0, left));
      if (left <= 0) {
        window.clearInterval(id);
        playCue('release', { volume: settings.bowlVolume, vibration: settings.vibration });
        finish(false);
      }
    }, 200);
    return () => {
      window.clearInterval(id);
      KeepAwake.allowSleep().catch(() => undefined);
    };
    // Started once, on mount: a settle has no settings to change mid-sitting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 zen-texture px-8 text-center pb-safe pt-safe">
        <p className="max-w-[18rem] font-serif text-2xl font-semibold text-foreground">
          {done.stoppedEarly ? 'Ended early.' : 'The tongue can stay where it is.'}
        </p>
        <Button onClick={() => navigate('/bandha')} className="rounded-xl px-8 py-6 text-base">
          Haṭha krama
        </Button>
      </div>
    );
  }

  return (
    <PracticeShell
      status={name}
      badge={holdWord}
      stopLabel="End the sitting"
      stopHint={stopHint}
      onStop={() => finish(true)}
      dimmable={canSitFaceDown(settings.vibration)}
    >
      <p className="font-serif text-7xl font-semibold tabular-nums text-foreground">{remaining}</p>
      <p className="mt-3 font-sans text-sm text-muted-foreground">
        {remaining === 1 ? 'second' : 'seconds'}
      </p>
      <p className="mt-8 max-w-[16rem] font-sans text-sm leading-relaxed text-muted-foreground">
        Breathing freely. {shortName} needs nothing else.
      </p>
    </PracticeShell>
  );
};

/**
 * Holding and resting — the one practice screen every drill that counts rounds
 * reuses. The rest is a named phase with its own cue and its own clock,
 * because on an empty-lung lock the breath coming back matters as much as the
 * hold that emptied it.
 */
const DrillRun = () => {
  const { drill: id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [settings] = useState(() => getKramaSettings());
  const [result, setResult] = useState<{ rounds: number; stoppedEarly: boolean } | null>(null);

  const isMaha = id === 'maha-mudra';
  const drill = isMaha ? null : drillById(id ?? '');
  const practice = isMaha ? MAHA_MUDRA.practice : drill?.practice;
  const practiceId = (isMaha ? 'maha-mudra' : drill?.id) as PracticeId | undefined;

  const fallback: RoundsPlan =
    practice && practice.kind === 'rounds'
      ? { rounds: practice.rounds, hold: practice.hold, rest: practice.rest }
      : { rounds: 1, hold: 10, rest: 10 };
  const stateplan = (location.state as { plan?: RoundsPlan } | null)?.plan;
  const [plan] = useState<RoundsPlan>(() =>
    stateplan ?? (practiceId ? getPlan(practiceId, fallback) : fallback),
  );

  const onFinish = useCallback(
    ({ roundsCompleted, seconds, stoppedEarly }: { roundsCompleted: number; seconds: number; stoppedEarly: boolean }) => {
      if (!practiceId) return;
      saveKramaSession({
        practice: practiceId,
        roundsCompleted,
        roundsPlanned: plan.rounds,
        hold: plan.hold,
        duration: seconds,
        stoppedEarly,
      });
      setResult({ rounds: roundsCompleted, stoppedEarly });
    },
    [plan.hold, plan.rounds, practiceId],
  );

  const timer = useDrillTimer({
    plan,
    inhaleCue: practice?.kind === 'rounds' ? practice.inhaleCue : false,
    settings: { volume: settings.bowlVolume, vibration: settings.vibration },
    onFinish,
  });

  const { start } = timer;
  const isRounds = practice?.kind === 'rounds';
  useEffect(() => {
    if (isRounds) start();
  }, [isRounds, start]);

  if (!practice || !practiceId) return <Navigate to="/bandha" replace />;

  if (practice.kind === 'settle') {
    return (
      <SettleRun
        name={drill!.name}
        shortName={drill!.shortName}
        seconds={practice.seconds}
        holdWord={practice.holdWord}
        stopHint={practice.stopHint}
        practiceId={practiceId}
      />
    );
  }

  if (result) {
    return (
      <Done rounds={result.rounds} stoppedEarly={result.stoppedEarly} onLeave={() => navigate('/bandha')} />
    );
  }

  const name = isMaha ? MAHA_MUDRA.shortName : drill!.shortName;
  const { phase, round, remaining } = timer;
  const side = sideForRound(round || 1);
  const status =
    phase === 'opening'
      ? name
      : `${name} · round ${Math.min(Math.max(round, 1), plan.rounds)} of ${plan.rounds}`;
  const badge = phase === 'rest' ? 'resting' : phase === 'hold' ? practice.holdWord : undefined;

  return (
    <PracticeShell
      status={status}
      badge={badge}
      stopLabel="Stop — dizzy"
      stopHint={practice.stopHint}
      onStop={timer.stop}
      dimmable={canSitFaceDown(settings.vibration)}
    >
      {phase === 'opening' ? (
        <>
          <p className="font-serif text-7xl font-semibold tabular-nums text-foreground/70">
            {remaining}
          </p>
          <p className="mt-6 max-w-[16rem] font-sans text-sm leading-relaxed text-muted-foreground">
            Three bowl strikes, then the lock.
          </p>
        </>
      ) : (
        <>
          {isMaha && (
            <p className="mb-4 font-sans text-sm uppercase tracking-wider text-primary">
              {side} heel in
            </p>
          )}
          <p className="font-serif text-7xl font-semibold tabular-nums text-foreground">{remaining}</p>
          <p className="mt-3 font-sans text-sm text-muted-foreground">
            {remaining === 1 ? 'second' : 'seconds'} {phase === 'hold' ? 'held' : 'rest'}
          </p>

          {phase === 'hold' ? (
            <p className="mt-8 max-w-[16rem] font-sans text-sm leading-relaxed text-muted-foreground">
              {isMaha
                ? 'two strikes — chin down, root up, hold it in'
                : 'rim ringing — the lock is still on'}
            </p>
          ) : (
            <div className="mt-8 max-w-[17rem] space-y-4">
              <div>
                <p className="font-sans text-sm font-medium text-foreground/80">Breathe normally</p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                  Two or three full breaths. Nothing held, nothing lifted.
                </p>
              </div>
              {round < plan.rounds && (
                <div>
                  <p className="font-sans text-sm text-muted-foreground">
                    Next: round {round + 1} — two strikes to set the lock
                  </p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground/80">
                    a soft roll first, so the cue is never a surprise
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </PracticeShell>
  );
};

export default DrillRun;
