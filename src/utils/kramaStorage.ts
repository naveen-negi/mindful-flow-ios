/**
 * What the haṭha krama module remembers between sittings: the counts each
 * drill was last set to, whether the safety check has been cleared, how the
 * bowl is set, and a log of what was practised.
 *
 * All of it is local to the phone, like the rest of the app.
 */

import type { PracticeId } from '@/data/krama';
import { DRILLS, MAHA_MUDRA } from '@/data/krama';
import type { RoundsPlan } from '@/lib/krama';

const SETTINGS_KEY = 'pranayama_krama_settings';
const SESSIONS_KEY = 'pranayama_krama_sessions';

export interface KramaSettings {
  /** 0–1. */
  bowlVolume: number;
  vibration: boolean;
  /** The uḍḍīyāna safety check, once every answer was a no. */
  gateCleared: boolean;
  /** Answers kept so the check can be reviewed rather than redone blind. */
  gateAnswers: Record<string, boolean>;
  /** Last counts per practice, so a sitting resumes where it was left. */
  plans: Partial<Record<PracticeId, RoundsPlan>>;
}

const defaultPlans = (): Partial<Record<PracticeId, RoundsPlan>> => {
  const plans: Partial<Record<PracticeId, RoundsPlan>> = {};
  DRILLS.forEach((drill) => {
    if (drill.practice.kind === 'rounds') {
      plans[drill.id] = {
        rounds: drill.practice.rounds,
        hold: drill.practice.hold,
        rest: drill.practice.rest,
      };
    }
  });
  plans['maha-mudra'] = {
    rounds: MAHA_MUDRA.practice.rounds,
    hold: MAHA_MUDRA.practice.hold,
    rest: MAHA_MUDRA.practice.rest,
  };
  return plans;
};

export const defaultKramaSettings = (): KramaSettings => ({
  bowlVolume: 0.7,
  vibration: true,
  gateCleared: false,
  gateAnswers: {},
  plans: defaultPlans(),
});

export const getKramaSettings = (): KramaSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultKramaSettings();
    const stored = JSON.parse(raw) as Partial<KramaSettings>;
    const base = defaultKramaSettings();
    return {
      ...base,
      ...stored,
      gateAnswers: { ...stored.gateAnswers },
      plans: { ...base.plans, ...stored.plans },
    };
  } catch {
    return defaultKramaSettings();
  }
};

export const saveKramaSettings = (settings: KramaSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* a full or private store is not worth failing a sitting over */
  }
};

export const updateKramaSettings = (patch: Partial<KramaSettings>): KramaSettings => {
  const next = { ...getKramaSettings(), ...patch };
  saveKramaSettings(next);
  return next;
};

export const getPlan = (id: PracticeId, fallback: RoundsPlan): RoundsPlan =>
  getKramaSettings().plans[id] ?? fallback;

export const savePlan = (id: PracticeId, plan: RoundsPlan): void => {
  const settings = getKramaSettings();
  saveKramaSettings({ ...settings, plans: { ...settings.plans, [id]: plan } });
};

export interface KramaSession {
  id: string;
  date: Date;
  practice: PracticeId;
  roundsCompleted: number;
  roundsPlanned: number;
  /** Seconds. Zero for a settle. */
  hold: number;
  /** Seconds actually sat. */
  duration: number;
  /** True when it was ended early rather than run out. */
  stoppedEarly: boolean;
}

export const getKramaSessions = (): KramaSession[] => {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Omit<KramaSession, 'date'> & { date: string }>;
    return parsed.map((s) => ({ ...s, date: new Date(s.date) }));
  } catch {
    return [];
  }
};

export const saveKramaSession = (session: Omit<KramaSession, 'id' | 'date'>): void => {
  try {
    const sessions = getKramaSessions();
    sessions.push({ ...session, id: `${Date.now()}`, date: new Date() });
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch {
    /* the sitting still happened */
  }
};

/** Dates of every stage-one sitting, for the day-of-the-course counter. */
export const nadiSessionDates = (): Date[] =>
  getKramaSessions()
    .filter((s) => s.practice === 'nadi')
    .map((s) => s.date);

export const lastPractised = (id: PracticeId): Date | null => {
  const dates = getKramaSessions()
    .filter((s) => s.practice === id)
    .map((s) => s.date.getTime());
  return dates.length ? new Date(Math.max(...dates)) : null;
};
