import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { learnChapters } from '@/data/learnChapters';

const linkClass =
  'group flex-1 rounded-lg py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:opacity-70 transition-opacity';
const labelClass =
  'flex items-center gap-1 text-xs font-sans uppercase tracking-wider text-muted-foreground';
const titleClass = 'mt-1 block font-serif text-lg text-foreground group-hover:text-primary';

/**
 * Previous / next links at the end of a Learn chapter, in reading order.
 * Sits in the content flow like the last line of a page, so it never covers
 * the text. The sticky back button in ScreenHeader handles leaving the chapter.
 */
const ChapterFooter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const index = learnChapters.findIndex((chapter) => chapter.path === pathname);
  const prev = index > 0 ? learnChapters[index - 1] : undefined;
  const next = index >= 0 && index < learnChapters.length - 1 ? learnChapters[index + 1] : undefined;

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-10 pt-6 border-t border-foreground/10 flex items-start justify-between gap-4"
    >
      {prev ? (
        <button type="button" onClick={() => navigate(prev.path)} className={`${linkClass} text-left`}>
          <span className={labelClass}>
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className={titleClass}>{prev.title}</span>
        </button>
      ) : (
        <span className="flex-1" />
      )}

      {next ? (
        <button type="button" onClick={() => navigate(next.path)} className={`${linkClass} text-right`}>
          <span className={`${labelClass} justify-end`}>
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className={titleClass}>{next.title}</span>
        </button>
      ) : (
        <button type="button" onClick={() => navigate('/')} className={`${linkClass} text-right`}>
          <span className={`${labelClass} justify-end`}>End of Learn</span>
          <span className="mt-1 block font-serif text-lg text-primary">Begin practice</span>
        </button>
      )}
    </nav>
  );
};

export default ChapterFooter;
