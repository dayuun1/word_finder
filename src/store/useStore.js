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

export const useStore = create(
  persist(
    (set) => ({
      settings: getDefaultSettings(),
      
      updateSetting: (key, value) =>
        set((state) => ({
          settings: { ...state.settings, [key]: value }
        })),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      
      resetSettings: () =>
        set({ settings: getDefaultSettings() }),
      
      profile: {
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        bestTime: null,
        history: []
      },
      
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
    }),
    {
      name: 'word-finder-storage',
      partialize: (state) => ({
        settings: state.settings,
        profile: state.profile
      })
    }
  )
);