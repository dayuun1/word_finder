import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage'; 
import WordListPage from './pages/WordListPage'; 
import Header from './components/Header';
import { saveSettings, getInitialSettings } from './utils/storage'; 
import styles from './styles/App.module.css';

const App = () => {
  const [settings, setSettings] = useState(getInitialSettings());
  
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateProfile = (data) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <BrowserRouter>
      <div className={`${styles.appContainer} ${styles[`theme${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}`]}`}>
        <Header />
        
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            
            <Route 
              path="/game" 
              element={
                <GamePage 
                  difficulty={settings.difficulty}
                  language={settings.language}
                  timeLimit={settings.timeLimit}
                  gameMode={settings.gameMode}
                  maxWordLength={settings.maxWordLength}
                  updateProfile={updateProfile}
                />
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <SettingsPage 
                  settings={settings}
                  updateSetting={updateSetting}
                />
              } 
            />
            
            <Route 
              path="/words" 
              element={
                <WordListPage 
                  currentLang={settings.language} 
                />
              } 
            />
                       
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;