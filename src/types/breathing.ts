export interface BreathingRatio {
  inhale: number;
  hold: number;
  exhale: number;
}

export interface PracticeSession {
  id: string;
  date: Date;
  ratio: BreathingRatio;
  roundsCompleted: number;
  roundsPlanned: number;
  duration: number;
  feeling?: 'energized' | 'calm' | 'neutral' | 'struggled' | 'stopped_early';
  notes?: string;
}

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export interface PracticeSettings {
  defaultRatio: BreathingRatio;
  progressionIncrement: number;
  audioEnabled: boolean;
  hapticEnabled: boolean;
  voiceGuidanceEnabled: boolean;
  notificationsEnabled?: boolean;
}
