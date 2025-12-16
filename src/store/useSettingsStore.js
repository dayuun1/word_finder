import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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