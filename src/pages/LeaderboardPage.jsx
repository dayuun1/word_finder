import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import Card from '../components/Card';
import { useStore } from '../store/useStore';
import styles from '../styles/Page.module.css';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const profile = useStore((state) => state.profile);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const winRate = profile.gamesPlayed > 0 
    ? Math.round((profile.gamesWon / profile.gamesPlayed) * 100) 
    : 0;

  const avgScore = profile.gamesPlayed > 0
    ? (profile.totalScore / profile.gamesPlayed).toFixed(1)
    : 0;

  return (
    <div className={`${styles.page} ${styles.leaderboardPage}`}>
      <Title text="Таблиця результатів" type="h1" />
      
      <Card title="Загальна статистика">
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Всього ігор:</span>
            <span className={styles.statValue}>{profile.gamesPlayed}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Виграно:</span>
            <span className={styles.statValue}>{profile.gamesWon}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Відсоток перемог:</span>
            <span className={styles.statValue}>{winRate}%</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Загальний рахунок:</span>
            <span className={styles.statValue}>{profile.totalScore}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Середній рахунок:</span>
            <span className={styles.statValue}>{avgScore}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Найкращий час:</span>
            <span className={styles.statValue}>
              {profile.bestTime !== null ? `${profile.bestTime}с` : '-'}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Історія ігор">
        {profile.history.length === 0 ? (
          <p className={styles.emptyMessage}>Історія ігор порожня. Зіграйте свою першу гру!</p>
        ) : (
          <div className={styles.historyList}>
            {profile.history.map((game, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.historyHeader}>
                  <span className={`${styles.gameStatus} ${game.won ? styles.won : styles.lost}`}>
                    {game.won ? 'Перемога' : 'Програш'}
                  </span>
                  <span className={styles.gameDate}>{formatDate(game.date)}</span>
                </div>
                <div className={styles.historyDetails}>
                  <span>Рахунок: <strong>{game.score}/{game.totalWords}</strong></span>
                  <span>Час: <strong>{game.timeLeft}с</strong></span>
                  <span>Складність: <strong>{game.difficulty}</strong></span>
                  <span>Мова: <strong>{game.language === 'ukr' ? 'UA' : 'EN'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className={styles.buttonGroup}>
        <Button onClick={() => navigate('/game')} styleType="primary">
          Нова гра
        </Button>
        <Button onClick={() => navigate('/')} styleType="secondary">
          На головну
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardPage;