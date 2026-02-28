import React from 'react';

/**
 * @category Components
 * @module Input
 * @memberof Components
 * @description Компонент текстового поля вводу
 */
/**
 * Універсальне поле вводу з підписом.
 * @param {string} label - Текст підпису поля
 * @param {string} value - Поточне значення поля
 * @param {Function} onChange - Обробник зміни значення
 * @param {string} [type='text'] - Тип HTML input
 * @param {string} [placeholder] - Текст-підказка
 * @returns {JSX.Element} Поле вводу з підписом
 */
const Input = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="app-input"
      />
    </div>
  );
};

export default Input;