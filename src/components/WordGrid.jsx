import React from 'react';

const WordGrid = ({ grid, onCellMouseDown, onCellMouseEnter, onCellMouseUp, isCellSelected, isCellFound }) => (
  <div className="word-grid-container">
    {grid.map((row, rIdx) => (
      <div key={rIdx} className="grid-row">
        {row.map((letter, cIdx) => (
          <div
            key={cIdx}
            className={`grid-cell ${isCellSelected(rIdx, cIdx) ? 'selected' : ''} ${isCellFound(rIdx, cIdx) ? 'found' : ''}`}
            onMouseDown={() => onCellMouseDown(rIdx, cIdx)}
            onMouseEnter={() => onCellMouseEnter(rIdx, cIdx)}
            onMouseUp={onCellMouseUp}
          >
            {letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default WordGrid;