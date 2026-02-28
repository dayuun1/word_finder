import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/**
 * @fileoverview Стор налаштувань гри
 * @module store/useSettingsStore
 */
/**
 * @typedef {Object} GameSettings
 * @property {'ukr'|'eng'} language - Мова гри
 * @property {'5x5'|'10x10'|'15x15'} difficulty - Розмір ігрового поля
 * @property {'default'|'dark'|'different'} theme - Тема інтерфейсу
 * @property {'classic'|'time'} gameMode - Режим гри
 * @property {number} timeLimit - Ліміт часу в секундах
 * @property {number} maxWordLength - Максимальна довжина слів
 * @property {boolean} soundEnabled - Чи увімкнені звукові ефекти
 */

/**
 * Повертає налаштування за замовчуванням.
 * @returns {GameSettings}
 */
const getDefaultSettings = () => ({
    language: 'ukr',
    difficulty: '5x5',
    theme: 'default',
    gameMode: 'classic',
    timeLimit: 180,
    maxWordLength: 5,
    soundEnabled: true
});

export const useSettingsStore = create(
    persist(
        (set) => ({
            settings: getDefaultSettings(),
            
            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: { ...state.settings, ...newSettings }
                })),
            
            resetSettings: () =>
                set({ settings: getDefaultSettings() }),
        }),
        {
            name: 'settings-storage', 
            partialize: (state) => ({ settings: state.settings })
        }
    )
);