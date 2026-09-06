import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { getSettings, saveSettings } from '@/utils/storage';
import { Save, Bell, Sparkles } from 'lucide-react';
import ScreenHeader from '@/components/ScreenHeader';
import ProTag from '@/components/ProTag';
import { usePro } from '@/contexts/ProProvider';
import { describeProStatus } from '@/lib/pro';
import { toast } from 'sonner';
import {
  requestNotificationPermission,
  scheduleDailyPointerNotifications,
  cancelAllNotifications
} from '@/utils/notifications';

const Settings = () => {
  const navigate = useNavigate();
  const { isPro, status, storeAvailable, restore, manageUrl } = usePro();
  const currentSettings = getSettings();
  
  const [audioEnabled, setAudioEnabled] = useState(currentSettings.audioEnabled);
  const [hapticEnabled, setHapticEnabled] = useState(currentSettings.hapticEnabled);
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState(currentSettings.voiceGuidanceEnabled);
  const [progressionIncrement, setProgressionIncrement] = useState(currentSettings.progressionIncrement);
  const [notificationsEnabled, setNotificationsEnabled] = useState(currentSettings.notificationsEnabled || false);

  const handleRestore = async () => {
    try {
      const restored = await restore();
      toast[restored ? 'success' : 'message'](restored ? 'Pro restored' : 'No previous purchase found for this Apple Account');
    } catch {
      toast.error('Could not reach the App Store. Try again.');
    }
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled && !isPro) {
      navigate('/pro');
      return;
    }
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        await scheduleDailyPointerNotifications();
        setNotificationsEnabled(true);
        toast.success('Daily pointer notifications enabled');
      } else {
        toast.error('Notification permission denied');
      }
    } else {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
      toast.success('Notifications disabled');
    }
  };

  const handleSave = () => {
    const newSettings = {
      ...currentSettings,
      audioEnabled,
      hapticEnabled,
      voiceGuidanceEnabled,
      progressionIncrement,
      notificationsEnabled,
    };
    
    saveSettings(newSettings);
    toast.success('Settings saved successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/" backLabel="Home" title="Settings" />
      <div className="mx-auto max-w-2xl px-4">

        <Card className="mb-6 border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
            <div className="flex-1">
              <h2 className="font-serif text-xl font-semibold text-foreground">Pranayama Pro</h2>
              <p className="mt-1 text-sm font-sans text-muted-foreground">{describeProStatus(status)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {isPro ? (
                  <a
                    href={manageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Manage subscription
                  </a>
                ) : (
                  <>
                    <Button onClick={() => navigate('/pro')} className="rounded-xl">
                      {status.kind === 'expired' ? 'Resubscribe' : 'Try Pro free'}
                    </Button>
                    {storeAvailable && (
                      <button
                        type="button"
                        onClick={handleRestore}
                        className="text-sm font-sans text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Restore purchases
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

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
              <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Daily Reminders
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="notifications" className="text-foreground flex items-center gap-2">
                      Zen Koans & Nonduality Pointers
                      {!isPro && <ProTag />}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive contemplative messages every 10 minutes—nonduality pointers and zen koans to ponder throughout your day
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-2 italic">
                      Delivered every 10 minutes, 24/7
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={isPro && notificationsEnabled}
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                Progression
                {!isPro && <ProTag />}
              </h2>

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
                  disabled={!isPro}
                  onChange={(e) => setProgressionIncrement(Number(e.target.value))}
                  className="border-primary/30 bg-background/50"
                />
                {!isPro && (
                  <button
                    type="button"
                    onClick={() => navigate('/pro')}
                    className="mt-3 text-sm font-sans font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Unlock progression with Pro
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">About</h2>
              <p className="text-sm text-muted-foreground">
                Pranayama Tracker helps you develop a consistent breathing practice
                using the classical Sahita Kumbhaka technique.
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
