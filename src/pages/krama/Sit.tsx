import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, QuietLink } from '@/components/krama/Panels';
import { MAHA_MUDRA, SIT } from '@/data/krama';
import { canSitFaceDown } from '@/lib/krama';
import { getKramaSettings, getPlan } from '@/utils/kramaStorage';

/**
 * The last screen read before the eyes close.
 *
 * Everything after this is carried by the bowl, so the check here is about the
 * three things that cannot be fixed once the phone is face down: the tongue,
 * the side, and whether the cues will actually reach you.
 */
const Sit = () => {
  const navigate = useNavigate();
  const settings = getKramaSettings();
  const plan = getPlan('maha-mudra', {
    rounds: MAHA_MUDRA.practice.rounds,
    hold: MAHA_MUDRA.practice.hold,
    rest: MAHA_MUDRA.practice.rest,
  });
  const faceDown = canSitFaceDown(settings.vibration);
  const audible = settings.bowlVolume > 0;

  const checks = [
    { label: 'Tongue turned back and resting', ok: true },
    { label: 'Left heel in, right leg long', ok: true },
    {
      label: audible && settings.vibration ? 'Sound and vibration both on' : 'Sound and vibration',
      ok: audible && settings.vibration,
      note: !settings.vibration
        ? 'Vibration is off — the sitting will run with the screen up.'
        : !audible
          ? 'The bowl is silent — the buzz will carry the round on its own.'
          : undefined,
    },
  ];

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha/maha-mudra"
        backLabel={MAHA_MUDRA.name}
        eyebrow={`${MAHA_MUDRA.name} · ${plan.rounds} each side`}
        title={SIT.heading}
      />
      <KramaPage>
        <ul className="space-y-2.5">
          {checks.map((check) => (
            <li key={check.label} className="flex gap-3">
              <span
                className={
                  check.ok
                    ? 'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary'
                    : 'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'
                }
              >
                {check.ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span className="text-sm font-sans leading-relaxed">
                <span className="text-foreground">{check.label}</span>
                {check.note && <span className="block text-muted-foreground">{check.note}</span>}
              </span>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          <p className="font-sans text-xs uppercase tracking-wider text-foreground/60">
            {SIT.listenHeading}
          </p>
          <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{SIT.listen}</p>
          <div className="mt-3">
            <QuietLink onClick={() => navigate('/bandha/sounds')}>{SIT.rehearse}</QuietLink>
          </div>
        </section>

        <div className="flex flex-col items-start gap-3">
          <QuietLink onClick={() => navigate('/bandha/maha-mudra/setup')}>
            {plan.rounds} each side · {plan.hold} s held — change the count
          </QuietLink>
        </div>

        <Button
          onClick={() => navigate('/bandha/maha-mudra/run', { state: { plan } })}
          className="w-full rounded-xl py-6 text-base"
        >
          {SIT.begin}
        </Button>

        <p className="text-xs font-sans leading-relaxed text-muted-foreground/80">
          {faceDown ? SIT.footnote : 'Screen stays awake and lit while the vibration is off.'}
        </p>
      </KramaPage>
    </div>
  );
};

export default Sit;
