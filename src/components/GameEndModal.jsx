import React from 'react';
import Portal from './Portal';
import Button from './Button';
/**
 * @module components/GameEndModal
 */

/**
 * Модальне вікно завершення гри
 * @param {boolean} isOpen
 * @param {number} score - Рахунок
 * @param {number} totalWords - Всього слів
 * @param {number} timeLeft - Залишок часу 
 */
const GameEndModal = ({ isOpen, onClose, onRestart, onNextRound, score, totalWords, timeLeft }) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / totalWords) * 100);
  
  return (
    <Portal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Гра завершена!</h2>
          
          <div className="modal-stats">
            <div className="stat-item">
              <span className="stat-label">Знайдено слів:</span>
              <span className="stat-value">{score} / {totalWords}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Відсоток знайдених слів:</span>
              <span className="stat-value">{percentage}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Залишилось часу:</span>
              <span className="stat-value">{timeLeft}с</span>
            </div>
          </div>

          <div className="modal-message">
            {percentage === 100 && <p className="success-msg">Ви знайшли всі слова!</p>}
            {percentage >= 70 && percentage < 100 && <p className="good-msg">Нт</p>}
            {percentage >= 40 && percentage < 70 && <p className="ok-msg">Не погано</p>}
            {percentage < 40 && <p className="try-msg">Погано. Ви лузер. Працюйте над собою. Кімпінтяу</p>}
          </div>

          <div className="modal-actions">
            <Button onClick={onRestart} styleType="secondary">
              Заново
            </Button>
            <Button onClick={onNextRound} styleType="primary">
              Наступна гра
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default GameEndModal;