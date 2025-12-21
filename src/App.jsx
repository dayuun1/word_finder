import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage'; 
import WordListPage from './pages/WordListPage'; 
import Header from './components/Header';
import { saveSettings, getInitialSettings } from './utils/storage'; 
import { getOrCreateUserId, regenerateUserId } from './utils/userIdGenerator';
import styles from './styles/App.module.css';

const App = () => {
  const [userId, setUserId] = useState(getOrCreateUserId());
  const [settings, setSettings] = useState(getInitialSettings()); 
  
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleRegenerateUserId = () => {
    const newUserId = regenerateUserId();
    setUserId(newUserId);
    return newUserId;
  };

  return (
    <Router>
      <div className={`${styles.appContainer} ${styles[`theme${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}`]}`}> 
        <Header userId={userId} onRegenerateUserId={handleRegenerateUserId} />
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Navigate to={`/user/${userId}`} replace />} />
            
            <Route path="/user/:userId" element={<StartPage onRegenerateUserId={handleRegenerateUserId} />} />
            
            <Route 
              path="/user/:userId/game" 
              element={
                <GamePage 
                  difficulty={settings.difficulty}
                  language={settings.language}
                  timeLimit={settings.timeLimit}
                  gameMode={settings.gameMode}
                  maxWordLength={settings.maxWordLength} 
                />
              } 
            />
            
            <Route 
              path="/user/:userId/settings" 
              element={
                <SettingsPage 
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
              } 
            />
            
            <Route 
              path="/user/:userId/words" 
              element={<WordListPage currentLang={settings.language} />} 
            />
            
            <Route path="*" element={<Navigate to={`/user/${userId}`} replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;