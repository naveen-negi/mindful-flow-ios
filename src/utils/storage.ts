import { PracticeSession, PracticeSettings, BreathingRatio } from '@/types/breathing';

const SESSIONS_KEY = 'pranayama_sessions';
const SETTINGS_KEY = 'pranayama_settings';

export const defaultSettings: PracticeSettings = {
  defaultRatio: { inhale: 4, hold: 16, exhale: 8 },
  progressionIncrement: 1,
  audioEnabled: true,
  hapticEnabled: true,
  voiceGuidanceEnabled: false,
  notificationsEnabled: false,
};

export const savePracticeSession = (session: PracticeSession): void => {
  const sessions = getPracticeSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getPracticeSessions = (): PracticeSession[] => {
  const data = localStorage.getItem(SESSIONS_KEY);
  if (!data) return [];
  
  const sessions = JSON.parse(data);
  return sessions.map((s: any) => ({
    ...s,
    date: new Date(s.date),
  }));
};

export const getSettings = (): PracticeSettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : defaultSettings;
};

export const saveSettings = (settings: PracticeSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const calculateNextRatio = (current: BreathingRatio, increment: number): BreathingRatio => {
  const newInhale = current.inhale + increment;
  return {
    inhale: newInhale,
    hold: newInhale * 4,
    exhale: newInhale * 2,
  };
};

export const getRecentSessions = (days: number = 30): PracticeSession[] => {
  const sessions = getPracticeSessions();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return sessions.filter(s => s.date >= cutoffDate);
};
