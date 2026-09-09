import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, QuietLink } from '@/components/krama/Panels';
import { DRILLS } from '@/data/krama';
import { getKramaSettings } from '@/utils/kramaStorage';

/**
 * Stage three. Any drill can be entered on its own — nothing here is a
 * sequence, and nothing here is mixed into the breath timer.
 */
const Hub = () => {
  const navigate = useNavigate();
  const { gateCleared } = getKramaSettings();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/"
        backLabel="Home"
        title="Haṭha krama"
        subtitle="Stage three. Four practices — nabho mudrā runs underneath the rest."
      />
      <KramaPage>
        {DRILLS.map((drill) => {
          const locked = Boolean(drill.gated) && !gateCleared;
          return (
            <Card
              key={drill.id}
              onClick={() => navigate(locked ? '/bandha/uddiyana/check' : `/bandha/${drill.id}`)}
              className="cursor-pointer border bg-card p-5 rounded-2xl transition-colors hover:bg-card/70"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif text-lg font-semibold text-foreground">{drill.name}</h2>
                {locked && <Lock className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2} />}
              </div>
              <p className="mt-0.5 font-sans text-xs uppercase tracking-wider text-muted-foreground">
                {drill.hubKicker}
              </p>
              <p className="mt-2.5 text-sm font-sans leading-relaxed text-muted-foreground">
                {locked ? 'Safety check not cleared yet — six questions, one minute.' : drill.hubBlurb}
              </p>
            </Card>
          );
        })}

        <div className="flex flex-col items-start gap-3 pt-1">
          <QuietLink onClick={() => navigate('/bandha/maha-mudra')}>Practise mahā mudrā</QuietLink>
          <QuietLink onClick={() => navigate('/bandha/sites')}>Where the three sit</QuietLink>
          <QuietLink onClick={() => navigate('/bandha/sounds')}>What the bowl is telling you</QuietLink>
          <QuietLink onClick={() => navigate('/reference')}>Reference &amp; sources</QuietLink>
        </div>
      </KramaPage>
    </div>
  );
};

export default Hub;
