import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/**
 * @fileoverview Стор профілю гравця
 * @module store/useProfileStore
 */

/**
 * @typedef {Object} GameResult
 * @property {number} score - Кількість знайдених слів
 * @property {number} totalWords - Загальна кількість слів
 * @property {number} timeLeft - Залишок часу в секундах
 * @property {boolean} won - Чи виграна гра
 * @property {string} difficulty - Складність гри
 * @property {string} language - Мова гри
 * @property {string} date - ISO-рядок дати гри
 */
/**
 * @typedef {Object} PlayerProfile
 * @property {number} gamesPlayed - Загальна кількість зіграних ігор
 * @property {number} gamesWon - Кількість виграних ігор
 * @property {number} totalScore - Сумарний рахунок
 * @property {number|null} bestTime - Найкращий залишок часу
 * @property {GameResult[]} history - Історія останніх 10 ігор
 */
/**
 * @returns {PlayerProfile}
 */
const getDefaultProfile = () => ({
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    bestTime: null,
    history: []
});

export const useProfileStore = create(
    persist(
        (set) => ({
            profile: getDefaultProfile(),
            
            updateProfile: (data) =>
                set((state) => ({
                    profile: { ...state.profile, ...data }
                })),
            
            addGameResult: (result) =>
                set((state) => ({
                    profile: {
                        ...state.profile,
                        gamesPlayed: state.profile.gamesPlayed + 1,
                        gamesWon: result.won ? state.profile.gamesWon + 1 : state.profile.gamesWon,
                        totalScore: state.profile.totalScore + result.score,
                        bestTime: state.profile.bestTime === null || result.timeLeft > state.profile.bestTime 
                            ? result.timeLeft 
                            : state.profile.bestTime,
                        history: [result, ...state.profile.history].slice(0, 10) 
                    }
                })),

            resetProfile: () =>
                set({ profile: getDefaultProfile() }),
        }),
        {
            name: 'profile-storage', 
            partialize: (state) => ({ profile: state.profile })
        }
    )
);