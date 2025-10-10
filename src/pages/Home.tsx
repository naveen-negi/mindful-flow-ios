import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BreathingRatio } from '@/types/breathing';
import { getSettings, saveSettings, calculateNextRatio } from '@/utils/storage';
import { Play, Settings, BarChart3 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const settings = getSettings();
  const [inhale, setInhale] = useState(settings.defaultRatio.inhale);
  const [rounds, setRounds] = useState(10);

  const ratio: BreathingRatio = {
    inhale,
    hold: inhale * 4,
    exhale: inhale * 2,
  };

  const handleStart = () => {
    const updatedSettings = {
      ...settings,
      defaultRatio: ratio,
    };
    saveSettings(updatedSettings);
    navigate('/practice', { state: { ratio, rounds } });
  };

  const nextRatio = calculateNextRatio(ratio, settings.progressionIncrement);

  return (
    <div className="flex min-h-screen flex-col bg-background p-6 pb-safe">
      <header className="mb-8 text-center pt-safe">
        <h1 className="mb-2 text-4xl font-serif font-semibold text-primary tracking-wide">
          Pranayama
        </h1>
        <p className="text-muted-foreground font-sans text-base">Mindful Breathing Practice</p>
      </header>

      <div className="mx-auto w-full max-w-md space-y-6">
        <Card className="border bg-card p-8 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="mb-6 text-xl font-sans font-medium text-foreground">Setup Practice</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="inhale" className="text-foreground">
                Inhale Duration (seconds)
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                Hold and exhale will adjust automatically (1:4:2 ratio)
              </p>
              <Input
                id="inhale"
                type="number"
                min="1"
                max="20"
                value={inhale}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1 && value <= 20) {
                    setInhale(value);
                  }
                }}
                className="mt-2 border-primary/30 bg-background/50 text-foreground text-lg font-semibold"
              />
            </div>

            <div className="rounded-xl bg-muted/30 p-5 border border-foreground/5">
              <p className="mb-3 text-sm font-sans font-medium text-foreground/60 uppercase tracking-wide">Current Ratio (1:4:2)</p>
              <div className="flex items-center justify-between text-3xl font-serif font-semibold">
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-inhale))]">{ratio.inhale}</div>
                  <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Inhale</div>
                </div>
                <div className="text-muted-foreground font-normal">:</div>
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-hold))]">{ratio.hold}</div>
                  <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Hold</div>
                </div>
                <div className="text-muted-foreground font-normal">:</div>
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-exhale))]">{ratio.exhale}</div>
                  <div className="text-xs text-muted-foreground font-sans mt-2 uppercase tracking-wider">Exhale</div>
                </div>
              </div>
            </div>


            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm text-muted-foreground font-sans">
                <strong className="text-foreground font-medium">Next progression:</strong> {nextRatio.inhale}:
                {nextRatio.hold}:{nextRatio.exhale}
              </p>
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="mt-6 w-full py-6 text-lg font-medium rounded-xl"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Practice
          </Button>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/progress')}
            variant="outline"
            className="flex-1 rounded-xl py-6"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Progress
          </Button>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            className="flex-1 rounded-xl py-6"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <Card className="border-accent/20 bg-accent/5 p-5 rounded-2xl">
          <p className="text-center text-base font-serif italic text-foreground/70 leading-relaxed">
            "Pranayama is not a competition with yourself or others. Begin where you are."
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
