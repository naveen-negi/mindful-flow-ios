import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScreenHeader from '@/components/ScreenHeader';
import { Claims, KramaPage, Notice, QuietLink } from '@/components/krama/Panels';
import { drillById } from '@/data/krama';

/**
 * Why a lock is worth doing, in two parts: what the texts hold out — always
 * with the verse attached — and what the practitioner can actually check.
 */
const DrillWhy = () => {
  const { drill: id } = useParams();
  const navigate = useNavigate();
  const drill = drillById(id ?? '');
  if (!drill) return <Navigate to="/bandha" replace />;

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow={drill.order}
        title={drill.name}
        subtitle={drill.summary}
      />
      <KramaPage>
        <Claims claims={drill.claims} />
        <Notice heading={drill.noticeHeading}>{drill.notice}</Notice>

        <div className="pt-1">
          <QuietLink onClick={() => navigate(`/bandha/${drill.id}/gloss`)}>{drill.gloss.link}</QuietLink>
        </div>

        <Button
          onClick={() => navigate(`/bandha/${drill.id}/how`)}
          className="w-full rounded-xl py-6 text-base"
        >
          Show me how
        </Button>
      </KramaPage>
    </div>
  );
};

export default DrillWhy;
