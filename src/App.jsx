import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage'; 
import ProfilePage from './pages/ProfilePage';   
import WordListPage from './pages/WordListPage'; 
import Header from './components/Header';
import './styles/index.css';

const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  RESULTS: 'results',
  SETTINGS: 'settings', 
  PROFILE: 'profile',   
  WORD_LIST: 'word_list', 
};

const App = () => {
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [finalScore, setFinalScore] = useState(0);
  const [language, setLanguage] = useState('ukr');
  const [difficulty, setDifficulty] = useState('5x5');
  const [theme, setTheme] = useState('default');
  const [profile, setProfile] = useState({
    nickname: 'WordMaster',
    wordsGuessed: 42
  });

  const navigate = (state) => setGameState(state);
  
  const handleStartGame = () => navigate(GAME_STATES.PLAYING); 
  
  const handleEndGame = (score) => {
    setFinalScore(score);
    navigate(GAME_STATES.RESULTS);
  };
  
  const handleRestart = () => navigate(GAME_STATES.START);

  const renderPage = () => {
    switch (gameState) {
      case GAME_STATES.START:
        return <StartPage onStart={handleStartGame} />; 
        
      case GAME_STATES.PLAYING:
        return (
          <GamePage 
            onEndGame={handleEndGame} 
            difficulty={difficulty}
            language={language}
          />
        );
        
      case GAME_STATES.RESULTS:
        return <ResultsPage onRestart={handleRestart} finalScore={finalScore} />; 
        
      case GAME_STATES.SETTINGS:
        return (
          <SettingsPage 
            navigate={navigate}
            currentLang={language}
            onLangChange={setLanguage}
            currentDiff={difficulty}
            onDiffChange={setDifficulty}
            currentTheme={theme}
            onThemeChange={setTheme}
          />
        );
        
      case GAME_STATES.PROFILE:
        return (
          <ProfilePage 
            navigate={navigate} 
            profile={profile}
          />
        );
        
      case GAME_STATES.WORD_LIST:
        return <WordListPage navigate={navigate} currentLang={language} />;
        
      default:
        return <StartPage onStart={handleStartGame} />;
    }
  };

  return (
    <div className={`app-container theme-${theme}`}> 
      <Header navigate={navigate} gameState={gameState} /> 
      <div className="content-wrapper">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;