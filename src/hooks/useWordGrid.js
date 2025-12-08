
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
        
        if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
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

export const useWordGrid = (difficulty, language) => {
    const [grid, setGrid] = useState([]);
    const [wordsInGrid, setWordsInGrid] = useState([]);
    const [wordPositions, setWordPositions] = useState([]);

    const FIXED_DIFFICULTY = '5x5';
    const FIXED_LANGUAGE = 'ukr';

    const getGridSize = useCallback(() => {
        return 5; 
    }, []); 

    const generateGrid = useCallback(() => {
        const size = getGridSize();
        const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
        
        const words = WORD_LISTS[FIXED_LANGUAGE][FIXED_DIFFICULTY] || WORD_LISTS.ukr['5x5'];
        
        const placedWords = [];
        const positions = [];

        const directions = [
            [0, 1],   
            [1, 0],   
            [1, 1],   
            [-1, 1],  
            [0, -1],  
            [-1, 0],  
            [-1, -1], 
            [1, -1],  
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
                    newGrid[i][j] = getRandomLetter(FIXED_LANGUAGE);
                }
            }
        }

        setGrid(newGrid);
        setWordsInGrid(placedWords);
        setWordPositions(positions);
        
    }, [getGridSize]); 

    useEffect(() => {
        generateGrid();
    }, [generateGrid]);

    return { grid, wordsInGrid, wordPositions, regenerateGrid: generateGrid };
};