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
 * @example <caption>Основна кнопка</caption>
 * <Button onClick={() => console.log('click')}>
 *   Натисни мене
 * </Button>
 *
 * @example <caption>Вторинна заблокована кнопка</caption>
 * <Button styleType="secondary" disabled>
 *   Недоступно
 * </Button>
 *
 * @example <caption>Кнопка для відправки форми</caption>
 * <Button type="submit" styleType="primary">
 *   Зберегти
 * </Button>
 *
 * @example <caption>Текстова кнопка-посилання</caption>
 * <Button styleType="text" onClick={() => navigate('/')}>
 *   На головну
 * </Button>
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