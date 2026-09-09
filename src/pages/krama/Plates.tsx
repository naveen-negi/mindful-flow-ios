import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, Kicker, QuietLink } from '@/components/krama/Panels';
import { PLATES, PLATES_COPY, type Plate } from '@/data/krama';

/**
 * A plate is only shown when its file has been bundled with the app. Nothing
 * is hotlinked from a library, and the caption line — manuscript, date,
 * holding institution, licence — travels with the plate whether or not the
 * image itself is there.
 */
const PlateCard = ({ plate, onOpen }: { plate: Plate; onOpen: () => void }) => {
  const [missing, setMissing] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-foreground/5 bg-card/60">
      {missing ? (
        <div className="flex h-32 items-center justify-center border-b border-foreground/5 bg-muted/40 px-4 text-center">
          <p className="font-sans text-xs leading-relaxed text-muted-foreground">
            Plate not bundled yet — the caption stands in for it.
          </p>
        </div>
      ) : (
        <img
          src={plate.file}
          alt={plate.title}
          onError={() => setMissing(true)}
          className="max-h-56 w-full border-b border-foreground/5 bg-white object-contain"
        />
      )}
      <div className="p-4">
        <h2 className="font-serif text-lg font-semibold text-foreground">{plate.title}</h2>
        <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{plate.body}</p>
        <p className="mt-2.5 font-sans text-xs italic leading-relaxed text-muted-foreground/80">
          {plate.source}
        </p>
        {plate.to && (
          <div className="mt-3">
            <QuietLink onClick={onOpen}>The practice →</QuietLink>
          </div>
        )}
      </div>
    </article>
  );
};

const Plates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/reference"
        backLabel="Sources"
        eyebrow="Reference"
        title="Plates"
        subtitle={PLATES_COPY.intro}
      />
      <KramaPage>
        {PLATES.map((plate) => (
          <PlateCard key={plate.id} plate={plate} onOpen={() => plate.to && navigate(plate.to)} />
        ))}

        <p className="text-xs font-sans leading-relaxed text-muted-foreground/80">{PLATES_COPY.note}</p>

        <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          <Kicker>{PLATES_COPY.aboutHeading}</Kicker>
          <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">
            {PLATES_COPY.about}
          </p>
          <p className="mt-2.5 text-sm font-sans leading-relaxed text-muted-foreground">
            {PLATES_COPY.more}
          </p>
          <p className="mt-2.5 font-sans text-xs leading-relaxed text-muted-foreground/80">
            {PLATES_COPY.shipping}
          </p>
        </section>
      </KramaPage>
    </div>
  );
};

export default Plates;
