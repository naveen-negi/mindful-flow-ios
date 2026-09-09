import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScreenHeader from '@/components/ScreenHeader';
import { HandFigure } from '@/components/krama/Figures';
import { KeyPointsList, KramaPage, Notice, StepList } from '@/components/krama/Panels';
import { NADI } from '@/data/krama';

/** The hand, then one full round of it. */
const NadiHow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/krama/nadi"
        backLabel={NADI.name}
        eyebrow={NADI.howEyebrow}
        title={NADI.howTitle}
      />
      <KramaPage>
        <div className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-card/60 p-4">
          <HandFigure className="max-w-[124px]" />
          <div className="flex-1">
            <KeyPointsList points={NADI.hand} />
          </div>
        </div>
        <p className="text-sm font-sans leading-relaxed text-muted-foreground">{NADI.handNote}</p>

        <StepList steps={NADI.steps} loop />

        <Notice heading={NADI.noRetention}>{NADI.countNote}</Notice>

        <Button
          onClick={() => navigate('/krama/nadi/practice')}
          className="w-full rounded-xl py-6 text-base"
        >
          Begin — twelve rounds
        </Button>
      </KramaPage>
    </div>
  );
};

export default NadiHow;
