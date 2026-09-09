import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, Kicker, Notice, QuietLink } from '@/components/krama/Panels';
import { DRILLS, drillById } from '@/data/krama';

/**
 * One lock as the books have it and as it is done — the two halves kept apart
 * on purpose, so a claim is never mistaken for an instruction.
 */
const ReferenceEntry = () => {
  const { drill: id } = useParams();
  const navigate = useNavigate();
  const drill = drillById(id ?? '');
  if (!drill) return <Navigate to="/reference" replace />;

  const index = DRILLS.findIndex((d) => d.id === drill.id) + 1;
  const body = drill.reference?.body ?? drill.summary;

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/reference"
        backLabel="Sources"
        eyebrow={`${drill.id === 'nabho' ? 'Mudrā' : 'Bandha'} · entry ${index} of ${DRILLS.length}`}
        title={drill.name}
      />
      <KramaPage>
        <section>
          <Kicker>In the body.</Kicker>
          <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{body}</p>
        </section>

        <section>
          <Kicker>In the books.</Kicker>
          {drill.reference ? (
            <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">
              {drill.reference.books}
            </p>
          ) : (
            <ul className="mt-1.5 space-y-2">
              {drill.claims.map((claim) => (
                <li key={claim.heading} className="text-sm font-sans leading-relaxed">
                  <span className="text-foreground/90">{claim.heading}</span>
                  <span className="block text-muted-foreground/80 italic">{claim.citation}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Notice heading={drill.noticeHeading}>{drill.notice}</Notice>

        <div className="flex flex-col items-start gap-3">
          <QuietLink onClick={() => navigate(`/bandha/${drill.id}/gloss`)}>{drill.gloss.link}</QuietLink>
          <QuietLink onClick={() => navigate(`/bandha/${drill.id}/how`)}>The practice →</QuietLink>
        </div>
      </KramaPage>
    </div>
  );
};

export default ReferenceEntry;
