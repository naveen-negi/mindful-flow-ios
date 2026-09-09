import { Navigate, useParams } from 'react-router-dom';
import ScreenHeader from '@/components/ScreenHeader';
import { GlossFigure } from '@/components/krama/Figures';
import { KramaPage } from '@/components/krama/Panels';
import { drillById } from '@/data/krama';

/**
 * The picture the old books use, in plain words.
 *
 * Two states of one drawing, because that pairing is the whole argument: this
 * is what happens without the lock, this is what happens with it.
 */
const Gloss = () => {
  const { drill: id } = useParams();
  const drill = drillById(id ?? '');
  if (!drill) return <Navigate to="/bandha" replace />;

  const { gloss } = drill;
  const panels = [
    { state: false, point: gloss.before },
    { state: true, point: gloss.after },
  ];

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo={`/bandha/${drill.id}`}
        backLabel={drill.name}
        eyebrow="Learn more"
        title={gloss.title}
      />
      <KramaPage>
        <div className="grid grid-cols-2 gap-3">
          {panels.map(({ state, point }) => (
            <div
              key={point.label}
              className="rounded-2xl border border-foreground/5 bg-card/60 p-3 text-center"
            >
              <div className="flex justify-center">
                <GlossFigure id={drill.id} applied={state} className="max-w-[96px]" />
              </div>
              <p className="mt-2 font-sans text-sm font-medium text-foreground">{point.label}</p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground">{point.note}</p>
            </div>
          ))}
        </div>

        <p className="text-[15px] font-sans leading-relaxed text-foreground/90">{gloss.body}</p>

        <dl className="space-y-1.5 rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          {gloss.terms.map((term) => (
            <div key={term.term} className="text-sm font-sans leading-relaxed">
              <dt className="inline font-serif font-semibold text-foreground">{term.term}</dt>
              <dd className="inline text-muted-foreground"> — {term.meaning}</dd>
            </div>
          ))}
        </dl>
      </KramaPage>
    </div>
  );
};

export default Gloss;
