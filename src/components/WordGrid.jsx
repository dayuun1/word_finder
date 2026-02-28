import React from 'react';
import styles from '../styles/WordGrid.module.css';
/**
 * @fileoverview Компонент ігрового поля
 * @module components/WordGrid
 */
/**
 * Ігрове поле
 * @param {string[][]} grid - 2D масив букв
 * @param {Function} isCellSelected - (row, col) => boolean
 * @param {Function} isCellFound - (row, col) => boolean
 */
const WordGrid = ({ grid, onCellMouseDown, onCellMouseEnter, onCellMouseUp, isCellSelected, isCellFound }) => (
  <div className={styles.wordGridContainer}>
    {grid.map((row, rIdx) => (
      <div key={rIdx} className={styles.gridRow}>
        {row.map((letter, cIdx) => {
          const isSelected = isCellSelected(rIdx, cIdx);
          const isFound = isCellFound(rIdx, cIdx);
          
          return (
            <div
              key={cIdx}
              className={`${styles.gridCell} ${isSelected ? styles.selected : ''} ${isFound ? styles.found : ''}`}
              onMouseDown={() => onCellMouseDown(rIdx, cIdx)}
              onMouseEnter={() => onCellMouseEnter(rIdx, cIdx)}
              onMouseUp={onCellMouseUp}
            >
              {letter}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

export default WordGrid;