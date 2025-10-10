import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PracticeSession } from '@/types/breathing';
import { getPracticeSessions, savePracticeSession } from '@/utils/storage';
import { Smile, Meh, Frown, Zap, Wind } from 'lucide-react';

const SessionComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = location.state as { session: PracticeSession };

  const [feeling, setFeeling] = useState<PracticeSession['feeling']>();
  const [notes, setNotes] = useState('');

  const feelings = [
    { value: 'energized' as const, label: 'Energized', icon: Zap, color: 'text-yellow-400' },
    { value: 'calm' as const, label: 'Calm', icon: Wind, color: 'text-blue-400' },
    { value: 'neutral' as const, label: 'Neutral', icon: Meh, color: 'text-gray-400' },
    { value: 'struggled' as const, label: 'Struggled', icon: Frown, color: 'text-orange-400' },
  ];

  const handleSave = () => {
    const sessions = getPracticeSessions().filter(s => s.id !== session.id);
    const updatedSession = {
      ...session,
      feeling,
      notes: notes.trim() || undefined,
    };
    sessions.push(updatedSession);
    localStorage.setItem('pranayama_sessions', JSON.stringify(sessions));
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-card to-background p-6">
      <Card className="w-full max-w-md border-primary/20 bg-card/50 p-8 backdrop-blur-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
          How do you feel?
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {feelings.map((f) => (
            <button
              key={f.value}
              onClick={() => setFeeling(f.value)}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                feeling === f.value
                  ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30'
                  : 'border-border bg-background/50 hover:border-primary/50'
              }`}
            >
              <f.icon className={`h-8 w-8 ${f.color}`} />
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Notes (optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any observations or thoughts about your practice..."
            className="min-h-24 border-primary/30 bg-background/50"
          />
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-primary to-accent py-6 text-lg font-semibold"
          >
            Save & Continue
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="w-full"
          >
            Skip
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SessionComplete;
