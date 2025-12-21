import React from 'react';
import Portal from './Portal';
import Button from './Button';
import styles from './GameEndModal.module.css';

const GameEndModal = ({ isOpen, onClose, onRestart, onNextRound, score, totalWords, timeLeft }) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / totalWords) * 100);
  
  return (
    <Portal>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.modalTitle}>Гра завершена!</h2>
          
          <div className={styles.modalStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Знайдено слів:</span>
              <span className={styles.statValue}>{score} / {totalWords}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Відсоток знайдених слів:</span>
              <span className={styles.statValue}>{percentage}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Залишилось часу:</span>
              <span className={styles.statValue}>{timeLeft}с</span>
            </div>
          </div>

          <div className={styles.modalMessage}>
            {percentage === 100 && <p className={styles.successMsg}>🎉 Ви знайшли всі слова!</p>}
            {percentage >= 70 && percentage < 100 && <p className={styles.goodMsg}>👍 Непогано!</p>}
            {percentage >= 40 && percentage < 70 && <p className={styles.okMsg}>😊 Можна краще</p>}
            {percentage < 40 && <p className={styles.tryMsg}>💪 Спробуйте ще раз!</p>}
          </div>

          <div className={styles.modalActions}>
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