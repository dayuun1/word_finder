import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
/**
 * @fileoverview Стор результату останньої гри
 * @module store/useGameResultStore
 */
/**
 * @typedef {Object} GameResult
 * @property {number} score - Кількість знайдених слів
 * @property {number} totalWords - Загальна кількість слів
 * @property {number} timeLeft - Залишок часу в секундах
 * @property {boolean} won - Чи виграна гра
 * @property {string} difficulty - Складність гри
 * @property {string} language - Мова гри
 * @property {string|null} date - ISO-рядок дати або null
 */

/**
 * Повертає порожній результат гри.
 * @returns {GameResult}
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