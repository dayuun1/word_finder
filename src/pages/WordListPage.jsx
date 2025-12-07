
import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

const WordListPage = ({ navigate, currentLang }) => {
    const words = {
        ukr: [
            { word: 'КОД', guessed: true },
            { word: 'ВІТЕР', guessed: false },
            { word: 'РЕАКТ', guessed: true },
            { word: 'ПРОЕКТ', guessed: false },
        ],
        eng: [
            { word: 'CODE', guessed: true },
            { word: 'WIND', guessed: false },
            { word: 'REACT', guessed: true },
            { word: 'PROJECT', guessed: false },
        ]
    };

    const currentWords = words[currentLang] || words.ukr; 

    return (
        <div className="page word-list-page">
            <Title text={`Слова у грі (${currentLang.toUpperCase()})`} type="h1" />
            
            <p className="note">Слова, які ви вже відгадали, більше не будуть використані у грі.</p>

            <ul className="word-list">
                {currentWords.map((item, index) => (
                    <li 
                        key={index} 
                        className={`word-item ${item.guessed ? 'guessed' : 'not-guessed'}`}
                    >
                        {item.word} 
                        {item.guessed && <span className="guessed-mark"> (Відгадано)</span>}
                    </li>
                ))}
            </ul>

            <Button onClick={() => navigate('start')}>Повернутися</Button>
        </div>
    );
};

export default WordListPage;