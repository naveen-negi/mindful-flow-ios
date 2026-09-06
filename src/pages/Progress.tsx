import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPracticeSessions } from '@/utils/storage';
import { Calendar, TrendingUp, Lock } from 'lucide-react';
import ScreenHeader from '@/components/ScreenHeader';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subDays, startOfDay } from 'date-fns';
import { usePro } from '@/contexts/ProProvider';
import { FREE_HISTORY_DAYS } from '@/lib/pro';

const Progress = () => {
  const navigate = useNavigate();
  const { isPro } = usePro();
  const allSessions = getPracticeSessions();

  const now = new Date();
  // Free tier sees the last FREE_HISTORY_DAYS days; everything older stays on device, just out of view
  const historyStart = startOfDay(subDays(now, FREE_HISTORY_DAYS - 1));
  const sessions = isPro ? allSessions : allSessions.filter(s => new Date(s.date) >= historyStart);
  const hiddenSessions = allSessions.length - sessions.length;

  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(s => isSameDay(new Date(s.date), day));
  };

  const thisMonthSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    return sessionDate >= monthStart && sessionDate <= monthEnd;
  }).length;

  const currentRatio = allSessions.length > 0
    ? allSessions[allSessions.length - 1].ratio
    : { inhale: 4, hold: 16, exhale: 8 };

  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/" backLabel="Home" title="Your Progress" />
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{isPro ? 'This Month' : `Last ${FREE_HISTORY_DAYS} Days`}</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{thisMonthSessions}</div>
            <div className="text-sm text-muted-foreground">sessions</div>
          </Card>

          <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Current Ratio</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {currentRatio.inhale}:{currentRatio.hold}:{currentRatio.exhale}
            </div>
          </Card>
        </div>

        <Card className="mb-6 border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {format(now, 'MMMM yyyy')}
          </h2>
          
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground">
                {day}
              </div>
            ))}
            
            {daysInMonth.map(day => {
              const daySessions = getSessionsForDay(day);
              const hasSession = daySessions.length > 0;
              const isToday = isSameDay(day, now);
              const outOfView = !isPro && day < historyStart;

              return (
                <div
                  key={day.toISOString()}
                  className={`relative aspect-square rounded-lg p-1 text-center text-sm ${
                    hasSession
                      ? 'bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30'
                      : 'bg-muted/30 text-muted-foreground'
                  } ${isToday ? 'ring-2 ring-accent' : ''} ${outOfView ? 'opacity-40' : ''}`}
                >
                  <div className="flex h-full items-center justify-center">
                    {format(day, 'd')}
                  </div>
                  {daySessions.length > 1 && (
                    <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-accent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {!isPro && (
          <Card className="mb-6 border bg-card p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
              <div className="flex-1">
                <p className="font-serif text-lg font-semibold text-foreground">Your full history</p>
                <p className="mt-1 text-sm font-sans text-muted-foreground">
                  {hiddenSessions > 0
                    ? `${hiddenSessions} earlier ${hiddenSessions === 1 ? 'session is' : 'sessions are'} saved on this device. `
                    : ''}
                  Pro shows every session, month by month.
                </p>
                <Button onClick={() => navigate('/pro')} variant="outline" className="mt-4 rounded-xl">
                  See Pro
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Sessions</h2>
          
          {sessions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No sessions yet. Start your first practice!
            </p>
          ) : (
            <div className="space-y-3">
              {sessions.slice(-10).reverse().map(session => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-4"
                >
                  <div>
                    <div className="font-medium text-foreground">
                      {session.ratio.inhale}:{session.ratio.hold}:{session.ratio.exhale}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {session.roundsCompleted} rounds · {Math.floor(session.duration / 60)} min
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">
                      {format(new Date(session.date), 'MMM d')}
                    </div>
                    {session.feeling && (
                      <div className="text-xs text-muted-foreground capitalize">
                        {session.feeling.replace('_', ' ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Progress;
