import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage, Kicker } from '@/components/krama/Panels';
import { NADI, PATH_WHY, STAGES } from '@/data/krama';
import { dayOfCourse } from '@/lib/krama';
import { nadiSessionDates } from '@/utils/kramaStorage';

/**
 * The three stages in the order the texts give them, with stage one carrying
 * the only progress figure in the module: the ninety days the Haṭhapradīpikā
 * asks for before prāṇāyāma proper.
 */
const Path = () => {
  const navigate = useNavigate();
  const day = dayOfCourse(nadiSessionDates());

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/" backLabel="Home" eyebrow="Haṭha krama" title="The order of practice" />
      <KramaPage>
        {STAGES.map((stage) => (
          <Card
            key={stage.n}
            onClick={() => navigate(stage.to)}
            className="cursor-pointer border bg-card p-5 rounded-2xl transition-colors hover:bg-card/70"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-sans text-xs font-semibold text-primary">
                {stage.n}
              </span>
              <h2 className="flex-1 font-serif text-lg font-semibold text-foreground">{stage.title}</h2>
              {stage.badge && (
                <span className="rounded-full bg-primary/15 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {stage.badge}
                </span>
              )}
            </div>
            <p className="mt-2.5 text-sm font-sans leading-relaxed text-muted-foreground">{stage.body}</p>
            {stage.n === 1 && (
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${Math.round((day / NADI.courseDays) * 100)}%` }}
                  />
                </div>
                <span className="font-sans text-xs text-muted-foreground">
                  day {day} of {NADI.courseDays}
                </span>
              </div>
            )}
          </Card>
        ))}

        <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          <Kicker>{PATH_WHY.heading}</Kicker>
          <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">
            {PATH_WHY.body}
          </p>
        </section>

        <p className="text-xs font-sans leading-relaxed text-muted-foreground/80">
          {PATH_WHY.footnote}
        </p>
      </KramaPage>
    </div>
  );
};

export default Path;
