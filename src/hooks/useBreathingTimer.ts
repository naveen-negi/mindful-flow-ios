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
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseStartTimeRef = useRef<number>(0);

  const playPhaseSound = useCallback((phase: BreathPhase) => {
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
    const phaseSequence: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest'];
    const currentIndex = phaseSequence.indexOf(currentPhase);
    
    if (currentPhase === 'exhale') {
      // Completed one round
      if (currentRound >= rounds - 1) {
        setIsComplete(true);
        setIsActive(false);
        return;
      }
      setCurrentRound(prev => prev + 1);
      setCurrentPhase('inhale');
      setTimeRemaining(ratio.inhale);
    } else {
      const nextPhase = phaseSequence[currentIndex + 1];
      setCurrentPhase(nextPhase);
      
      if (nextPhase === 'hold') {
        setTimeRemaining(ratio.hold);
      } else if (nextPhase === 'exhale') {
        setTimeRemaining(ratio.exhale);
      } else if (nextPhase === 'rest') {
        setTimeRemaining(2); // 2 second rest between rounds
      }
    }

    playPhaseSound(currentPhase);
    triggerHaptic(currentPhase);
    phaseStartTimeRef.current = Date.now();
  }, [currentPhase, currentRound, rounds, ratio, playPhaseSound, triggerHaptic]);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - phaseStartTimeRef.current) / 1000);
      const remaining = timeRemaining - elapsed;

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
  }, [isActive, timeRemaining, moveToNextPhase]);

  const start = useCallback(() => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentRound(0);
    setTimeRemaining(ratio.inhale);
    setIsComplete(false);
    phaseStartTimeRef.current = Date.now();
    playPhaseSound('inhale');
    triggerHaptic('inhale');
  }, [ratio, playPhaseSound, triggerHaptic]);

  const pause = useCallback(() => {
    setIsActive(false);
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
  }, []);

  return {
    isActive,
    currentPhase,
    currentRound,
    timeRemaining,
    isComplete,
    start,
    pause,
    resume,
    reset,
  };
};
