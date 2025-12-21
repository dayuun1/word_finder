import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { WORD_LISTS } from '../constants/wordLists';
import styles from './WordListPage.module.css';

const WordListPage = ({ currentLang }) => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const listsByDifficulty = WORD_LISTS[currentLang]; 

    if (!listsByDifficulty) {
        return (
            <div className={styles.page}>
                <Title text="Список слів" type="h1" />
                <p>Не знайдено списків слів для мови: {currentLang.toUpperCase()}</p>
                <Button onClick={() => navigate(`/user/${userId}`)}>Повернутися</Button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Title text={`Слова у грі (${currentLang.toUpperCase()})`} type="h1" />
            
            <p className={styles.note}>
              Тут показані всі слова, доступні для генерації у сітці, згруповані за складністю.
            </p>

            {Object.entries(listsByDifficulty).map(([difficulty, words]) => (
                <div key={difficulty} className={styles.wordListGroup}>
                    <h3>{difficulty} ({words.length} слів)</h3>
                    <ul className={styles.wordList}>
                        {words.map((word, index) => (
                            <li 
                                key={index} 
                                className={styles.wordItem}
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <Button onClick={() => navigate(`/user/${userId}`)}>Повернутися</Button>
        </div>
    );
};

export default WordListPage;