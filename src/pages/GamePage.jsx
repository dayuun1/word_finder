import React, { useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

const WordGrid = () => {
    const [selectedCells, setSelectedCells] = useState([]); 

    const grid = Array(5).fill(Array(5).fill('X')); 

    const handleCellClick = (rowIndex, colIndex) => {
        console.log(`Клік по комірці: ${rowIndex}, ${colIndex}`);
        setSelectedCells([[rowIndex, colIndex], [rowIndex + 1, colIndex ]]); 
    };

    return (
        <div className="word-grid-container">
            {grid.map((row, rIdx) => (
                <div key={rIdx} className="grid-row">
                    {row.map((letter, cIdx) => (
                        <div 
                            key={cIdx} 
                            className={`grid-cell ${selectedCells.some(c => c[0] === rIdx && c[1] === cIdx) ? 'selected' : ''}`}
                            onClick={() => handleCellClick(rIdx, cIdx)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};


const GamePage = ({ onEndGame }) => {
  const [timeLeft, setTimeLeft] = useState(60); 

  return (
    <div className="page game-page">
      <Title text="Час: 60с" type="h2" />
      <WordGrid />
      
      <div className="found-words-placeholder">
        <h3>Знайдені слова:</h3>
        <ul>
          <li>Слово 1 (placeholder)</li>
          <li>Слово 2 (placeholder)</li>
        </ul>
      </div>
      
      <Button 
        onClick={() => onEndGame(4)} 
        styleType="secondary"
      >
        Завершити
      </Button>
    </div>
  );
};

export default GamePage;