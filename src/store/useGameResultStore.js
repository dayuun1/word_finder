import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 

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