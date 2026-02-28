import { useState, useEffect, useCallback } from 'react';
import { WORD_LISTS, LETTERS } from '../constants/wordLists';

const getRandomLetter = (lang) => {
    const letters = LETTERS[lang] || LETTERS.ukr;
    return letters[Math.floor(Math.random() * letters.length)];
};

const canPlaceWord = (grid, word, row, col, dirX, dirY) => {
    const size = grid.length;
    for (let i = 0; i < word.length; i++) {
        const newRow = row + dirX * i;
        const newCol = col + dirY * i;
        
        if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size)
             return false;
        
        if (grid[newRow][newCol] !== '') {
            return false;
        }
    }
    return true;
};

const placeWord = (grid, word, row, col, dirX, dirY) => {
    const positions = [];
    for (let i = 0; i < word.length; i++) {
        const newRow = row + dirX * i;
        const newCol = col + dirY * i;
        grid[newRow][newCol] = word[i]; 
        positions.push({ row: newRow, col: newCol });
    }
    return positions;
};
export const useWordGrid = (difficulty, language, maxWordLength) => {
    const [grid, setGrid] = useState([]);
    const [wordsInGrid, setWordsInGrid] = useState([]);
    const [wordPositions, setWordPositions] = useState([]);

    const getGridSize = useCallback(() => {
        const sizeMatch = difficulty ? difficulty.match(/(\d+)x(\d+)/) : null;
        return sizeMatch ? parseInt(sizeMatch[1], 10) : 5; 
    }, [difficulty]); 

    const generateGrid = useCallback(() => {
        const size = getGridSize();
        const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
        
        const currentLang = language || 'ukr'; 
        const currentDiff = difficulty || '5x5'; 
        const currentMaxLen = maxWordLength || 5;

        let availableWords = WORD_LISTS[currentLang][currentDiff] || WORD_LISTS.ukr['5x5'];
        availableWords = availableWords.filter(word => word.length <= currentMaxLen);
        
        const words = availableWords.sort(() => 0.5 - Math.random());
        
        const placedWords = [];
        const positions = [];

        const directions = [
            [0, 1], [1, 0], [1, 1], [-1, 1], 
            [0, -1], [-1, 0], [-1, -1], [1, -1], 
        ];

        for (const word of words) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 100) {
                const row = Math.floor(Math.random() * size);
                const col = Math.floor(Math.random() * size);
                const [dirX, dirY] = directions[Math.floor(Math.random() * directions.length)];

                if (canPlaceWord(newGrid, word, row, col, dirX, dirY)) {
                    const wordPos = placeWord(newGrid, word, row, col, dirX, dirY);
                    placedWords.push(word);
                    positions.push({ word, positions: wordPos });
                    placed = true;
                }
                attempts++;
            }
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (newGrid[i][j] === '') {
                    newGrid[i][j] = getRandomLetter(currentLang);
                }
            }
        }

        setGrid(newGrid);
        setWordsInGrid(placedWords);
        setWordPositions(positions);
        
    }, [getGridSize, difficulty, language, maxWordLength]); 

    useEffect(() => {
        generateGrid();
    }, [generateGrid, difficulty, language, maxWordLength]);

    return { grid, wordsInGrid, wordPositions, regenerateGrid: generateGrid };
};