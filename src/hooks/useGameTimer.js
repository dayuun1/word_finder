import { useState, useEffect } from 'react';
/**
 * @module hooks/useGameTimer
 */

/**
 * Хук таймера гри
 * @returns {{ timeLeft: number, resetTimer: Function }}
 */

export const useGameTimer = (initialTime, isActive, onTimeEnd) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeEnd]);

  const resetTimer = () => setTimeLeft(initialTime);

  return { timeLeft, resetTimer };
};