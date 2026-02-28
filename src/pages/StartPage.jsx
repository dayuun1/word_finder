import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import styles from '../styles/Page.module.css';

/**
 * @fileoverview Стартова сторінка
 * @module pages/StartPage
 */

/**
 * Головна стартова сторінка застосунку.
 * Відображає короткий опис гри та кнопку для початку нового раунду.
 * @returns {JSX.Element}
 */
const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.page} ${styles.startPage}`}>
      <Title text="Пошук Слова (Word Search)" type="h1" />
      
      <div className={styles.description}>
        <p>
          Знайдіть заховані слова у сітці. Слова можуть бути розташовані 
          по горизонталі, вертикалі чи діагоналі.
        </p>
        <p>
          Обирайте складність від 5x5 до 15x15 та грайте українською або англійською!
        </p>
      </div>

      <div className={styles.buttonGroup}>
        <Button onClick={() => navigate('/game')}>
          Почати Гру
        </Button>
        
      
      </div>
    </div>
  );
};

export default StartPage;