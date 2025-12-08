import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import WordGrid from '../components/WordGrid';
import { useWordGrid } from '../hooks/useWordGrid';
import { useWordSelection } from '../hooks/useWordSelection';
import { useGameTimer } from '../hooks/useGameTimer';

const GamePage = ({ onEndGame, difficulty, language }) => {
  const { grid, wordsInGrid, wordPositions } = useWordGrid(difficulty, language);
  const {
    foundWords,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleCellMouseUp,
    isCellSelected,
    isCellFound
  } = useWordSelection(grid, wordsInGrid, wordPositions);

  const { timeLeft } = useGameTimer(180, true, () => onEndGame(foundWords.length));

  return (
    <div className="page game-page">
      <Title text={`Час: ${timeLeft}с`} type="h2" />
      <p>Знайдено слів: {foundWords.length} / {wordsInGrid.length}</p>

      <WordGrid
        grid={grid}
        onCellMouseDown={handleCellMouseDown}
        onCellMouseEnter={handleCellMouseEnter}
        onCellMouseUp={handleCellMouseUp}
        isCellSelected={isCellSelected}
        isCellFound={isCellFound}
      />

      <div className="found-words-placeholder">
        <h3>Знайдені слова:</h3>
        <ul>
          {foundWords.map((word, idx) => (
            <li key={idx}>{word}</li>
          ))}
        </ul>
      </div>

      <Button onClick={() => onEndGame(foundWords.length)} styleType="secondary">
        Завершити
      </Button>
    </div>
  );
};

export default GamePage;