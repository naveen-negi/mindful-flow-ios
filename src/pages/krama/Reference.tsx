import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, QuietLink } from '@/components/krama/Panels';
import { DRILLS, REFERENCE_INTRO } from '@/data/krama';

/** The library: one entry per lock, then the plates. */
const Reference = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow="Reference"
        title="Sources"
        subtitle={REFERENCE_INTRO}
      />
      <KramaPage>
        {DRILLS.map((drill, i) => (
          <Card
            key={drill.id}
            onClick={() => navigate(`/reference/${drill.id}`)}
            className="cursor-pointer border bg-card p-4 rounded-2xl transition-colors hover:bg-card/70"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
              {drill.id === 'nabho' ? 'Mudrā' : 'Bandha'} · entry {i + 1} of {DRILLS.length}
            </p>
            <h2 className="mt-1 font-serif text-lg font-semibold text-foreground">{drill.name}</h2>
            <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">
              {drill.claims.map((c) => c.citation).join(' · ')}
            </p>
          </Card>
        ))}

        <div className="pt-1">
          <QuietLink onClick={() => navigate('/reference/plates')}>Plates</QuietLink>
        </div>
      </KramaPage>
    </div>
  );
};

export default Reference;
