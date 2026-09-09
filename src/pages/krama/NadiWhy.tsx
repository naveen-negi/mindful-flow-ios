import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScreenHeader from '@/components/ScreenHeader';
import { ChannelsFigure } from '@/components/krama/Figures';
import { KramaPage, Kicker, Lede } from '@/components/krama/Panels';
import { NADI } from '@/data/krama';

/** Stage one, and why it comes first: the two channels and the signs it worked. */
const NadiWhy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/krama"
        backLabel="The path"
        eyebrow={NADI.eyebrow}
        title={NADI.name}
        subtitle={NADI.summary}
      />
      <KramaPage>
        <div className="flex items-center gap-5 rounded-2xl border border-foreground/5 bg-card/60 p-4">
          <ChannelsFigure className="max-w-[110px]" />
          <ul className="flex-1 space-y-3">
            {NADI.channels.map((channel) => (
              <li key={channel.label} className="text-sm font-sans leading-relaxed">
                <span className="font-medium text-foreground">{channel.label}</span>
                <span className="block text-muted-foreground">{channel.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <Lede>{NADI.susumna}</Lede>

        <section className="rounded-2xl border border-foreground/5 bg-muted/30 p-4">
          <Kicker>{NADI.signsHeading}</Kicker>
          <p className="mt-1.5 text-sm font-sans leading-relaxed text-muted-foreground">{NADI.signs}</p>
        </section>

        <Lede>{NADI.marker}</Lede>

        <Button onClick={() => navigate('/krama/nadi/how')} className="w-full rounded-xl py-6 text-base">
          Show me the practice
        </Button>
      </KramaPage>
    </div>
  );
};

export default NadiWhy;
