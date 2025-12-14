import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage'; 
import WordListPage from './pages/WordListPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Header from './components/Header';
import { useStore } from './store/useStore';
import styles from './styles/App.module.css';

const App = () => {
  const settings = useStore((state) => state.settings);

  return (
    <BrowserRouter>
      <div className={`${styles.appContainer} ${styles[`theme${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}`]}`}>
        <Header />
        
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/words" element={<WordListPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;