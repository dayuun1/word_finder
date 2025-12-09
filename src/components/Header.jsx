import React from 'react';
import Button from './Button';

const Header = ({ navigate, gameState }) => {
  return (
    <header className="app-header">
      <h1 className="logo" onClick={() => navigate('start')}>Word Finder</h1>
      
      <nav className="header-nav">
        {gameState !== 'start' && gameState !== 'playing' && (
             <Button onClick={() => navigate('start')} styleType="text">Головна</Button>
        )}
        
        <Button onClick={() => navigate('word_list')}>
          Слова
        </Button>
        
        <Button onClick={() => navigate('settings')}>
          Налаштування
        </Button>
      </nav>
    </header>
  );
};

export default Header;