import React, { useState, useEffect } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage'; 
import WordListPage from './pages/WordListPage'; 
import Header from './components/Header';
import { saveSettings, getInitialSettings } from './utils/storage'; 
import './styles/index.css';

const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  SETTINGS: 'settings', 
  WORD_LIST: 'word_list', 
};

const App = () => {
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [finalScore, setFinalScore] = useState(0);
  
  const [settings, setSettings] = useState(getInitialSettings()); 
  
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const navigate = (state) => setGameState(state);
  const handleStartGame = () => navigate(GAME_STATES.PLAYING); 
  
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleEndGame = (score, difficulty, timeLimit, timeLeft) => { 
    setFinalScore(score);
  };
  
  const handleRestart = () => navigate(GAME_STATES.START);

  const renderPage = () => {
    switch (gameState) {
      case GAME_STATES.START:
        return <StartPage onStart={handleStartGame} />; 
        
      case GAME_STATES.PLAYING:
        return (
          <GamePage 
            onEndGame={(score, difficulty, timeLimit, timeLeft) => handleEndGame(score, difficulty, timeLimit, timeLeft)} 
            difficulty={settings.difficulty}
            language={settings.language}
            timeLimit={settings.timeLimit}
            gameMode={settings.gameMode}
            maxWordLength={settings.maxWordLength} 
          />
        );
        
      case GAME_STATES.SETTINGS:
        return (
          <SettingsPage 
            navigate={navigate}
            currentLang={settings.language}
            onLangChange={(val) => updateSetting('language', val)}
            currentDiff={settings.difficulty}
            onDiffChange={(val) => updateSetting('difficulty', val)}
            currentTheme={settings.theme}
            onThemeChange={(val) => updateSetting('theme', val)}
            currentGameMode={settings.gameMode}
            onGameModeChange={(val) => updateSetting('gameMode', val)}
            currentTimeLimit={settings.timeLimit}
            onTimeLimitChange={(val) => updateSetting('timeLimit', val)}
            currentMaxWordLength={settings.maxWordLength}
            onMaxWordLengthChange={(val) => updateSetting('maxWordLength', val)}
          />
        );
        
      case GAME_STATES.WORD_LIST:
        return <WordListPage navigate={navigate} currentLang={settings.language} />;
        
      default:
        return <StartPage onStart={handleStartGame} />;
    }
  };

  return (
    <div className={`app-container theme-${settings.theme}`}> 
      <Header navigate={navigate} gameState={gameState} /> 
      <div className="content-wrapper">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;