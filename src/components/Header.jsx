import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
/**
 * @fileoverview Компонент шапки навігації
 * @module components/Header
 */
/** 
 * Шапка з навігацією. Рендериться на всіх сторінках. 
 */

const Header = () => {
  return (
    <header className={styles.appHeader}>
      <Link to="/" className={styles.logoLink}>
        <h1 className={styles.logo}>Word Finder</h1>
      </Link>
      
      <nav className={styles.headerNav}>
        <Link to="/" className={styles.navLink}>
          <button className={`${styles.navButton} ${styles.textButton}`}>
            Головна
          </button>
        </Link>
        
        <Link to="/words" className={styles.navLink}>
          <button className={`${styles.navButton} ${styles.primaryButton}`}>
            Слова
          </button>
        </Link>
        
        <Link to="/leaderboard" className={styles.navLink}>
          <button className={`${styles.navButton} ${styles.primaryButton}`}>
            Результати
          </button>
        </Link>
        
        <Link to="/settings" className={styles.navLink}>
          <button className={`${styles.navButton} ${styles.primaryButton}`}>
            Налаштування
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;