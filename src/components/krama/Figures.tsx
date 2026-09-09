/**
 * Line figures for the haṭha krama screens.
 *
 * Drawn rather than photographed, and drawn plainly: a seat, a hand, a
 * section. Each one marks exactly one place, because the screen it sits on is
 * teaching exactly one thing. Motion is a slow pulse on the marked point and
 * is dropped entirely when the system asks for reduced motion.
 */

import { cn } from '@/lib/utils';

export type Site = 'throat' | 'abdomen' | 'pelvis' | null;

const SITE_POINTS: Record<Exclude<Site, null>, { x: number; y: number }> = {
  throat: { x: 60, y: 50 },
  abdomen: { x: 60, y: 88 },
  pelvis: { x: 60, y: 118 },
};

interface SeatedFigureProps {
  /** The one place this screen is about. */
  site?: Site;
  /** Extra rings, drawn quiet, for the screen that shows all three at once. */
  ghostSites?: Array<Exclude<Site, null>>;
  /** Mahā mudrā: one heel folded in, the other leg long. */
  longLeg?: 'left' | 'right' | null;
  className?: string;
  animate?: boolean;
}

const Marker = ({ x, y, strong, animate }: { x: number; y: number; strong: boolean; animate: boolean }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={strong ? 9 : 7}
      className={cn(
        'fill-none',
        strong ? 'stroke-primary' : 'stroke-foreground/25',
        strong && animate && 'motion-safe:animate-pulse',
      )}
      strokeWidth={strong ? 1.6 : 1.1}
    />
    <circle cx={x} cy={y} r={1.6} className={strong ? 'fill-primary' : 'fill-foreground/30'} />
  </g>
);

export const SeatedFigure = ({
  site = null,
  ghostSites = [],
  longLeg = null,
  className,
  animate = true,
}: SeatedFigureProps) => (
  <svg
    viewBox="0 0 120 170"
    className={cn('h-auto w-full max-w-[190px]', className)}
    role="img"
    aria-label="Seated figure"
  >
    <g
      className="stroke-foreground/70"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* head, and the line of the neck folding forward at the notch */}
      <circle cx={60} cy={28} r={12} />
      <path d="M60 40 L60 46" />
      {/* shoulders and torso */}
      <path d="M43 64 Q60 54 77 64" />
      <path d="M43 64 Q42 92 46 114" />
      <path d="M77 64 Q78 92 74 114" />
      {/* arms, carried wide of the body to the knees */}
      <path d="M44 66 Q28 90 30 118" />
      <path d="M76 66 Q92 90 90 118" />
      {longLeg === null ? (
        <>
          {/* folded legs */}
          <path d="M22 122 Q60 102 98 122" />
          <path d="M22 122 Q60 150 98 122" />
        </>
      ) : longLeg === 'right' ? (
        <>
          <path d="M26 122 Q48 106 66 120" />
          <path d="M26 122 Q46 140 66 124" />
          <path d="M66 122 L112 134" />
          <path d="M112 134 L110 126" />
        </>
      ) : (
        <>
          <path d="M94 122 Q72 106 54 120" />
          <path d="M94 122 Q74 140 54 124" />
          <path d="M54 122 L8 134" />
          <path d="M8 134 L10 126" />
        </>
      )}
    </g>
    {ghostSites
      .filter((s) => s !== site)
      .map((s) => (
        <Marker key={s} x={SITE_POINTS[s].x} y={SITE_POINTS[s].y} strong={false} animate={false} />
      ))}
    {site && <Marker x={SITE_POINTS[site].x} y={SITE_POINTS[site].y} strong animate={animate} />}
  </svg>
);

/**
 * The two channels and what runs between them. Left is drawn cool, right warm,
 * and suṣumnā is the straight line neither of them touches.
 */
export const ChannelsFigure = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 160"
    className={cn('h-auto w-full max-w-[170px]', className)}
    role="img"
    aria-label="Iḍā and piṅgalā crossing suṣumnā"
  >
    <line
      x1={60}
      y1={16}
      x2={60}
      y2={148}
      className="stroke-foreground/45"
      strokeWidth={1.4}
      strokeDasharray="3 4"
    />
    <path
      d="M52 18 C34 44 86 62 68 88 C50 114 84 130 60 148"
      fill="none"
      className="stroke-[hsl(var(--phase-exhale))]"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <path
      d="M68 18 C86 44 34 62 52 88 C70 114 36 130 60 148"
      fill="none"
      className="stroke-primary"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <circle cx={52} cy={18} r={3} className="fill-[hsl(var(--phase-exhale))]" />
    <circle cx={68} cy={18} r={3} className="fill-primary" />
  </svg>
);

/** Nāsikāgra mudrā — the right hand, thumb and ring finger doing the work. */
export const HandFigure = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 140 120"
    className={cn('h-auto w-full max-w-[190px]', className)}
    role="img"
    aria-label="Right hand in nāsikāgra mudrā"
  >
    <g
      className="stroke-foreground/70"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* palm */}
      <path d="M52 104 Q44 76 52 56 Q64 44 82 48 Q98 54 96 74 Q94 96 84 106 Z" />
      {/* index and middle folded in */}
      <path d="M60 58 Q56 46 66 44 Q74 44 72 54" />
      <path d="M72 54 Q70 44 80 43 Q88 44 85 55" />
    </g>
    {/* thumb, to the right nostril */}
    <path
      d="M52 62 Q36 50 30 34"
      fill="none"
      className="stroke-primary"
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* ring finger, reaching across to the left */}
    <path
      d="M94 66 Q104 46 100 30"
      fill="none"
      className="stroke-primary"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <circle cx={30} cy={32} r={4} className="fill-none stroke-primary" strokeWidth={1.4} />
    <circle cx={100} cy={28} r={4} className="fill-none stroke-primary" strokeWidth={1.4} />
  </svg>
);

