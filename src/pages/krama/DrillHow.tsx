import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScreenHeader from '@/components/ScreenHeader';
import { SeatedFigure, TongueFigure, type Site } from '@/components/krama/Figures';
import { KeyPointsList, KramaPage, StepList, WrongPanel } from '@/components/krama/Panels';
import { drillById, type DrillId } from '@/data/krama';

const SITE_OF: Record<DrillId, Site> = {
  mula: 'pelvis',
  jalandhara: 'throat',
  uddiyana: 'abdomen',
  nabho: null,
};

/** The position, with the one place it happens marked. */
const DrillHow = () => {
  const { drill: id } = useParams();
  const navigate = useNavigate();
  const drill = drillById(id ?? '');
  if (!drill) return <Navigate to="/bandha" replace />;

  const goPractise = () =>
    navigate(drill.practice.kind === 'rounds' ? `/bandha/${drill.id}/setup` : `/bandha/${drill.id}/run`);

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo={`/bandha/${drill.id}`}
        backLabel={drill.name}
        eyebrow={drill.howKicker}
        title={drill.howTitle}
      />
      <KramaPage>
        <div className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-card/60 p-4">
          {drill.id === 'nabho' ? (
            <TongueFigure className="max-w-[130px]" />
          ) : (
            <SeatedFigure site={SITE_OF[drill.id]} className="max-w-[112px]" />
          )}
          <div className="flex-1">
            <KeyPointsList points={drill.keyPoints} />
          </div>
        </div>

        <StepList steps={drill.steps} loop />

        {drill.wrong && drill.wrongHeading && (
          <WrongPanel heading={drill.wrongHeading}>{drill.wrong}</WrongPanel>
        )}

        <Button onClick={goPractise} className="w-full rounded-xl py-6 text-base">
          {drill.practice.cta}
        </Button>
      </KramaPage>
    </div>
  );
};

export default DrillHow;
