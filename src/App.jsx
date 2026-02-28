import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage'; 
import WordListPage from './pages/WordListPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Header from './components/Header';
import { useSettingsStore } from './store/useSettingsStore';
import styles from './styles/App.module.css';

const App = () => {
  const settings = useSettingsStore((state) => state.settings);

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
        <CookieConsent
          location="bottom"
          buttonText="Прийняти всі"
          declineButtonText="Тільки необхідні"
          enableDeclineButton
          cookieName="wordFinderCookieConsent"
          style={{ background: "#900eaa", fontSize: "16px", textAlign: "left" }}
          buttonStyle={{ background: "#1bc51e", color: "#fff", borderRadius: "5px" }}
          declineButtonStyle={{ background: "#ec273b", borderRadius: "5px" }}
          expires={150}
        >
          Ми використовуємо файли cookie для збереження налаштувань гри та вашої статистики. 
          Ви можете змінити налаштування або прийняти їх.
        </CookieConsent>
      </div>
      
    </BrowserRouter>
  );
};
import CookieConsent from "react-cookie-consent";

export default App;