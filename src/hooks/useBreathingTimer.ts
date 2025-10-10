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

  const playDoubleBeep = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      
      // First beep
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      oscillator1.connect(gainNode1);
      gainNode1.connect(audioContext.destination);
      oscillator1.frequency.value = 600;
      oscillator1.type = 'sine';
      gainNode1.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode1.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.05);
      gainNode1.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.15);
      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.15);

      // Second beep
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 600;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0, audioContext.currentTime + 0.2);
      gainNode2.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.25);
      gainNode2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.35);
      oscillator2.start(audioContext.currentTime + 0.2);
      oscillator2.stop(audioContext.currentTime + 0.35);
    } catch (error) {
      console.log('Audio not available');
    }
  }, []);

  const playRoundCompleteSound = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      
      // Three ascending tones to indicate completion
      [550, 660, 770].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.25);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.35, startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (error) {
      console.log('Audio not available');
    }
  }, []);

  const playSingleBeep = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 500;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
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
        // Pause between rounds to show pointer - play completion sound
        playRoundCompleteSound();
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
    
    playSingleBeep();
    triggerHaptic(nextPhase);
  }, [currentPhase, currentRound, rounds, ratio, playSingleBeep, triggerHaptic, playRoundCompleteSound]);

  const startNextRound = useCallback(() => {
    setCurrentRound(prev => prev + 1);
    setIsPausedBetweenRounds(false);
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(ratio.inhale);
    phaseDurationRef.current = ratio.inhale;
    phaseStartTimeRef.current = Date.now();
    playDoubleBeep();
    triggerHaptic('inhale');
  }, [ratio, playDoubleBeep, triggerHaptic]);

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
    playDoubleBeep();
    triggerHaptic('inhale');
  }, [ratio, playDoubleBeep, triggerHaptic]);

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
    startNextRound,
  };
};
