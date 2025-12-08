
import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { WORD_LISTS } from '../constants/wordLists';

const WordListPage = ({ navigate, language }) => {
  const allWords = WORD_LISTS[language];
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