import { useState } from 'react';
/**
 * @module hooks/useWordSelection
 */

/**
 * Хук виділення слів
 * @returns {{ foundWords, selectedCells, handleCellMouseDown, handleCellMouseEnter, handleCellMouseUp, isCellSelected, isCellFound, resetSelection }}
 */
export const useWordSelection = (grid, wordsInGrid, wordPositions) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleCellMouseDown = (row, col) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseEnter = (row, col) => {
    if (!isSelecting) return;

    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell || (lastCell.row === row && lastCell.col === col)) return;

    if (selectedCells.length === 1) {
      setSelectedCells([...selectedCells, { row, col }]);
    } else {
      const first = selectedCells[0];
      const dirX = Math.sign(lastCell.row - first.row);
      const dirY = Math.sign(lastCell.col - first.col);
      const expectedRow = lastCell.row + dirX;
      const expectedCol = lastCell.col + dirY;

      if (row === expectedRow && col === expectedCol) {
        setSelectedCells([...selectedCells, { row, col }]);
      }
    }
  };

  const handleCellMouseUp = () => {
    setIsSelecting(false);
    checkSelectedWord();
  };

  const checkSelectedWord = () => {
    if (selectedCells.length < 2) {
      setSelectedCells([]);
      return;
    }

    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');

    if (wordsInGrid.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellFound = (row, col) => {
    return wordPositions.some(wordData =>
      foundWords.includes(wordData.word) &&
      wordData.positions.some(pos => pos.row === row && pos.col === col)
    );
  };

  return {
    selectedCells,
    foundWords,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleCellMouseUp,
    isCellSelected,
    isCellFound,
    resetSelection: () => {
      setSelectedCells([]);
      setFoundWords([]);
    }
  };
};