import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPracticeSessions } from '@/utils/storage';
import { ChevronLeft, Calendar, TrendingUp } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const Progress = () => {
  const navigate = useNavigate();
  const sessions = getPracticeSessions();

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(s => isSameDay(new Date(s.date), day));
  };

  const totalSessions = sessions.length;
  const thisMonthSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    return sessionDate >= monthStart && sessionDate <= monthEnd;
  }).length;

  const currentRatio = sessions.length > 0 
    ? sessions[sessions.length - 1].ratio 
    : { inhale: 4, hold: 16, exhale: 8 };

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
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">This Month</span>
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
              
              return (
                <div
                  key={day.toISOString()}
                  className={`relative aspect-square rounded-lg p-1 text-center text-sm ${
                    hasSession
                      ? 'bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30'
                      : 'bg-muted/30 text-muted-foreground'
                  } ${isToday ? 'ring-2 ring-accent' : ''}`}
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
