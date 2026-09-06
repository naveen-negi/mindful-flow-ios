import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import { learnChapters } from '@/data/learnChapters';

const LearnIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/"
        backLabel="Home"
        eyebrow="Pranayama"
        title="Learn"
        subtitle="The practice, where it comes from, and how to do it safely"
      />

      <div className="container max-w-4xl mx-auto px-4">
        {/* One sheet of paper holding the contents, like the setup card on Home */}
        <Card
          className="overflow-hidden rounded-2xl border bg-card divide-y divide-foreground/5"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {learnChapters.map((chapter) => {
            const Icon = chapter.icon;
            return (
              <button
                key={chapter.path}
                type="button"
                onClick={() => navigate(chapter.path)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30 active:bg-muted/40 focus-visible:outline-none focus-visible:bg-muted/30"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg font-semibold text-foreground">
                    {chapter.title}
                  </span>
                  <span className="block text-sm font-sans text-muted-foreground">
                    {chapter.description}
                  </span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
              </button>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default LearnIndex;
