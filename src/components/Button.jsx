
/**
 * @fileoverview Компонент кнопки
 * @module components/Button
 */

import React from 'react';
import styles from '../styles/Button.module.css';
/**
 * Універсальна кнопка застосунку.
 * Використовується на всіх сторінках для основних дій.
 * @param {'primary'|'secondary'|'text'} [styleType='primary'] - Стиль
 * @param {boolean} [disabled=false] - Заблокована
 * @param {'button'|'submit'|'reset'} [type='button'] - Тип
 * @returns {JSX.Element} Елемент кнопки
 */
const Button = ({ children, onClick, styleType = 'primary', disabled = false, type = 'button' }) => {
  return (
    <button 
      type={type}
      className={`${styles.appButton} ${styles[styleType]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;