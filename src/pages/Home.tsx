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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-card to-background p-6">
      <header className="mb-8 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
          Pranayama
        </h1>
        <p className="text-muted-foreground">Mindful Breathing Practice</p>
      </header>

      <div className="mx-auto w-full max-w-md space-y-6">
        <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Setup Practice</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="inhale" className="text-foreground">
                Inhale Duration (seconds)
              </Label>
              <Input
                id="inhale"
                type="number"
                min="1"
                max="20"
                value={inhale}
                onChange={(e) => setInhale(Number(e.target.value))}
                className="mt-2 border-primary/30 bg-background/50 text-foreground"
              />
            </div>

            <div className="rounded-lg bg-primary/10 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Current Ratio (1:4:2)</p>
              <div className="flex items-center justify-between text-2xl font-bold">
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-inhale))]">{ratio.inhale}</div>
                  <div className="text-xs text-muted-foreground">Inhale</div>
                </div>
                <div className="text-muted-foreground">:</div>
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-hold))]">{ratio.hold}</div>
                  <div className="text-xs text-muted-foreground">Hold</div>
                </div>
                <div className="text-muted-foreground">:</div>
                <div className="text-center">
                  <div className="text-[hsl(var(--phase-exhale))]">{ratio.exhale}</div>
                  <div className="text-xs text-muted-foreground">Exhale</div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="rounds" className="text-foreground">
                Number of Rounds
              </Label>
              <Input
                id="rounds"
                type="number"
                min="1"
                max="50"
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="mt-2 border-primary/30 bg-background/50 text-foreground"
              />
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Next progression:</strong> {nextRatio.inhale}:
                {nextRatio.hold}:{nextRatio.exhale}
              </p>
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="mt-6 w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-semibold shadow-lg shadow-primary/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/60"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Practice
          </Button>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/progress')}
            variant="outline"
            className="flex-1 border-primary/30 bg-card/50 backdrop-blur-sm"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Progress
          </Button>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            className="flex-1 border-primary/30 bg-card/50 backdrop-blur-sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <Card className="border-accent/20 bg-accent/5 p-4">
          <p className="text-center text-sm italic text-muted-foreground">
            "Pranayama is not a competition with yourself or others. Begin where you are."
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
