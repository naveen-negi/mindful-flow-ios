import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { getSettings, saveSettings } from '@/utils/storage';
import { ChevronLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const currentSettings = getSettings();
  
  const [audioEnabled, setAudioEnabled] = useState(currentSettings.audioEnabled);
  const [hapticEnabled, setHapticEnabled] = useState(currentSettings.hapticEnabled);
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState(currentSettings.voiceGuidanceEnabled);
  const [progressionIncrement, setProgressionIncrement] = useState(currentSettings.progressionIncrement);

  const handleSave = () => {
    const newSettings = {
      ...currentSettings,
      audioEnabled,
      hapticEnabled,
      voiceGuidanceEnabled,
      progressionIncrement,
    };
    
    saveSettings(newSettings);
    toast.success('Settings saved successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen zen-texture p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Audio & Haptics</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audio" className="text-foreground">Audio Cues</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for phase transitions
                    </p>
                  </div>
                  <Switch
                    id="audio"
                    checked={audioEnabled}
                    onCheckedChange={setAudioEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="haptic" className="text-foreground">Haptic Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Vibrate during phase changes
                    </p>
                  </div>
                  <Switch
                    id="haptic"
                    checked={hapticEnabled}
                    onCheckedChange={setHapticEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="voice" className="text-foreground">Voice Guidance</Label>
                    <p className="text-sm text-muted-foreground">
                      Verbal cues during practice
                    </p>
                  </div>
                  <Switch
                    id="voice"
                    checked={voiceGuidanceEnabled}
                    onCheckedChange={setVoiceGuidanceEnabled}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Progression</h2>
              
              <div>
                <Label htmlFor="increment" className="text-foreground">
                  Progression Increment (seconds)
                </Label>
                <p className="mb-3 text-sm text-muted-foreground">
                  How much to increase your inhale duration when advancing
                </p>
                <Input
                  id="increment"
                  type="number"
                  min="1"
                  max="5"
                  value={progressionIncrement}
                  onChange={(e) => setProgressionIncrement(Number(e.target.value))}
                  className="border-primary/30 bg-background/50"
                />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">About</h2>
              <p className="text-sm text-muted-foreground">
                Pranayama Tracker helps you develop a consistent breathing practice
                using the classical 1:4:2 ratio (inhale:hold:exhale).
              </p>
              <p className="mt-3 text-sm italic text-muted-foreground">
                "The breath is the bridge between body and mind."
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="mt-6 w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-semibold shadow-lg shadow-primary/50"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Settings
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
