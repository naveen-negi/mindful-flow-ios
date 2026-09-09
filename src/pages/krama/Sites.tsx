import { useEffect, useState } from 'react';
import ScreenHeader from '@/components/ScreenHeader';
import { SeatedFigure, type Site } from '@/components/krama/Figures';
import { KramaPage } from '@/components/krama/Panels';
import { SITES, SITES_NOTE } from '@/data/krama';
import { cn } from '@/lib/utils';

const SITE_OF: Record<string, Exclude<Site, null>> = {
  jalandhara: 'throat',
  uddiyana: 'abdomen',
  mula: 'pelvis',
};

/** All three at once, each lighting in turn, top to bottom as the body has them. */
const Sites = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SITES.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  const lit = SITES[active];

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow="Where they sit"
        title="The three sites"
      />
      <KramaPage>
        <div className="flex justify-center py-2">
          <SeatedFigure
            site={SITE_OF[lit.id]}
            ghostSites={['throat', 'abdomen', 'pelvis']}
            className="max-w-[170px]"
          />
        </div>

        <ul className="space-y-2">
          {SITES.map((site, i) => (
            <li
              key={site.id}
              onClick={() => setActive(i)}
              className={cn(
                'cursor-pointer rounded-xl px-3 py-2.5 transition-colors duration-500',
                i === active ? 'bg-primary/10' : 'bg-transparent',
              )}
            >
              <p
                className={cn(
                  'font-sans text-sm font-medium transition-colors duration-500',
                  i === active ? 'text-foreground' : 'text-foreground/60',
                )}
              >
                {site.label}
              </p>
              <p className="text-sm font-sans leading-relaxed text-muted-foreground">{site.note}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm font-sans leading-relaxed text-muted-foreground">{SITES_NOTE}</p>
      </KramaPage>
    </div>
  );
};

export default Sites;
