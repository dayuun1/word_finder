import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Button from './Button';
import styles from './Header.module.css';

const Header = ({ userId, onRegenerateUserId }) => {
  const navigate = useNavigate();
  const { userId: paramUserId } = useParams();
  const location = useLocation();
  const currentUserId = paramUserId || userId;

  const isStartPage = location.pathname === `/user/${currentUserId}`;
  const isGamePage = location.pathname === `/user/${currentUserId}/game`;

  const handleRegenerateId = () => {
    if (window.confirm('Ви впевнені, що хочете згенерувати новий ID? Це створить нову сесію користувача.')) {
      const newUserId = onRegenerateUserId();
      navigate(`/user/${newUserId}`, { replace: true });
    }
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.logoSection}>
        <h1 className={styles.logo} onClick={() => navigate(`/user/${currentUserId}`)}>
          Word Finder
        </h1>
        <span className={styles.userIdBadge} title="ID Користувача">
          👤 {currentUserId}
        </span>
      </div>
      
      <nav className={styles.headerNav}>
        {!isStartPage && !isGamePage && (
          <Button onClick={() => navigate(`/user/${currentUserId}`)} styleType="text">
            Головна
          </Button>
        )}
        
        <Button onClick={() => navigate(`/user/${currentUserId}/words`)}>
          Слова
        </Button>
        
        <Button onClick={() => navigate(`/user/${currentUserId}/settings`)}>
          Налаштування
        </Button>

        <Button onClick={handleRegenerateId} styleType="secondary">
          🔄 Новий ID
        </Button>
      </nav>
    </header>
  );
};

export default Header;