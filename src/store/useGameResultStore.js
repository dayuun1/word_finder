import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
/**
 * Стор результату останньої гри.
 * Зберігається в localStorage під ключем 'last-game-result'.
 *
 * @property {Object} lastResult - Результат останньої гри
 * @property {Function} setLastResult - Зберегти результат
 * @property {Function} clearLastResult - Скинути до початкового стану
 */
const getInitialResult = () => ({
    score: 0,
    totalWords: 0,
    timeLeft: 0,
    won: false,
    difficulty: '',
    language: '',
    date: null
});

export const useGameResultStore = create(
    persist(
        (set) => ({
            lastResult: getInitialResult(),
            
            setLastResult: (result) => set({ lastResult: result }),
            clearLastResult: () => set({ lastResult: getInitialResult() }),
        }),
        {
            name: 'last-game-result', 
            partialize: (state) => ({ lastResult: state.lastResult }), 
        }
    )
);