import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { WORD_LISTS } from '../constants/wordLists';
import styles from '../styles/Page.module.css';

const WordListPage = ({ currentLang }) => {
  const navigate = useNavigate();
  const listsByDifficulty = WORD_LISTS[currentLang];

  if (!listsByDifficulty) {
    return (
      <div className={`${styles.page} ${styles.wordListPage}`}>
        <Title text="Список слів" type="h1" />
        <p>Не знайдено списків слів для мови: {currentLang.toUpperCase()}</p>
        <Button onClick={() => navigate('/')}>Повернутися</Button>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${styles.wordListPage}`}>
      <Title text={`Слова у грі (${currentLang.toUpperCase()})`} type="h1" />
      
      <p className={styles.note}>
        Тут показані всі слова, доступні для генерації у сітці, згруповані за складністю.
      </p>

      {Object.entries(listsByDifficulty).map(([difficulty, words]) => (
        <div key={difficulty} className={styles.wordListGroup}>
          <h3 className={styles.groupTitle}>
            {difficulty} ({words.length} слів)
          </h3>
          <div className={styles.wordGrid}>
            {words.map((word, index) => (
              <span 
                key={index} 
                className={styles.wordTag}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={() => navigate('/')}>Повернутися</Button>
    </div>
  );
};

export default WordListPage;