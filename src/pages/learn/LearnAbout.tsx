import { Card } from '@/components/ui/card';
import ScreenHeader from '@/components/ScreenHeader';
import ChapterFooter from '@/components/ChapterFooter';

const steps = [
  {
    name: 'Inhale through the nose',
    detail: 'Breathe in slowly, filling from the belly up to the chest.',
  },
  {
    name: 'Hold, gently',
    detail: 'Four times the length of the inhale. Stay relaxed; never strain.',
  },
  {
    name: 'Exhale through the mouth',
    detail: 'Twice the length of the inhale. Release slowly — this is where the body settles.',
  },
];

const LearnAbout = () => {
  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/learn"
        backLabel="Learn"
        eyebrow="Sahita Kumbhaka"
        title="About this app"
        subtitle="What it teaches and how a session works"
      />

      <div className="container max-w-4xl mx-auto px-4">
        <p className="mb-8 font-serif text-xl leading-relaxed text-foreground">
          This app teaches Sahita Kumbhaka — the classical pranayama technique built on a single
          ratio for breath retention. You choose how long to inhale; the hold and the exhale follow
          from it.
        </p>

        <div className="space-y-6">
          {/* Same ratio treatment as the home screen, so it reads as the app's signature */}
          <div className="rounded-xl bg-muted/30 p-5 border border-foreground/5">
            <p className="mb-3 text-sm font-sans font-medium text-foreground/60 uppercase tracking-wide">
              The ratio
            </p>
            <div className="flex items-center justify-between text-4xl font-serif font-semibold">
              <div className="text-center">
                <div className="text-[hsl(var(--phase-inhale))]">1</div>
                <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Inhale</div>
              </div>
              <div className="text-muted-foreground font-normal">:</div>
              <div className="text-center">
                <div className="text-[hsl(var(--phase-hold))]">4</div>
                <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Hold</div>
              </div>
              <div className="text-muted-foreground font-normal">:</div>
              <div className="text-center">
                <div className="text-[hsl(var(--phase-exhale))]">2</div>
                <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Exhale</div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-sans text-muted-foreground">
              Inhale 5 s → hold 20 s → exhale 10 s
            </p>
          </div>

          <Card className="border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">How to practice</h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step.name} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-serif font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-sans font-medium text-foreground">{step.name}</p>
                    <p className="mt-0.5 text-sm font-sans text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">How a session works</h2>
            <ul className="space-y-3 text-sm font-sans leading-relaxed text-foreground/80">
              <li>Pick your inhale length on the home screen. Hold and exhale are set for you.</li>
              <li>One inhale, hold and exhale is a round. A session is a set number of rounds — ten by default.</li>
              <li>
                Between rounds the screen rests on a pointer from Nisargadatta Maharaj. Sit with it,
                then continue when you are ready.
              </li>
              <li>Every session is recorded under Progress.</li>
              <li>Haptic cues, pointer notifications and the progression step live under Settings.</li>
            </ul>
          </Card>

          <Card className="border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">Where to begin</h2>
            <div className="mb-4 rounded-xl bg-muted/30 p-5 text-center border border-foreground/5">
              <p className="mb-2 text-xs font-sans uppercase tracking-wider text-muted-foreground">Beginner</p>
              <p className="font-serif text-3xl font-semibold text-foreground">4 : 16 : 8</p>
              <p className="mt-1 text-sm font-sans text-muted-foreground">A 28-second cycle</p>
            </div>
            <p className="mb-4 text-sm font-sans leading-relaxed text-foreground/80">
              Lengthen the inhale as your capacity grows. The ratio stays the same.
            </p>
            <ul className="space-y-2 text-sm font-sans text-foreground/80">
              <li>✓ Practice on an empty stomach</li>
              <li>✓ Never force the breath</li>
              <li>✓ Stop if you feel uncomfortable</li>
            </ul>
          </Card>
        </div>

        <ChapterFooter />
      </div>
    </div>
  );
};

export default LearnAbout;
