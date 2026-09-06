import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface ScreenHeaderProps {
  /** Route the back button goes to. Always an explicit route, never history. */
  backTo: string;
  /** Name of the screen the back button leads to, shown next to the chevron. */
  backLabel: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

/**
 * Sticky back bar plus page heading for every screen below Home.
 *
 * The app runs inside a Capacitor webview: no browser chrome, no swipe-back
 * gesture. Each screen therefore owns its way out, and the back button always
 * says where it leads. navigate(-1) is deliberately avoided — inside a chapter
 * it walks back through the previous chapters instead of leaving them.
 */
const ScreenHeader = ({ backTo, backLabel, title, subtitle, eyebrow }: ScreenHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Same paper as the page so it is invisible at rest and simply covers text once scrolled */}
      <nav className="sticky top-0 z-40 pt-safe zen-texture">
        {/* Short fade below the bar so scrolled text dissolves under it instead of being cut off */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-background to-transparent"
        />
        <div className="container max-w-4xl mx-auto px-3 pb-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(backTo)}
            className="-ml-1 px-2 text-base font-sans font-medium text-primary hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            {backLabel}
          </Button>
        </div>
      </nav>

      <header className="container max-w-4xl mx-auto px-4 pt-3 pb-6">
        {eyebrow && (
          <p className="mb-2 text-xs font-sans uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-serif font-semibold text-foreground tracking-wide">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-base font-sans text-muted-foreground">{subtitle}</p>
        )}
      </header>
    </>
  );
};

export default ScreenHeader;
