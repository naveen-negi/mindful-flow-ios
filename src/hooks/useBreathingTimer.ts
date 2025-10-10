import { useState, useEffect, useCallback, useRef } from 'react';
import { BreathingRatio, BreathPhase } from '@/types/breathing';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useBreathingTimer = (
  ratio: BreathingRatio,
  rounds: number,
  hapticEnabled: boolean = true
) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('rest');
  const [currentRound, setCurrentRound] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPausedBetweenRounds, setIsPausedBetweenRounds] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseStartTimeRef = useRef<number>(0);
  const phaseDurationRef = useRef<number>(0);

  const playPhaseSound = useCallback((phase: BreathPhase) => {
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different phases
      const frequencies: Record<BreathPhase, number> = {
        inhale: 432,
        hold: 528,
        exhale: 396,
        rest: 256,
      };

      oscillator.frequency.value = frequencies[phase];
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not available');
    }
  }, []);

  const triggerHaptic = useCallback(async (phase: BreathPhase) => {
    if (!hapticEnabled) return;

    try {
      if (phase === 'hold') {
        await Haptics.impact({ style: ImpactStyle.Medium });
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Medium }), 100);
      } else if (phase === 'exhale') {
        await Haptics.impact({ style: ImpactStyle.Light });
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Light }), 80);
        setTimeout(() => Haptics.impact({ style: ImpactStyle.Light }), 160);
      } else {
        await Haptics.impact({ style: ImpactStyle.Light });
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }, [hapticEnabled]);

  const moveToNextPhase = useCallback(() => {
    let nextPhase: BreathPhase;
    let nextDuration: number;
    
    if (currentPhase === 'rest' || currentPhase === 'exhale') {
      // Move to inhale (start of new round or first phase)
      if (currentPhase === 'exhale') {
        // Just completed a round
        if (currentRound >= rounds - 1) {
          setIsComplete(true);
          setIsActive(false);
          return;
        }
        // Pause between rounds to show pointer
        setIsPausedBetweenRounds(true);
        setIsActive(false);
        return;
      }
      nextPhase = 'inhale';
      nextDuration = ratio.inhale;
    } else if (currentPhase === 'inhale') {
      nextPhase = 'hold';
      nextDuration = ratio.hold;
    } else {
      // currentPhase === 'hold'
      nextPhase = 'exhale';
      nextDuration = ratio.exhale;
    }

    console.log(`Moving to ${nextPhase} for ${nextDuration} seconds`);
    
    setCurrentPhase(nextPhase);
    setTimeRemaining(nextDuration);
    phaseDurationRef.current = nextDuration;
    phaseStartTimeRef.current = Date.now();
    
    playPhaseSound(nextPhase);
    triggerHaptic(nextPhase);
  }, [currentPhase, currentRound, rounds, ratio, playPhaseSound, triggerHaptic]);

  const continueToNextRound = useCallback(() => {
    setCurrentRound(prev => prev + 1);
    setIsPausedBetweenRounds(false);
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(ratio.inhale);
    phaseDurationRef.current = ratio.inhale;
    phaseStartTimeRef.current = Date.now();
    playPhaseSound('inhale');
    triggerHaptic('inhale');
  }, [ratio, playPhaseSound, triggerHaptic]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - phaseStartTimeRef.current) / 1000;
      const remaining = Math.ceil(phaseDurationRef.current - elapsed);

      if (remaining <= 0) {
        moveToNextPhase();
      } else {
        setTimeRemaining(remaining);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, moveToNextPhase]);

  const start = useCallback(() => {
    console.log('Starting practice with ratio:', ratio);
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentRound(0);
    setTimeRemaining(ratio.inhale);
    setIsComplete(false);
    phaseDurationRef.current = ratio.inhale;
    phaseStartTimeRef.current = Date.now();
    playPhaseSound('inhale');
    triggerHaptic('inhale');
  }, [ratio, playPhaseSound, triggerHaptic]);

  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
    phaseStartTimeRef.current = Date.now();
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setCurrentPhase('rest');
    setCurrentRound(0);
    setTimeRemaining(0);
    setIsComplete(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return {
    isActive,
    currentPhase,
    currentRound,
    timeRemaining,
    isComplete,
    isPausedBetweenRounds,
    start,
    pause,
    resume,
    reset,
    continueToNextRound,
  };
};
