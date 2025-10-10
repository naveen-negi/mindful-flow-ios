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

  const playDoubleBeep = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      
      // First chime cluster
      [523.25, 659.25, 783.99].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.05);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.8);
      });

      // Second chime cluster
      [587.33, 698.46, 880.00].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + 0.3 + (index * 0.05);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.8);
      });
    } catch (error) {
      console.log('Audio not available');
    }
  }, []);

  const playRoundCompleteSound = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      
      // Cascading wind chimes - multiple frequencies with slight delays
      const chimeFrequencies = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00];
      
      chimeFrequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.08);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 1.2);
      });
    } catch (error) {
      console.log('Audio not available');
    }
  }, []);

  const playSingleBeep = useCallback(() => {
    try {
      const audioContext = new AudioContext();
      
      // Gentle chime sound - three harmonious notes
      [523.25, 659.25, 783.99].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.04);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.6);
      });
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
