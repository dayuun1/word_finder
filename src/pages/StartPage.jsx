import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import styles from './StartPage.module.css';

const StartPage = ({ onRegenerateUserId }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleStart = () => {
    navigate(`/user/${userId}/game`);
  };

  const handleRegenerateId = () => {
    if (window.confirm('Згенерувати новий ID користувача? Це створить нову сесію.')) {
      const newUserId = onRegenerateUserId();
      navigate(`/user/${newUserId}`, { replace: true });
    }
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    alert('ID скопійовано в буфер обміну!');
  };

  return (
    <div className={styles.page}>
      <Title text="Пошук Слова (Word Search)" type="h1" />
      <p className={styles.description}>
        Знайдіть заховані слова у сітці. Слова можуть бути по горизонталі, вертикалі чи діагоналі.
      </p>
      
      <div className={styles.userIdSection}>
        <p className={styles.userIdLabel}>Ваш ID користувача:</p>
        <div className={styles.userIdContainer}>
          <code className={styles.userId}>{userId}</code>
          <button className={styles.copyButton} onClick={copyUserId} title="Копіювати ID">
            📋
          </button>
        </div>
        <button className={styles.regenerateLink} onClick={handleRegenerateId}>
          🔄 Згенерувати новий ID
        </button>
      </div>

      <Button onClick={handleStart}>
        Почати Гру
      </Button>
    </div>
  );
};

export default StartPage;