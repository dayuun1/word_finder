import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { WORD_LISTS } from '../constants/wordLists';

const WordListPage = ({ navigate, currentLang }) => {
    const listsByDifficulty = WORD_LISTS[currentLang]; 

    if (!listsByDifficulty) {
        return (
            <div className="page word-list-page">
                <Title text="Список слів" type="h1" />
                <p>Не знайдено списків слів для мови: {currentLang.toUpperCase()}</p>
                <Button onClick={() => navigate('start')}>Повернутися</Button>
            </div>
        );
    }

    return (
        <div className="page word-list-page">
            <Title text={`Слова у грі (${currentLang.toUpperCase()})`} type="h1" />
            
            <p className="note">Тут показані всі слова, доступні для генерації у сітці, згруповані за складністю.</p>

            {/* Відображаємо списки, груповані за складністю */}
            {Object.entries(listsByDifficulty).map(([difficulty, words]) => (
                <div key={difficulty} className="word-list-group">
                    <h3>{difficulty} ({words.length} слів)</h3>
                    <ul className="word-list">
                        {words.map((word, index) => (
                            <li 
                                key={index} 
                                className="word-item"
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <Button onClick={() => navigate('start')}>Повернутися</Button>
        </div>
    );
};

export default WordListPage;