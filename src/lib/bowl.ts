/**
 * The bowl and the buzz.
 *
 * A face-down sitting is carried entirely by these five cues, so they are
 * synthesised rather than sampled: no audio file to ship, nothing to fail to
 * load, and the same vocabulary on every device.
 *
 *   breatheIn     one low strike
 *   setLock       two quick strikes
 *   stillHolding  the rim ringing, fading out — no buzz
 *   release       a soft roll, rising
 *   stop          no bowl, three fast buzzes
 */

import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type CueId = 'breatheIn' | 'setLock' | 'stillHolding' | 'release' | 'stop';

export interface CueSettings {
  /** 0–1. Zero is silent; the buzz still carries the cue. */
  volume: number;
  vibration: boolean;
}

/** A bowl's overtones are inharmonic — that is most of what makes it a bowl. */
const PARTIALS = [
  { ratio: 1, gain: 1, decay: 1 },
  { ratio: 2.74, gain: 0.42, decay: 0.62 },
  { ratio: 5.38, gain: 0.18, decay: 0.36 },
  { ratio: 8.9, gain: 0.07, decay: 0.22 },
];

let ctx: AudioContext | null = null;

const audio = (): AudioContext | null => {
  if (ctx) return ctx;
  try {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  } catch {
    ctx = null;
  }
  return ctx;
};

/**
 * Browsers hand out a suspended AudioContext until a gesture resumes it. Every
 * practice starts from a Begin button, which is where this is called.
 */
export const unlockAudio = async (): Promise<void> => {
  const c = audio();
  if (c && c.state === 'suspended') {
    try {
      await c.resume();
    } catch {
      /* a silent sitting is still a sitting */
    }
  }
};

interface StrikeOptions {
  freq: number;
  gain: number;
  /** Seconds until the strike is inaudible. */
  decay: number;
  /** Seconds from now. */
  at?: number;
}

const strike = (c: AudioContext, volume: number, { freq, gain, decay, at = 0 }: StrikeOptions) => {
  const start = c.currentTime + at;
  PARTIALS.forEach((partial) => {
    const osc = c.createOscillator();
    const amp = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq * partial.ratio;
    const peak = Math.max(0.0001, gain * partial.gain * volume);
    // A struck bowl has an attack you can hear but not time — 8 ms of it.
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.exponentialRampToValueAtTime(peak, start + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + decay * partial.decay);
    osc.connect(amp);
    amp.connect(c.destination);
    osc.start(start);
    osc.stop(start + decay * partial.decay + 0.05);
  });
};

const buzz = async (cue: CueId) => {
  try {
    switch (cue) {
      case 'breatheIn':
        await Haptics.impact({ style: ImpactStyle.Light });
        break;
      case 'setLock':
        await Haptics.impact({ style: ImpactStyle.Medium });
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Medium }).catch(() => undefined), 180);
        break;
      case 'stillHolding':
        // Deliberately nothing: the rim ringing is the only cue that does not buzz.
        break;
      case 'release':
        await Haptics.impact({ style: ImpactStyle.Light });
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Light }).catch(() => undefined), 120);
        break;
      case 'stop':
        await Haptics.impact({ style: ImpactStyle.Heavy });
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => undefined), 120);
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => undefined), 240);
        break;
    }
  } catch {
    /* no haptics on this device */
  }
};

/** Sound one of the five cues. Safe to call when either channel is off. */
export const playCue = (cue: CueId, settings: CueSettings): void => {
  if (settings.vibration) void buzz(cue);
  const c = audio();
  const volume = Math.min(1, Math.max(0, settings.volume));
  if (!c || volume === 0) return;

  switch (cue) {
    case 'breatheIn':
      strike(c, volume, { freq: 174.6, gain: 0.5, decay: 3.4 });
      break;
    case 'setLock':
      strike(c, volume, { freq: 261.6, gain: 0.4, decay: 1.5 });
      strike(c, volume, { freq: 261.6, gain: 0.4, decay: 1.5, at: 0.18 });
      break;
    case 'stillHolding':
      // Only the rim: quiet, high, and long enough to fade under the hold.
      strike(c, volume, { freq: 523.3, gain: 0.14, decay: 5 });
      break;
    case 'release': {
      // A roll: five soft strikes, closing up and rising.
      const freqs = [220, 246.9, 277.2, 329.6, 392];
      freqs.forEach((freq, i) => {
        strike(c, volume, { freq, gain: 0.16, decay: 1.1, at: i * (0.1 - i * 0.008) });
      });
      break;
    }
    case 'stop':
      // No bowl. The buzz above is the whole cue.
      break;
  }
};

/** The single strike that marks a breath in stage one. */
export const playBreathStrike = (direction: 'in' | 'out', settings: CueSettings): void => {
  if (settings.vibration) {
    Haptics.impact({ style: direction === 'in' ? ImpactStyle.Medium : ImpactStyle.Light }).catch(
      () => undefined,
    );
  }
  const c = audio();
  const volume = Math.min(1, Math.max(0, settings.volume));
  if (!c || volume === 0) return;
  strike(c, volume, {
    freq: direction === 'in' ? 174.6 : 233.1,
    gain: direction === 'in' ? 0.42 : 0.3,
    decay: 2.6,
  });
};

/** The three strikes that open a sitting. */
export const playOpening = (settings: CueSettings): void => {
  if (settings.vibration) void buzz('breatheIn');
  const c = audio();
  const volume = Math.min(1, Math.max(0, settings.volume));
  if (!c || volume === 0) return;
  [0, 1.1, 2.2].forEach((at) => strike(c, volume, { freq: 196, gain: 0.45, decay: 3.2, at }));
};

/** Length of the opening, so the timer can wait it out. */
export const OPENING_SECONDS = 4;
