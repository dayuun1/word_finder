import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import WordGrid from '../components/WordGrid';
import GameEndModal from '../components/GameEndModal';
import { useWordGrid } from '../hooks/useWordGrid';
import { useWordSelection } from '../hooks/useWordSelection';
import { useGameTimer } from '../hooks/useGameTimer';
import { useSettingsStore } from '../store/useSettingsStore'; 
import { useProfileStore } from '../store/useProfileStore';
import { useGameResultStore } from '../store/useGameResultStore';
import styles from '../styles/Page.module.css';

/**
 * @fileoverview Сторінка гри
 * @module pages/GamePage
 */

/**
 * Головна сторінка гри.
 * Керує станом раунду: генерація сітки, таймер, виділення слів,
 * збереження результату та відображення модального вікна.
 */
const GamePage = () => {
    const navigate = useNavigate();
    
    const settings = useSettingsStore((state) => state.settings);
    const addGameResult = useProfileStore((state) => state.addGameResult);
    const setLastResult = useGameResultStore((state) => state.setLastResult);
    const clearLastResult = useGameResultStore((state) => state.clearLastResult);

    const { grid, wordsInGrid, wordPositions, regenerateGrid } = useWordGrid(
        settings.difficulty, 
        settings.language, 
        settings.maxWordLength
    );
    
    const {
        foundWords,
        handleCellMouseDown,
        handleCellMouseEnter,
        handleCellMouseUp,
        isCellSelected,
        isCellFound,
        resetSelection
    } = useWordSelection(grid, wordsInGrid, wordPositions);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    
    const hasFinishedRef = useRef(false);

    const finishGame = () => {
        if (hasFinishedRef.current) return;
        hasFinishedRef.current = true;

        setGameEnded(true);
        
        const won = foundWords.length === wordsInGrid.length;
        
        const resultData = {
            score: foundWords.length,
            totalWords: wordsInGrid.length,
            timeLeft,
            won,
            difficulty: settings.difficulty,
            language: settings.language,
            date: new Date().toISOString()
        };
        
        addGameResult(resultData);
        setLastResult(resultData);

        setTimeout(() => { 
            setIsModalOpen(true); 
        }, 50);
    };

    const handleTimeEnd = () => {
        if (!gameEnded) {
            finishGame();
        }
    };

    const { timeLeft, resetTimer } = useGameTimer(settings.timeLimit, !gameEnded, handleTimeEnd);

    useEffect(() => {
        if (foundWords.length === wordsInGrid.length && wordsInGrid.length > 0 && !gameEnded) {
            finishGame();
        }
    }, [foundWords, wordsInGrid, gameEnded, settings]);

    const handleManualEnd = () => {
        if (!gameEnded) {
            finishGame();
        }
    };

    const handleRestart = () => {
        setIsModalOpen(false);
        setGameEnded(false);
        hasFinishedRef.current = false;
        
        regenerateGrid();
        resetSelection();
        resetTimer();
        
        clearLastResult();
    };

    const handleNextRound = () => {
        handleRestart();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className={`${styles.page} ${styles.gamePage}`}>
            <div className={styles.gameHeader}>
                <Title text={`Час: ${timeLeft}с`} type="h2" />
                <p className={styles.wordsCounter}>
                    Знайдено слів: <strong>{foundWords.length}</strong> / {wordsInGrid.length}
                </p>
            </div>

            <WordGrid
                grid={grid}
                onCellMouseDown={handleCellMouseDown}
                onCellMouseEnter={handleCellMouseEnter}
                onCellMouseUp={handleCellMouseUp}
                isCellSelected={isCellSelected}
                isCellFound={isCellFound}
            />

            <div className={styles.wordsList}>
                <h3>Слова для пошуку:</h3>
                <ul className={styles.wordsGrid}>
                    {wordsInGrid.map((word, idx) => (
                        <li 
                            key={idx} 
                            className={foundWords.includes(word) ? styles.foundWord : styles.pendingWord}
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.buttonGroup}>
                <Button onClick={handleManualEnd} styleType="secondary" disabled={gameEnded}>
                    Завершити
                </Button>
                <Button onClick={handleBackToHome} styleType="text">
                    На головну
                </Button>
            </div>

            <GameEndModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onRestart={handleRestart}
                onNextRound={handleNextRound}
            />
        </div>
    );
};

export default GamePage;