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
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not available');
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playBeep = useCallback((double: boolean = false) => {
    try {
      if (!audioContextRef.current) return;
      
      const playTone = (delay: number = 0) => {
        setTimeout(() => {
          if (!audioContextRef.current) return;
          
          const oscillator = audioContextRef.current.createOscillator();
          const gainNode = audioContextRef.current.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          oscillator.frequency.value = 800; // 800 Hz - pleasant beep
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.15);
          
          oscillator.start(audioContextRef.current.currentTime);
          oscillator.stop(audioContextRef.current.currentTime + 0.15);
        }, delay);
      };
      
      playTone(0);
      if (double) {
        playTone(250); // Second beep after 250ms
      }
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
        // Pause between rounds to show pointer - play beep
        playBeep();
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

    playBeep();
    triggerHaptic(nextPhase);
  }, [currentPhase, currentRound, rounds, ratio, playBeep, triggerHaptic]);

  const startNextRound = useCallback(() => {
    setCurrentRound(prev => prev + 1);
    setIsPausedBetweenRounds(false);
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(ratio.inhale);
    phaseDurationRef.current = ratio.inhale;
    phaseStartTimeRef.current = Date.now();
    playBeep();
    triggerHaptic('inhale');
  }, [ratio, playBeep, triggerHaptic]);

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
    playBeep(true); // Double beep for start
    triggerHaptic('inhale');
  }, [ratio, playBeep, triggerHaptic]);

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
