import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import ScreenHeader from '@/components/ScreenHeader';
import { KramaPage } from '@/components/krama/Panels';
import { CUES, SOUNDS_FOOTNOTE, SOUNDS_INTRO } from '@/data/krama';
import { playCue, unlockAudio, type CueId } from '@/lib/bowl';
import { getKramaSettings, updateKramaSettings } from '@/utils/kramaStorage';

/**
 * The five cues, learned with the eyes open.
 *
 * Each row plays itself when tapped — the only way to learn a sound is to hear
 * it, and the only place to do that is before the sitting starts.
 */
const Sounds = () => {
  const [settings, setSettings] = useState(() => getKramaSettings());

  const set = (patch: Parameters<typeof updateKramaSettings>[0]) =>
    setSettings(updateKramaSettings(patch));

  const rehearse = async (id: CueId) => {
    await unlockAudio();
    playCue(id, { volume: settings.bowlVolume, vibration: settings.vibration });
  };

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader
        backTo="/bandha"
        backLabel="Haṭha krama"
        eyebrow="Bandha & mudrā"
        title="What the bowl is telling you"
        subtitle={SOUNDS_INTRO}
      />
      <KramaPage>
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-foreground/5 bg-card/60">
          {CUES.map((cue) => (
            <li key={cue.id}>
              <button
                type="button"
                onClick={() => rehearse(cue.id as CueId)}
                className="flex w-full items-baseline justify-between gap-4 px-4 py-3.5 text-left active:bg-muted/40"
              >
                <span className="font-sans text-sm font-medium text-foreground">{cue.name}</span>
                <span className="text-right font-sans text-xs text-muted-foreground">
                  {cue.sound}
                  {'quiet' in cue && cue.quiet && (
                    <span className="block text-muted-foreground/70">{cue.quiet}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <section className="space-y-5 rounded-2xl border border-foreground/5 bg-card/60 p-4">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-sm font-medium text-foreground">Bowl volume</span>
              <span className="font-sans text-xs tabular-nums text-muted-foreground">
                {Math.round(settings.bowlVolume * 100)}%
              </span>
            </div>
            <Slider
              className="mt-3"
              value={[Math.round(settings.bowlVolume * 100)]}
              min={0}
              max={100}
              step={5}
              onValueChange={([value]) => set({ bowlVolume: value / 100 })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-medium text-foreground">Vibration</span>
            <Switch
              checked={settings.vibration}
              onCheckedChange={(vibration) => set({ vibration })}
            />
          </div>
        </section>

        <p className="text-xs font-sans leading-relaxed text-muted-foreground/80">{SOUNDS_FOOTNOTE}</p>
      </KramaPage>
    </div>
  );
};

export default Sounds;
