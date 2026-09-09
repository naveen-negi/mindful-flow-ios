import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScreenHeader from '@/components/ScreenHeader';
import { SeatedFigure } from '@/components/krama/Figures';
import { KeyPointsList, KramaPage, StepList } from '@/components/krama/Panels';
import { MAHA_MUDRA } from '@/data/krama';

/** The great seal: the heel does the root lock while the leg is long. */
const MahaMudra = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow={MAHA_MUDRA.kicker}
        title={MAHA_MUDRA.name}
        subtitle={MAHA_MUDRA.summary}
      />
      <KramaPage>
        <div className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-card/60 p-4">
          <SeatedFigure site="pelvis" longLeg="right" className="max-w-[128px]" />
          <div className="flex-1">
            <KeyPointsList points={MAHA_MUDRA.keyPoints} />
          </div>
        </div>

        <StepList steps={MAHA_MUDRA.steps} loop />

        <Button onClick={() => navigate('/bandha/sit')} className="w-full rounded-xl py-6 text-base">
          {MAHA_MUDRA.practice.cta}
        </Button>
      </KramaPage>
    </div>
  );
};

export default MahaMudra;