/** A section through the palate: where the tip goes, and where it stops. */
export const TongueFigure = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 160 120"
    className={cn('h-auto w-full max-w-[210px]', className)}
    role="img"
    aria-label="Section through the mouth with the tongue turned back"
  >
    <g
      className="stroke-foreground/70"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* profile */}
      <path d="M22 104 Q18 62 44 38 Q70 16 104 26 Q134 36 138 66 Q140 92 126 106" />
      {/* hard palate, then where it turns soft */}
      <path d="M46 66 Q74 56 100 62" />
      {/* jaw */}
      <path d="M44 92 Q74 100 106 92" />
    </g>
    {/* the tongue, turned back along the roof */}
    <path
      d="M52 88 Q76 84 94 72 Q104 66 110 68"
      fill="none"
      className="stroke-primary"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <circle cx={110} cy={68} r={7} className="fill-none stroke-primary" strokeWidth={1.4} />
    <circle cx={110} cy={68} r={1.6} className="fill-primary" />
  </svg>
);

export type GlossFigureId = 'mula' | 'jalandhara' | 'uddiyana' | 'nabho';

/**
 * The gloss screens each hold one picture in two states — what happens without
 * the lock, and what happens with it. The pair is the whole argument, so the
 * two are drawn side by side rather than animated between.
 */
export const GlossFigure = ({
  id,
  applied,
  className,
}: {
  id: GlossFigureId;
  applied: boolean;
  className?: string;
}) => {
  const accent = applied ? 'stroke-primary' : 'stroke-foreground/35';
  return (
    <svg
      viewBox="0 0 100 120"
      className={cn('h-auto w-full max-w-[130px]', className)}
      role="img"
      aria-label={applied ? 'With the lock' : 'Without the lock'}
    >
      <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {id === 'mula' && (
          <>
            <path d="M50 14 L50 62" className="stroke-foreground/45" strokeDasharray="3 4" />
            <path d="M50 20 L50 54" className="stroke-foreground/70" />
            <path d="M46 26 L50 20 L54 26" className="stroke-foreground/70" />
            {applied ? (
              <>
                <path d="M50 106 L50 66" className={accent} strokeWidth={2} />
                <path d="M46 72 L50 66 L54 72" className={accent} strokeWidth={2} />
                <circle cx={50} cy={60} r={6} className={accent} />
              </>
            ) : (
              <>
                <path d="M50 66 L50 106" className="stroke-foreground/35" strokeWidth={2} />
                <path d="M46 100 L50 106 L54 100" className="stroke-foreground/35" strokeWidth={2} />
              </>
            )}
          </>
        )}
        {id === 'jalandhara' && (
          <>
            <circle cx={50} cy={24} r={10} className="stroke-foreground/60" />
            <path d="M50 96 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0" className="stroke-foreground/60" />
            {applied ? (
              <>
                <path d="M30 58 L70 58" className={accent} strokeWidth={2} />
                <path d="M34 54 L38 62 M42 54 L46 62 M50 54 L54 62 M58 54 L62 62" className={accent} />
                <path d="M50 36 L50 52" className="stroke-foreground/45" strokeDasharray="3 4" />
              </>
            ) : (
              <path d="M50 36 L50 84" className="stroke-foreground/35" strokeDasharray="3 4" />
            )}
          </>
        )}
        {id === 'uddiyana' && (
          <>
            <path d="M28 30 Q50 20 72 30" className="stroke-foreground/60" />
            {applied ? (
              <>
                <path d="M34 44 Q50 62 66 44" className={accent} strokeWidth={2} />
                <path d="M50 100 L50 56" className={accent} strokeWidth={2} />
                <path d="M46 62 L50 56 L54 62" className={accent} strokeWidth={2} />
              </>
            ) : (
              <path d="M34 44 Q50 52 66 44" className="stroke-foreground/35" strokeWidth={2} />
            )}
            <path d="M50 104 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0" className="stroke-foreground/50" />
          </>
        )}
        {id === 'nabho' && (
          <>
            <path d="M28 40 L28 96 Q28 106 40 106 L60 106 Q72 106 72 96 L72 40" className="stroke-foreground/60" />
            {applied ? (
              <>
                <path d="M24 40 L76 40" className={accent} strokeWidth={2.2} />
                <path d="M50 92 Q38 74 50 60 Q62 74 50 92" className={accent} />
              </>
            ) : (
              <>
                <path d="M24 40 L36 40 M64 40 L76 40" className="stroke-foreground/35" strokeWidth={2.2} />
                <path d="M50 56 L50 26" className="stroke-foreground/35" />
                <path d="M46 32 L50 26 L54 32" className="stroke-foreground/35" />
              </>
            )}
          </>
        )}
      </g>
    </svg>
  );
};
