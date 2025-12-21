import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import WordGrid from '../components/WordGrid';
import GameEndModal from '../components/GameEndModal';
import { useWordGrid } from '../hooks/useWordGrid';
import { useWordSelection } from '../hooks/useWordSelection';
import { useGameTimer } from '../hooks/useGameTimer';
import styles from './GamePage.module.css';

const GamePage = ({ difficulty, language, timeLimit = 180, gameMode = 'classic', maxWordLength }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const { grid, wordsInGrid, wordPositions, regenerateGrid } = useWordGrid(difficulty, language, maxWordLength);
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
  
  const hasFinishedRef = React.useRef(false); 

  const finishGame = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      setGameEnded(true);
      
      setTimeout(() => { 
          setIsModalOpen(true); 
      }, 50); 
  }

  const handleTimeEnd = () => {
    if (!gameEnded) {
      finishGame(); 
    }
  };

  const { timeLeft, resetTimer } = useGameTimer(timeLimit, !gameEnded, handleTimeEnd);

  useEffect(() => {
    if (foundWords.length === wordsInGrid.length && wordsInGrid.length > 0 && !gameEnded) {
      finishGame(); 
    }
  }, [foundWords, wordsInGrid, gameEnded]);

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
  };

  const handleNextRound = () => {
    setIsModalOpen(false);
    setGameEnded(false);
    hasFinishedRef.current = false;
    regenerateGrid();
    resetSelection();
    resetTimer();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToHome = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className={styles.page}>
      <Title text={`Час: ${timeLeft}с`} type="h2" />
      <p className={styles.scoreText}>Знайдено слів: {foundWords.length} / {wordsInGrid.length}</p>

      <WordGrid
        grid={grid}
        onCellMouseDown={handleCellMouseDown}
        onCellMouseEnter={handleCellMouseEnter}
        onCellMouseUp={handleCellMouseUp}
        isCellSelected={isCellSelected}
        isCellFound={isCellFound}
      />

      <div className={styles.foundWordsPlaceholder}>
        <h3>Слова для пошуку:</h3>
        <ul className={styles.wordList}>
          {wordsInGrid.map((word, idx) => (
            <li 
                key={idx} 
                className={foundWords.includes(word) ? styles.foundWord : ''}
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
        score={foundWords.length}
        totalWords={wordsInGrid.length}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default GamePage;